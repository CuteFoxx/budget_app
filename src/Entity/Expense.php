<?php

namespace App\Entity;

use App\Repository\ExpenseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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

    #[Groups(["expense"])]
    #[ORM\ManyToOne(inversedBy: 'expense')]
    private ?ExpenseCategory $expenseCategory = null;




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
}
