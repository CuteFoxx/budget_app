<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\PropertyInfo\Tests\Fixtures\DefaultValue;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    /**
     * @var Collection<int, Expense>
     */
    #[ORM\OneToMany(targetEntity: Expense::class, mappedBy: 'user', orphanRemoval: true)]
    #[Groups(["expense"])]
    private Collection $expenses;

    /**
     * @var Collection<int, ExpenseCategory>
     */
    #[Groups(["expense", "expenseCategories"])]
    #[ORM\OneToMany(targetEntity: ExpenseCategory::class, mappedBy: 'user')]
    private Collection $expenseCategories;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?UserSettings $userSettings = null;

    /**
     * @var Collection<int, Income>
     */
    #[ORM\OneToMany(targetEntity: Income::class, mappedBy: 'user')]
    private Collection $incomes;

    /**
     * @var Collection<int, IncomeCategory>
     */
    #[ORM\OneToMany(targetEntity: IncomeCategory::class, mappedBy: 'user')]
    private Collection $incomeCategories;

    /**
     * @var Collection<int, ScheduledTask>
     */
    #[ORM\OneToMany(targetEntity: ScheduledTask::class, mappedBy: 'user')]
    private Collection $scheduledTasks;

    #[ORM\Column(type: Types::SMALLINT, options: ['default' => 2])]
    private ?int $max_tasks = 2;

    public function __construct()
    {
        $this->expenses = new ArrayCollection();
        $this->expenseCategories = new ArrayCollection();
        $this->incomes = new ArrayCollection();
        $this->incomeCategories = new ArrayCollection();
        $this->scheduledTasks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
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
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    /**
     * @return Collection<int, Expense>
     */
    public function getExpenses(): Collection
    {
        return $this->expenses;
    }

    public function addExpense(Expense $expense): static
    {
        if (!$this->expenses->contains($expense)) {
            $this->expenses->add($expense);
            $expense->setUser($this);
        }

        return $this;
    }

    public function removeExpense(Expense $expense): static
    {
        if ($this->expenses->removeElement($expense)) {
            // set the owning side to null (unless already changed)
            if ($expense->getUser() === $this) {
                $expense->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ExpenseCategory>
     */
    public function getExpenseCategories(): Collection
    {
        return $this->expenseCategories;
    }

    public function addExpenseCategory(ExpenseCategory $expenseCategory): static
    {
        if (!$this->expenseCategories->contains($expenseCategory)) {
            $this->expenseCategories->add($expenseCategory);
            $expenseCategory->setUser($this);
        }

        return $this;
    }

    public function removeExpenseCategory(ExpenseCategory $expenseCategory): static
    {
        if ($this->expenseCategories->removeElement($expenseCategory)) {
            // set the owning side to null (unless already changed)
            if ($expenseCategory->getUser() === $this) {
                $expenseCategory->setUser(null);
            }
        }

        return $this;
    }

    public function getUserSettings(): ?UserSettings
    {
        return $this->userSettings;
    }

    public function setUserSettings(UserSettings $userSettings): static
    {
        // set the owning side of the relation if necessary
        if ($userSettings->getUser() !== $this) {
            $userSettings->setUser($this);
        }

        $this->userSettings = $userSettings;

        return $this;
    }

    /**
     * @return Collection<int, Income>
     */
    public function getIncomes(): Collection
    {
        return $this->incomes;
    }

    public function addIncome(Income $income): static
    {
        if (!$this->incomes->contains($income)) {
            $this->incomes->add($income);
            $income->setUser($this);
        }

        return $this;
    }

    public function removeIncome(Income $income): static
    {
        if ($this->incomes->removeElement($income)) {
            // set the owning side to null (unless already changed)
            if ($income->getUser() === $this) {
                $income->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, IncomeCategory>
     */
    public function getIncomeCategories(): Collection
    {
        return $this->incomeCategories;
    }

    public function addIncomeCategory(IncomeCategory $incomeCategory): static
    {
        if (!$this->incomeCategories->contains($incomeCategory)) {
            $this->incomeCategories->add($incomeCategory);
            $incomeCategory->setUser($this);
        }

        return $this;
    }

    public function removeIncomeCategory(IncomeCategory $incomeCategory): static
    {
        if ($this->incomeCategories->removeElement($incomeCategory)) {
            // set the owning side to null (unless already changed)
            if ($incomeCategory->getUser() === $this) {
                $incomeCategory->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ScheduledTask>
     */
    public function getScheduledTasks(): Collection
    {
        return $this->scheduledTasks;
    }

    public function addScheduledTask(ScheduledTask $scheduledTask): static
    {
        if (!$this->scheduledTasks->contains($scheduledTask)) {
            $this->scheduledTasks->add($scheduledTask);
            $scheduledTask->setUser($this);
        }

        return $this;
    }

    public function removeScheduledTask(ScheduledTask $scheduledTask): static
    {
        if ($this->scheduledTasks->removeElement($scheduledTask)) {
            // set the owning side to null (unless already changed)
            if ($scheduledTask->getUser() === $this) {
                $scheduledTask->setUser(null);
            }
        }

        return $this;
    }

    public function getMaxTasks(): ?int
    {
        return $this->max_tasks;
    }

    public function setMaxTasks(int $max_tasks): static
    {
        $this->max_tasks = $max_tasks;

        return $this;
    }
}
