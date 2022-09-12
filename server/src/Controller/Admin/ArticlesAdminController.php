<?php

namespace App\Controller\Admin;

use DateTime;
use Exception;
use App\Entity\Articles;
use App\Controller\ResponseController;
use App\Repository\SubCategoriesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;


#[Route('api/admin/articles')]
#[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits suffisants")]
class ArticlesAdminController extends ResponseController
{
    #[Route('/', name: 'add_articles', methods: "POST")]
    function add_(Request $request,SubCategoriesRepository $subCategoriesRepository)
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
            try {
                $this->em->persist($articles);
                $this->em->flush();
            } catch (\Throwable $th) {
                return $this->badRequest($th);
            }
            return $this->succesPost("articles ajouté!");
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }
    #[Route('/{id}', name: 'update_articles', methods: "PATCH",requirements:["id"=>"\d+"])]
    function update_(Articles $article = null, Request $request)
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
    #[Route('/{id}', name: 'delet_articles', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_(Articles $article = null)
    {
        try {
            if ($this->valDif($article)) {
                $this->em->remove($article);
                $this->em->flush();
                return $this->succesRequest();
            } else {
                return $this->notFoundRequest("article");
            }
        } catch (Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
