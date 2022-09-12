<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ArticlesRepository;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
#[ORM\Entity(repositoryClass: ArticlesRepository::class)]
class Articles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["articles", "users", "images","subCategories","orders"])]
    private $id;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["articles", "users","subCategories","orders"])]
    #[Assert\NotBlank]
    private $title;

    #[ORM\Column(type: 'text')]
    #[Groups(["articles","subCategories"])]
    #[Assert\NotBlank]
    private $description;
    
    #[ORM\Column(type: 'text')]
    #[Groups(["articles", "users"])]
    #[Assert\NotBlank]
    private $caracteristic;
    
    #[ORM\Column(type: 'float')]
    #[Groups(["articles", "users","subCategories"])]
    #[Assert\NotBlank]
    private $price;

    #[ORM\Column(nullable: true)]
    #[Groups(["stock","articles","subCategories"])]
    private ?int $stock = null;

    #[ORM\ManyToMany(targetEntity: SubCategories::class, inversedBy: 'articles')]
    #[Groups("articles")]
    #[JoinColumn(nullable:false)]

    private Collection $sub_categories;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Images::class)]
    #[Groups(["articles","subCategories"])]
    private Collection $images;

    #[ORM\Column(nullable: true)]
    #[Groups(["articles", "popularity","subCategories"])]
    private ?int $popularity = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(["articles","subCategories"])]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?int $discount = null;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: Comments::class)]
    private Collection $comments;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'basket')]
    private Collection $basket;

    #[ORM\ManyToMany(targetEntity: Orders::class, mappedBy: 'article')]
    private Collection $orders;

    public function __construct()
    {
        $this->sub_categories = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->user = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->basket = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }
    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCaracteristic(): ?string
    {
        return $this->caracteristic;
    }

    public function setCaracteristic(string $caracteristic): self
    {
        $this->caracteristic = $caracteristic;

        return $this;
    }

    public function getPrice(): ?int
    {
        // $discount = $this->getDiscount()*0.01;
        // return $discount !== null ? ($this->price - $discount) :  $this->price;
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }


    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(?int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * @return Collection<int, SubCategories>
     */
    public function getSubCategories(): Collection
    {
        return $this->sub_categories;
    }

    public function addSubCategory(SubCategories $subCategory): self
    {
        if (!$this->sub_categories->contains($subCategory)) {
            $this->sub_categories[] = $subCategory;
        }

        return $this;
    }

    public function removeSubCategory(SubCategories $subCategory): self
    {
        $this->sub_categories->removeElement($subCategory);

        return $this;
    }

    /**
     * @return Collection<int, Images>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Images $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setArticle($this);
        }

        return $this;
    }

    public function removeImage(Images $image): self
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getArticle() === $this) {
                $image->setArticle(null);
            }
        }

        return $this;
    }

    public function getPopularity(): ?int
    {
        return $this->popularity;
    }

    public function setPopularity(?int $popularity): self
    {
        $this->popularity = $popularity;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        $this->user->removeElement($user);

        return $this;
    }

    

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount(?int $discount): self
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * @return Collection<int, Comments>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comments $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setArticle($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getArticle() === $this) {
                $comment->setArticle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getBasket(): Collection
    {
        return $this->basket;
    }

    public function addBasket(User $basket): self
    {
        if (!$this->basket->contains($basket)) {
            $this->basket->add($basket);
            $basket->addBasket($this);
        }

        return $this;
    }

    public function removeBasket(User $basket): self
    {
        if ($this->basket->removeElement($basket)) {
            $basket->removeBasket($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Orders>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Orders $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->addArticle($this);
        }

        return $this;
    }

    public function removeOrder(Orders $order): self
    {
        if ($this->orders->removeElement($order)) {
            $order->removeArticle($this);
        }

        return $this;
    }
}
