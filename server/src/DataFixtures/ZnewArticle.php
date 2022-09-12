<?php

namespace App\DataFixtures;

use App\Entity\Articles as EntityArticles;
use App\Repository\SubCategoriesRepository;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ZnewArticle extends Fixture
{
    protected $subCategory;
    protected $res;
    protected $normalize;
    public function __construct(SubCategoriesRepository $subCategory,NormalizerInterface $normalize)
    {
        $this->subCategory =$subCategory;
        $this->normalize = $normalize;
    }
    public function load(ObjectManager $manager): void
    {
        $subCat = $this->normalize->normalize($this->subCategory->findAll(),null,["groups"=>"subCategories"]);
        // $subCat = $this->res->normalizeData($this->subCategory->findAll(), "subCategories");
        $data = json_decode(file_get_contents((__DIR__."/articleData.json")));
        
        foreach ($data as $key => $value) {
            $rand_sub_key = array_rand($subCat);
            // dd($subCat);
            $categories = $this->subCategory->find($subCat[$rand_sub_key]["id"]);
            // dd($categories);
            $artricle = new EntityArticles;
            $artricle->setId($key+1)
                     ->setTitle("Article ".$key+1)
                     ->setDescription($value->description)
                     ->setCaracteristic($value->caracteristic)
                     ->setPrice($value->price)
                     ->setStock($value->stock)
                     ->setPopularity($value->popularity)
                     ->addSubCategory($categories)
                     ->setCreatedAt(new DateTime());

            // var_dump($value->caracteristic);
            $manager->persist($artricle);
        };

        $manager->flush();
    }
}
