<?php

namespace App\Controller\Admin;

use App\Controller\ResponseController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\Request;

#[Route('api/admin/subcategories')]
#[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits suffisants")]
class SubCategoriesAdminController extends ResponseController
{

    #[Route('/', name: 'sub_categories_add',methods:"POST")]
    public function add_(Request $request){
        $request->getContent();
        
    }

}
