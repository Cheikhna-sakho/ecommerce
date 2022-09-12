<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrdersRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrdersRepository::class)]
class Orders
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups("orders")]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups("orders")]

    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $order_number = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $phone = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $zipcode = null;

    #[ORM\ManyToMany(targetEntity: Articles::class, inversedBy: 'orders')]
    #[Groups("orders")]
    private Collection $article;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[Groups("orders")]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups("orders")]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    private ?string $tracking_url = null;

    public function __construct()
    {
        $this->article = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getOrderNumber(): ?string
    {
        return $this->order_number;
    }

    public function setOrderNumber(string $order_number): self
    {
        $this->order_number = $order_number;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    /**
     * @return Collection<int, Articles>
     */
    public function getArticle(): Collection
    {
        return $this->article;
    }

    public function addArticle(Articles $article): self
    {
        if (!$this->article->contains($article)) {
            $this->article->add($article);
        }

        return $this;
    }

    public function removeArticle(Articles $article): self
    {
        $this->article->removeElement($article);

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getTrackingUrl(): ?string
    {
        return $this->tracking_url;
    }

    public function setTrackingUrl(string $tracking_url): self
    {
        $this->tracking_url = $tracking_url;

        return $this;
    }
}
