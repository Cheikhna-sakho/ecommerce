<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SubCategoriesRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SubCategoriesRepository::class)]
class SubCategories
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(["categories","articles","subCategories"])]

    private ?int $id = null;
    #[ORM\Column(length: 255)]
    #[Groups(["categories","articles","subCategories"])]
    private ?string $name = null;


    #[ORM\ManyToMany(targetEntity: Articles::class, mappedBy: 'sub_categories')]
    #[Groups("subCategories")]
    private Collection $articles;

    #[ORM\ManyToOne(inversedBy: 'subCategories')]
    #[JoinColumn(nullable:false)]
    #[Groups(["articles","subCategories"])]
    private ?Categories $categories = null;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }


    /**
     * @return Collection<int, Articles>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Articles $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addSubCategory($this);
        }

        return $this;
    }

    public function removeArticle(Articles $article): self
    {
        if ($this->articles->removeElement($article)) {
            $article->removeSubCategory($this);
        }

        return $this;
    }

    public function getCategories(): ?Categories
    {
        return $this->categories;
    }

    public function setCategories(?Categories $categories): self
    {
        $this->categories = $categories;

        return $this;
    }
}
