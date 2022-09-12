<?php

namespace App\Controller;

use Exception;

use EasyPost\EasyPost;
use EasyPost\Shipment;
use App\Entity\Articles;
use App\Controller\ResponseController;
use App\Repository\ArticlesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\SubCategoriesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use phpDocumentor\Reflection\DocBlock\Tags\Throws;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\DependencyInjection\EnvVarProcessorInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

#[Route('/api/articles')]
class ArticlesController extends ResponseController
{

    #[Route('/', name: 'all_articles', methods: "GET")]
    public function index(ArticlesRepository $articlesRepository): JsonResponse
    {
        return $this->succesGet($articlesRepository->findAll(), "articles");
    }

    #[Route('/add', name: 'add_articles', methods: "POST")]
    function add_action(Request $request, SubCategoriesRepository $subCategoriesRepository)
    {
        // dd($request);
        $content = $request->getContent();
        dd($content);
        try {
            $articles = $this->serializer->deserialize($content, Articles::class, 'json');
            $sub_cat_id = json_decode($content)->sub_categories_id;
            // dd($articles);
            // dd($sub_cat_id);
            $contentSub = [];
            foreach ($sub_cat_id as $value) {
                try {
                    $sub_cat = $subCategoriesRepository->find($value);
                    $articles->addSubCategory($sub_cat);
                } catch (\Throwable $th) {
                    return $this->failedRequest("Id subCategories invalid");
                }
            }
            // dd($articles);
            $error = $this->validator->validate($articles);
            if (count($error) > 0) {
                return $this->json($error, 400);
            }
            dd($articles); 

            $this->em->persist($articles);
            dd($articles);
            $this->em->flush();
            $article_id = $articles->getId();

            return $this->json([
                'status' => 201,
                "message" => "articles ajouté!",
                "id" => $article_id // ID de l'article !!! Ne pas enlever car utiliser afin de lier les images 
            ], 201);
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }
    public function fetch_other_data(Request $request){
        dd($request);
    }
    #[Route('/update/{id}', name: 'update_articles', methods: "PATCH", requirements: ["id" => "\d+"])]
    function update_action(Articles $article = null, Request $request)
    {

        try {
            if ($this->valDif($article, null)) {

                $content = $request->getContent();
                $this->serializer->deserialize($content, Articles::class, 'json', ["object_to_populate" => $article]);

                $error = $this->validator->validate($article);
                if (count($error) > 0) {
                    return $this->json($error, 400);
                }

                try {
                    $this->em->flush();
                } catch (\Throwable $th) {
                    return $this->badRequest($th);
                }
                return $this->succesPost("articles mis a jour!");
            } else {
                return $this->failedRequest("aucun article trouvé");
            }
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }

    #[Route('/{id}', name: 'id_articles', requirements: ["id" => "\d+"])]
    function show_article_id(Articles $article = null)
    {
        try {
            if (!is_null($article)) {
                $this->set_popularity($article);
                return $this->succesGet($article, "articles");
            } else {
                throw new Exception("L'article n'existe pas.");
            }
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }

    // #[Route('/popularity/{id}', name: 'app_article_popularity', methods: "PATCH")]
    function set_popularity($article)
    {
        $user = $this->getUser();
        if ($this->valDif($user)) {
            $popularity = $this->normalize->normalize($article, null, ["groups" => "popularity"]);
            $userInPopularity = $popularity["user"];
            $userData = $this->normalize->normalize($user, null, ["groups" => "popularity"]);
            // dd($userData);
            if ($this->valDif(count($userInPopularity), 0)) {
                $check = false;

                foreach ($userInPopularity as $key => $value) {
                    if (!$this->valDif($value["id"], $userData["id"])) {
                        $check = true;
                        break;
                    }
                }

                if ($this->valDif($check, true)) {
                    $article->addUser($user);
                    $article->setPopularity($popularity["popularity"] + 1);
                } else return $this->failedRequest("article deja visité");
            } else {
                $article->addUser($user);
                $article->setPopularity($popularity["popularity"] + 1);
            }
            return $this->em->flush();
        }
    }
    //Popularity
    #[Route('/popularity', name: 'article_popularity', methods: "GET")]
    function getPopulaireArticle(ArticlesRepository $articlesRepository)
    {
        return $this->succesGet($articlesRepository->findBy([], ["popularity" => "desc"]), "articles");
    }
    #[Route('/popularity/{limit}', name: 'article_popularity_limit', methods: "GET", requirements: ["limit" => "\d+"])]
    function getPopulaireArticleWithLimit($limit, ArticlesRepository $articlesRepository)
    {
        return $this->succesGet($articlesRepository->findBy([], ["popularity" => "desc"], $limit), "articles");
    }

    #[Route('/delete/{id}', name: 'delet_articles', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_article(Articles $article = null)
    {
        try {
            if ($this->valDif($article, null)) {
                $this->em->remove($article);
                $this->em->flush();
                return $this->succesPost("article supprimer");
            } else {
                return $this->failedRequest("Aucun article trouvé!");
            }
        } catch (Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    //STOCK
    #[Route('/stock/{id}', methods: "PATCH", requirements: ["id" => "\d+"])]
    function stock_incremente(Articles $article = null)
    {
        try {
            if ($article === null) {
                throw new Exception("Article not Found");
            } else {
                $stock = $this->normalize->normalize($article, null, ["groups" => "stock"]);
                if ($stock["stock"] > 0) {
                    $article->setStock($stock["stock"] - 1);
                } else {
                    throw new Exception("Ne peut pas passer au negative");
                }
                try {
                    $this->em->flush();

                    return $this->succesRequest();
                } catch (\Throwable $th) {
                    return $this->badRequest($th);
                }
            }
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }

    #[Route('/search/{search}', name: 'app_article_search', methods: "GET")]
    function search_article($search)
    {
        $query  = $this->em->createQuery("SELECT a from App\Entity\Articles a JOIN a.sub_categories s WHERE a.title like '%" . $search . "%'OR s.name like '%" . $search . "%'");
        $article = $query->getResult();
        dd($article);
        return $this->succesGet($article, "articles");
    }
    
    #[Route('/rates', name: 'app_article_rates', methods: "POST")]
    function price(Request $request){
        $content = $request->getContent();
        $contentJson = json_decode($content);
        $toAddress = $contentJson->to_address;
        $parcel = $contentJson->parcel;
        try{
            EasyPost::setApiKey($_ENV['EASYPOST_API_KEY']);
            $shipment = Shipment::create([
                "from_address" => [
                    "name"    => "Mohamed",
                    "company" => "Red Hook Terminals",
                    "street1" => "70 Hamilton Avenue",
                    "street2" => "1th Floor",
                    "city"    => "Columbia Street Waterfront District",
                    "state"   => "New York",
                    "zip"     => "11231",
                    "phone"   => "+19735220999",
                ],
                "to_address" => [
                    "name"    => $toAddress->name,
                    "street1" => $toAddress->street1,
                    "city"    => $toAddress->city,
                    "state"   => $toAddress->state,
                    "country" => $toAddress->country,
                    "zip"     => $toAddress->zip,
                    "phone"   => $toAddress->phone,
                ],
                "parcel" => [
                    "length" => $parcel->length,
                    "width"  => $parcel->width,
                    "height" => $parcel->height,
                    "weight" => $parcel->weight,
                ],
            ]);
            return $this->json($shipment->rates, 200);
        }
        catch(Exception $e){
            return $this->badRequest($e);
        }
        $shipment->buy($shipment->lowest_rate());
    }
    

}
