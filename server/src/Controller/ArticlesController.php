<?php

namespace App\Controller;

use DateTime;
use Exception;

use EasyPost\EasyPost;
use EasyPost\Shipment;
use App\Entity\Articles;
use App\Controller\ResponseController;
use App\Repository\ArticlesRepository;
use App\Repository\SubCategoriesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

#[Route('/api/articles')]
class ArticlesController extends ResponseController
{

    #[Route('/', name: 'all_articles', methods: "GET")]
    public function index(ArticlesRepository $articlesRepository, SubCategoriesRepository $sub): JsonResponse
    {
        return $this->succesGet($articlesRepository->findAll(), "articles");
    }

    #[Route('/{id}', name: 'id_articles', requirements: ["id" => "\d+"])]
    function show_article_id(Articles $article = null)
    {
        if ($this->valDif($article)) {
            $this->set_popularity($article);
        }
        return $this->show_data($article, "articles");
    }
    #[Route('/', name: 'add_articles', methods: "POST")]
    function add_action(Request $request, SubCategoriesRepository $subCategoriesRepository)
    {
       
        $content = $request->getContent();

        try {
            $articles = $this->serializer->deserialize($content, Articles::class, 'json');
            $sub_cat_id = json_decode($content)->sub_categories_id;
            foreach ($sub_cat_id as $value) {
                try {
                    $sub_cat = $subCategoriesRepository->find($value);
                    $articles->addSubCategory($sub_cat);
                } catch (\Throwable $th) {
                    return $this->failedRequest("Id subCategories invalid");
                }
            }
            $articles->setCreatedAt(new DateTime());

            $error = $this->validator->validate($articles);
            if (count($error) > 0) {
                return $this->json($error, 400);
            }

            $this->em->persist($articles);
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
    #[Route('/{id}', name: 'update_articles', methods: "PATCH", requirements: ["id" => "\d+"])]
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
                return $this->succesRequest();
            } else {
                return $this->notFoundRequest("article");
            }
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }

    function set_popularity($article)
    {
        $user = $this->getUser();
        if ($this->valDif($user)) {
            $popularity = $this->normalizeData($article, "popularity");

            $userInPopularity = $popularity["user"];
            $userData = $this->normalizeData($user, "popularity");
           
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
    #[Route('/{id}', name: 'delet_articles',  methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_article(Articles $article = null)
    {
        return $this->removeData($article);
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



    //STOCK
    #[Route('/stock/{id}', methods: "PATCH", requirements: ["id" => "\d+"])]
    function stock_incremente(Articles $article = null)
    {
        try {
            if ($this->valDif($article)) {
                $stock = $this->normalizeData($article, "stock");
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
            } else {
                return $this->notFoundRequest("article");
            }
        } catch (NotEncodableValueException $th) {
            return $this->badRequest($th);
        }
    }

    #[Route('/search/{search}', name: 'app_article_search', methods: "GET")]
    function search_article($search)
    {
        try {
            $query  = $this->em->createQuery("SELECT a from App\Entity\Articles a JOIN a.sub_categories s WHERE a.title like '%" . $search . "%'OR s.name like '%" . $search . "%'");
            $article = $query->getResult();
            return $this->succesGet($article, "articles");
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }

    #[Route('/rates', name: 'app_article_rates', methods: "POST")]
    function price(Request $request)
    {
        $content = $request->getContent();
        $contentJson = json_decode($content);
        $toAddress = $contentJson->to_address;
        $parcel = $contentJson->parcel;
        try {
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
            $shipment->buy($shipment->lowest_rate());
            $track = $shipment->tracker->public_url;
            return $this->json([$shipment->rates, $shipment->id, $track], 200);
        } catch (Exception $e) {
            return $this->badRequest($e);
        }
    }
}
