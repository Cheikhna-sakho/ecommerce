<?php

namespace App\Controller;

use App\Entity\Articles;
use App\Entity\Comments;
use App\Repository\CommentsRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/comments')]
class CommentsController extends ResponseController
{
    #[Route('/', name: 'app_comments', methods: "GET")]
    public function index(CommentsRepository $categories): JsonResponse
    {
        return $this->succesGet($categories->findAll(), "comment");
    }
    #[Route('/{id}', name: 'app_comment', methods: "GET", requirements: ["id" => "\d+"])]
    public function get_(Comments $categories = null): JsonResponse
    {
        return $this->show_data($categories, "comment");
    }
    #[Route('/{id}', name: 'app_comments_add', methods: "POST", requirements: ["id" => "\d+"])]
    function add_(Articles $article = null, Request $request)
    {
        try {
            $user = $this->getUser();
            if (!$this->valDif($article) || !$this->valDif($user)) {
                return $this->notFoundRequest("Vous devez avoir un compte pour poster un commentaire !");
            }
            $comment =$this->serializer->deserialize($request->getContent(), Comments::class, 'json');
            $comment->setArticle($article)
            ->setUser($this->getUserEntity($user))
            ->setCreatedAt(new \DateTimeImmutable());
            try {
                $this->em->persist($comment);
                $this->em->flush();
            } catch (\Throwable $th) {
                return $this->badRequest($th);
            }
            return $this->succesPost("commentaire enregistre");
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }
    #[Route('/{id}', name: 'delete_comment', methods: "DELETE", requirements: ["id" => "\d+"])]
    function delete_(Comments $comment = null)
    {
        return $this->removeData($comment);
    }
}
