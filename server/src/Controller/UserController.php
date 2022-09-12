<?php

namespace App\Controller;

use Exception;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Controller\ResponseController;
use App\Repository\ArticlesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api')]
class UserController extends ResponseController
{
    #[Route('/user', name: 'all_user',methods:"GET")]
    public function index(UserRepository $userRepository): JsonResponse
    {
        return $this->succesGet($userRepository->findAll(), "users");
    }
    #[Route('/user/{id}', name: 'id_user',methods:"GET",requirements: ["id" => "\d+"])]
    public function show_id_user(User $user = null): JsonResponse
    {
       return $this->show_data($user,"users");
    }

    #[Route('/register', name: 'create_user', methods:"POST")]
    public function register(Request $req,UserPasswordHasherInterface $passwordHasher)
    {
        $jsonRecu = $req->getContent();

        try {
            $userData = $this->serializer->deserialize($jsonRecu, User::class, 'json');
            $password = $this->normalize->normalize($userData, null, ["groups" => "pwd"]);
            $userData->setPassword($passwordHasher->hashPassword(
                $userData,
                $password['password']
            ));
            try {
                $this->em->persist($userData);
                $this->em->flush();
            } catch (Exception $th) {
                return $this->badRequest($th);
            }
            return $this->succesPost("Inscription reussi");
        } catch (NotEncodableValueException $e) {
            return $this->badRequest($e);
        }
    }
    #[Route('/user/{id}', name: 'user_update',methods:"PATCH")]
    public function update(Request $request){
        try {
            $user = $this->getUser();
            if($this->valDif($user)){
                $userNewData = $request->getContent();
                $this->serializer->deserialize($userNewData, User::class, 'json', ["object_to_populate" => $user]);

                $error = $this->validator->validate($user);
                if (count($error) > 0) {
                    return $this->json($error, 400);
                }
                try {
                    $this->em->flush();
                } catch (\Throwable $th) {
                    return $this->badRequest($th);
                }
                return $this->succesPost("utilisateur mis a jour!");
            } else {
                return $this->failedRequest("aucun utilisateur trouvé");
            }
            
        } catch (\Throwable $th) {
           $this->badRequest($th);
        }
    }
    #[Route('/user', name: 'delete_user', methods: "DELETE")]
    function delete_()
    {
        return $this->removeData($this->getUserEntity($this->getUser()));
    }
    #[Route('/connect', name: 'user_connect', methods: "GET")]
    public function connected(UserInterface $user)
    {
       return $this->show_data($user,"users");
    }
}
