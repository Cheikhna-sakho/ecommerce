<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Articles;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["users", "articles","popularity"] )]

    private $id;
    
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Groups("users")]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups("users")]
    private $roles = [];
    
    #[ORM\Column(type: 'string')]
    #[Groups("pwd")]
    #[Assert\NotBlank]
    private $password;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups(["users", "comments"])]
    private $firstname;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups(["users", "comments"])]
    private $lastname;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups("users")]
    private $phone;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups("users")]
    private $adresse;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups("users")]
    private $city;
    
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Groups("users")]
    private $zipcode;
    
    #[ORM\Column(type: 'integer', nullable: true)]
    private $creditcard;
    
    #[ORM\Column(type: 'boolean', nullable: true)]
    private $token;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: CreditCard::class)]
    private Collection $creditCards;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Comments::class)]
    private Collection $comments;

    #[ORM\ManyToMany(targetEntity: Articles::class, inversedBy: 'basket')]
    #[Groups("user","articles","basket")]
    private Collection $basket;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Orders::class)]
    private Collection $orders;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->articles_history = new ArrayCollection();
        $this->basket = new ArrayCollection();
        $this->creditCards = new ArrayCollection();
        $this->comments = new ArrayCollection();
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
    public function getEmail(): ?string
    {
        return $this->email;
    }
    
    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

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

    public function getCreditcard(): ?int
    {
        return $this->creditcard;
    }

    public function setCreditcard(?int $creditcard): self
    {
        $this->creditcard = $creditcard;

        return $this;
    }

    public function isToken(): ?bool
    {
        return $this->token;
    }

    public function setToken(?bool $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return Collection<int, CreditCard>
     */
    public function getCreditCards(): Collection
    {
        return $this->creditCards;
    }

    public function addCreditCard(CreditCard $creditCard): self
    {
        if (!$this->creditCards->contains($creditCard)) {
            $this->creditCards->add($creditCard);
            $creditCard->setUser($this);
        }

        return $this;
    }

    public function removeCreditCard(CreditCard $creditCard): self
    {
        if ($this->creditCards->removeElement($creditCard)) {
            // set the owning side to null (unless already changed)
            if ($creditCard->getUser() === $this) {
                $creditCard->setUser(null);
            }
        }

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
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comments $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Articles>
     */
    public function getBasket(): Collection
    {
        return $this->basket;
    }

    public function addBasket(Articles $basket): self
    {
        if (!$this->basket->contains($basket)) {
            $this->basket->add($basket);
        }

        return $this;
    }

    public function removeBasket(Articles $basket): self
    {
        $this->basket->removeElement($basket);

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
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Orders $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

        return $this;
    }
}
