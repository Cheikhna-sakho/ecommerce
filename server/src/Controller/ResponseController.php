<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Exception;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ResponseController extends AbstractController
{
    protected $em;
    protected $serializer;
    protected $normalize;
    protected $validator;
    protected $request;
    private $userRepository;
    function __construct(EntityManagerInterface $em, SerializerInterface $serializer, NormalizerInterface $normalize, ValidatorInterface $validator, UserRepository $userRepository)
    {
        $this->em = $em;
        $this->serializer = $serializer;
        $this->normalize = $normalize;
        $this->validator = $validator;
        $this->userRepository = $userRepository;
    }
    public function succesRequest()
    {
        return $this->json(['status' => 204], 204);
    }
    public function succesGet($data, string $group)
    {
        try {
            return $this->json($data, 200, [], ["groups" => $group]);
        } catch (\Throwable $th) {
            return $this->failedRequest($th);
        }
    }
    public function show_data($data, $name)
    {
        try {
            if (!is_null($data)) {
                return $this->succesGet($data, $name);
            } else {
                return $this->notFoundRequest($name);
            }
        } catch (\Throwable $th) {
            return $this->badRequest($th);
        }
    }
    public function succesPost($message = "success")
    {
        return $this->json([
            'status' => 201,
            "message" => $message
        ], 201);
    }
    public function removeData($data)
    {
        try {
            if ($this->valDif($data)) {
                $this->em->remove($data);
                $this->em->flush();
                return $this->succesRequest();
            } else {
                return $this->notFoundRequest();
            }
        } catch (Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
    public function badRequest($error)
    {
        return $this->json([
            'status' => 400,
            'message' => $error->getMessage(),
        ], 400);
    }
    public function failedRequest($message = "")
    {
        return $this->json([
            'status' => 400,
            'message' => $message,
        ], 400);
    }
    public function notFoundRequest($dataName = "lien")
    {
        return $this->json([
            'status' => 404,
            'message' => "Aucun(e) " . $dataName . " trouvé!",
        ], 404);
    }
    public function valDif($a, $b = null)
    {
        return $a !== $b;
    }
    public function normalizeData($data, $group)
    {
        return $this->normalize->normalize($data, null, ["groups" => $group]);
    }
    
    public function getUserEntity($user)
    {
        $userData = $this->normalizeData($user, "users");
        $userEntity = $this->userRepository->find($userData["id"]);

        return $userEntity;
    }
    public function deserialize($data, $class)
    {
        return $this->serializer->deserialize($data, $class, 'json');
    }
}
