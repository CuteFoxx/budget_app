<?php

namespace App\Entity;

use App\Repository\ScheduledTaskRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Psr\Log\LoggerInterface;

#[ORM\Entity(repositoryClass: ScheduledTaskRepository::class)]
class ScheduledTask
{
    const FREQUENCY_WEEKLY = 'weekly';
    const FREQUENCY_MONTLY = 'monthly';

    public const FREQUENCIES = [
        self::FREQUENCY_WEEKLY,
        self::FREQUENCY_MONTLY,
    ];

    const TYPE_EXPENSE = 'expense';

    const TYPE_INCOME = 'income';

    const TYPE_SUBSRIPTION = 'subscription';

    public const TYPES = [
        self::TYPE_EXPENSE,
        self::TYPE_INCOME,
        self::TYPE_SUBSRIPTION,
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'scheduledTasks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column]
    private array $repeatDays = [];

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $executedAt = null;

    #[ORM\Column]
    private array $payload = [];

    #[ORM\Column(length: 30, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private string $frequency;


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

    public function getRepeatDays(): array
    {
        return $this->repeatDays;
    }

    public function setRepeatDays(array $repeatDays): static
    {
        $this->repeatDays = $repeatDays;

        return $this;
    }

    public function getExecutedAt(): ?\DateTimeInterface
    {
        return $this->executedAt;
    }

    public function setExecutedAt(?\DateTimeInterface $executedAt): static
    {
        $this->executedAt = $executedAt;

        return $this;
    }

    public function getPayload(): array
    {
        return $this->payload;
    }

    public function setPayload(array $payload): static
    {
        $this->payload = $payload;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        if (!in_array($type, self::TYPES)) {
            throw new \InvalidArgumentException("Invalid type: $type");
        }
        $this->type = $type;

        return $this;
    }

    public function setFrequency(string $frequency,): self
    {

        if (!in_array($frequency, self::FREQUENCIES)) {
            throw new \InvalidArgumentException("Invalid frequency: $frequency");
        }

        $this->$frequency = $frequency;

        return $this;
    }

    public function getFrequency(): string
    {
        return $this->frequency;
    }
}
