<?php

namespace App\Controller;

use Exception;
use App\Entity\Categories;
use App\Controller\ResponseController;
use App\Repository\CategoriesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

#[Route('api/categories')]
class CategoriesController extends ResponseController
{
    #[Route('/', name: 'app_categories', methods: "GET")]
    public function index(CategoriesRepository $categories): JsonResponse
    {
        return $this->succesGet($categories->findAll(), "categories");
    }
    #[Route('/{id}', name: 'category', methods: "GET",requirements: ["id" => "\d+"])]
    public function getCat(Categories $cat = null)
    {
        return $this->show_data($cat, "categories");
    }

    #[Route('/', name: 'app_categories_add', methods: "POST")]
    public function add_categories(Request $request)
    {
        $jsonCategories = $request->getContent();
        try {
            try {
                $categories = $this->serializer->deserialize($jsonCategories, Categories::class, 'json');
                $this->em->persist($categories);
                $this->em->flush();
            } catch (\Exception $th) {
                return $this->badRequest($th);
            }
            return $this->succesPost("Ajout de categories reussi");
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }
    #[Route('/{id}', name: 'delet_categorie', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_article(Categories $categories = null)
    {
        return $this->removeData($categories);
    }
}
