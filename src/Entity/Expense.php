<?php

namespace App\Entity;

use App\Repository\ExpenseRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

use function Symfony\Component\Clock\now;

#[ORM\Entity(repositoryClass: ExpenseRepository::class)]
class Expense
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["expense"])]
    private ?int $id = null;

    #[Groups(["expense"])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(["expense"])]
    #[ORM\Column]
    private ?float $amount = null;

    #[ORM\ManyToOne(inversedBy: 'expenses')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[Groups(["expense", "expenseCategories"])]
    #[ORM\ManyToOne(inversedBy: 'expense')]
    private ?ExpenseCategory $expenseCategory = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, options: ["default" => "CURRENT_TIMESTAMP"])]
    private ?\DateTimeInterface $created = null;

    #[Groups(["expense"])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true, options: ["default" => "CURRENT_TIMESTAMP"])]
    private ?\DateTimeInterface $date = null;




    public function __construct() {}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }


    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getExpenseCategory(): ?ExpenseCategory
    {
        return $this->expenseCategory;
    }

    public function setExpenseCategory(?ExpenseCategory $expenseCategory): static
    {
        $this->expenseCategory = $expenseCategory;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): static
    {
        $this->created = $created;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }
}
