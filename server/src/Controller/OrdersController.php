<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Repository\OrdersRepository;
use App\Controller\ResponseController;
use App\Entity\Articles;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

#[Route('/api/orders', name: 'app_images')]
class OrdersController extends ResponseController
{
    #[Route('/', name: 'orders', methods: "GET")]
    public function index(OrdersRepository $orders): JsonResponse
    {
        return $this->succesGet($orders->findAll(), "orders");
    }
    #[Route('/{id}', name: 'order', methods: "GET", requirements: ["id" => "\d+"])]
    public function get_(Orders $order = null)
    {
        return $this->show_data($order, "orders");
    }

    #[Route('/{id}', name: 'add_orders', methods: "POST", requirements: ["id" => "\d+"])]
    public function add_(Articles $articles = null, Request $request)
    {
        $jsonOrders = $request->getContent();
        $user = $this->getUser();
        if (is_null($articles)) {
            return $this->notFoundRequest("article");
        }
        try {
            try {
                $orders = $this->serializer->deserialize($jsonOrders, Orders::class, 'json');
                if ($this->valDif($user)) {
                   $userEntity = $this->getUserEntity($user);
                    $orders->setEmail($userEntity);
                    
                }
                $orders->addArticles($articles);
                $error = $this->validator->validate($orders);
                if (count($error) > 0) {
                    return $this->json($error, 400);
                }
                try {
                    $this->em->persist($orders);
                    $this->em->flush();
                } catch (\Throwable $th) {
                    return $this->badRequest($th);
                }
            } catch (\Exception $th) {
                return $this->badRequest($th);
            }
            return $this->succesPost("Ajout de orders reussi");
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }
    #[Route('/{id}', name: 'delete_order', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_(Orders $orders = null)
    {
        return $this->removeData($orders);
    }
}
