<?php

namespace App\Controller\Admin;

use Exception;
use App\Entity\Images;
use App\Entity\Articles;
use App\Controller\ResponseController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

#[Route('api/admin/images')]
#[IsGranted('ROLE_ADMIN', message: "Vous n'avez pas les droits suffisants")]
class ImagesAdminController extends ResponseController
{
    #[Route('/{id}', name: 'app_image_add', methods: "POST", requirements: ["id" => "\d+"])]
    function add_(Articles $article = null, Request $request)
    {
        $allFile = $request->files->all();
        $tailleMax = 3000000;

        if (!$this->valDif($article)) {
            return $this->notFoundRequest("article");
        }
        if (count($allFile) <= 0) {
            return $this->failedRequest("Aucunes images envoyé");
        }
        function check_extentions($fileType)
        {
            $imgFormat = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
            $check = false;
            foreach ($imgFormat as $value) {
                if ($fileType == $value) {
                    $check = true;
                }
            }
            return $check;
        }

        foreach ($allFile as $file) {
            $fileType = $file->getClientMimeType();
            $fileName = $file->getClientOriginalName();
            $fileSize = $file->getSize();
            if (check_extentions($fileType)) {
                if ($fileSize <= $tailleMax) {
                    $check = move_uploaded_file($file, $this->getParameter('images_directory') .  $fileName);

                    if ($check) {
                        $image = new Images();
                        $image->setSrc("/api/images/show/" .  $fileName);
                        $image->setArticle($article);
                        try {
                            $this->em->persist($image);
                            $this->em->flush();
                        } catch (\Throwable $th) {
                            $this->badRequest($th);
                        }
                    }
                } else {
                    return $this->failedRequest("Fichier trop volumineux maximum " . ($tailleMax / 1000000) . "Mo");
                }
            } else {
                return $this->failedRequest("Extention invalid (jpg, jepg, png, gif");
            }
        }
        return $this->succesPost("Images enregistrer");
    }

    #[Route('/{id}', name: 'app_image_delete', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_(Images $image = null)
    {
        try {
            if ($this->valDif($image)) {
                $this->em->remove($image);
                $this->em->flush();
                return $this->succesPost("image supprimée");
            } else {
                return $this->notFoundRequest("image");
            }
        } catch (Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
