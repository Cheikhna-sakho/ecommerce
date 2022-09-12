<?php

namespace App\DataFixtures;

use Doctrine\Persistence\ObjectManager;
use App\Repository\CategoriesRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Entity\SubCategories as EntitySubCategories;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class SubCategories extends Fixture
{
    private  $normalize;
    private $categories;
    function __construct(NormalizerInterface $normalize, CategoriesRepository $categories)
    {
        $this->normalize = $normalize;
        $this->categories = $categories;
    }
    public function load(ObjectManager $manager): void
    {
        $data = json_decode(file_get_contents((__DIR__ . "/sub_cat.json")));
        foreach ($data as $key => $value) {
            $cat =$this->categories->findOneBy(["name" => trim($value->categories)]);
            foreach ($value->sub_cat as $key => $value) {
                $sub_cat = new EntitySubCategories;
                $sub_cat->setCategories($cat);
                $sub_cat->setName($value);
                $manager->persist($sub_cat);
            }
        }
        $manager->flush();
    }
}
