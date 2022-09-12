<?php

namespace App\Controller;

use Exception;
use App\Entity\Images;
use App\Repository\ImagesRepository;
use App\Controller\ResponseController;
use App\Entity\Articles;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api/images', name: 'app_images')]
class ImagesController extends ResponseController
{

    #[Route('/src', name: 'app_image_src', methods: "GET")]
    function src_img(ImagesRepository $imagesRepository)
    {
        return $this->succesGet($imagesRepository->findAll(), "images");
    }

    #[Route('/show/{src}', name: 'app_image_show', methods: "GET")]
    function show_img($src)
    {

        try {
            $imgSrc = $this->getParameter('images_directory') . $src;
            $image = file_get_contents($imgSrc);
            $explodeSrc  = explode('.', $src);
            $type = "image/" . end($explodeSrc);

            return new Response($image, 200, ["content-Type" => $type]);
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }

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
        return $this->removeData($image);
    }
}
