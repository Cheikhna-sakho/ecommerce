<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Controller\ResponseController;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

#[Route('/api/basket')]
class BasketController extends ResponseController
{

    #[Route('/{id}', name: 'baskets', methods: "GET", requirements: ["id" => "\d+"])]
    public function index($id, UserRepository $user): JsonResponse
    {
        return $this->succesGet($user->find($id), "basket");
    }

    #[Route('add/{id}', name: 'basket_add', methods: "PATCH", requirements: ["id" => "\d+"])]
    function add_(Articles $article = null)
    {
        $user = $this->getUser();
        if (is_null($user) || is_null($article)) {
            return $this->notFoundRequest();
        }
        try {

            $article->addBasket($this->getUserEntity($user));
            $error = $this->validator->validate($article);
            if (count($error) > 0) {
                return $this->json($error, 400);
            }

            $this->em->flush();

            return $this->succesRequest();
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }

    #[Route('delete/{id}', name: 'delet_articles', methods: "PATCH", requirements: ["id" => "\d+"])]
    function delete_(Articles $article = null)
    {
        $user = $this->getUser();
        if (is_null($user) || is_null($article)) {
            return $this->notFoundRequest();
        }
        try {
            $userEntity = $this->getUserEntity($user);
            $article->removeBasket($userEntity);
            $this->em->flush();
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }
}
