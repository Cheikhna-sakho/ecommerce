<?php

namespace App\DataFixtures;

use App\Entity\User as EntityUser;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class User extends Fixture
{
    private $passwordHasher;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {

        $data = json_decode(file_get_contents((__DIR__ . "/../DataFixtures/userData.json")));
        foreach ($data as $key => $value) {
            $user = new EntityUser;
            $user->setId($key);
            $user->setFirstname($value->firstname);
            $user->setLastname($value->lastname);
            $user->setPassword($this->passwordHasher->hashPassword($user,"abcd"));
            $user->setEmail($value->email);
            $user->setPhone($value->phone);
            $user->setAdresse($value->adresse);
            $user->setZipcode("75000");
            $user->setCity($value->city);
            $manager->persist($user);
        };

        $manager->flush();
    }
}
