<?php

namespace App\Controller\Admin;

use App\Controller\ResponseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;

#[Route('api/admin/categories')]
#[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits suffisants")]
class CategoriesAdminController extends ResponseController
{

    #[Route('/', name: 'app_categories_add', methods: "POST")]
    public function add_(Request $req)
    {
        $jsonCategories = $req->getContent();
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
}
