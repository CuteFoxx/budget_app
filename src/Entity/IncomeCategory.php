<?php

namespace App\Entity;

use App\Repository\IncomeCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: IncomeCategoryRepository::class)]
class IncomeCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'incomeCategories')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * @var Collection<int, Income>
     */
    #[ORM\OneToMany(targetEntity: Income::class, mappedBy: 'incomeCategory')]
    private Collection $income;

    #[Groups(['income', 'incomeCategories'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    public function __construct()
    {
        $this->income = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Income>
     */
    public function getIncome(): Collection
    {
        return $this->income;
    }

    public function addIncome(Income $income): static
    {
        if (!$this->income->contains($income)) {
            $this->income->add($income);
            $income->setIncomeCategory($this);
        }

        return $this;
    }

    public function removeIncome(Income $income): static
    {
        if ($this->income->removeElement($income)) {
            // set the owning side to null (unless already changed)
            if ($income->getIncomeCategory() === $this) {
                $income->setIncomeCategory(null);
            }
        }

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
