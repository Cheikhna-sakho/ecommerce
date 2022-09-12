<?php

namespace App\DataFixtures;

use App\Entity\Categories as Cat;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class Categories extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $data = ["Composants PC","PC et Ordinateur","Périphérique PC","Image et son"];
        foreach ($data as $key => $value) {
            $categorie = new Cat;
            $categorie->setId($key)
                      ->setName($value);
            $manager->persist($categorie);
        };
        $manager->flush();
    }
}
