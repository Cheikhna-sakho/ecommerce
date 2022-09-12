<?php

namespace App\Controller;

use App\Controller\ResponseController;
use App\Entity\Categories;
use App\Entity\SubCategories;
use App\Repository\SubCategoriesRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/subcategories')]
class SubCategoriesController extends ResponseController
{
    #[Route('/', name: 'sub_categories', methods: "GET")]
    public function index(SubCategoriesRepository $subCategoriesRepository): JsonResponse
    {
        return $this->succesGet($subCategoriesRepository->findAll(), "articles");
    }

    #[Route('/{id}', name: 'sub_categorie', methods: "GET",requirements: ["id" => "\d+"])]
    public function show_subCategories(SubCategories $subCategories = null)
    {
        return $this->show_data($subCategories, "Cet sous categories");
    }

    #[Route('/{id}', name: 'sub_categories_add', methods: "POST")]
    public function add_(Categories $categories = null, Request $request)
    {
        $jsonContent = $request->getContent();
        try {

        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }
    #[Route('/{id}', name: 'delete_sub_categories', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_(SubCategories $subCategories = null)
    {
        return $this->removeData($subCategories);
    }
}