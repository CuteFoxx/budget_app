<?php

namespace App\Entity;

use App\Repository\CurrenciesRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CurrenciesRepository::class)]
class Currencies
{
    #[Groups(["currencies"])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(["currencies"])]
    #[ORM\Column(length: 25)]
    private ?string $language = null;

    #[Groups(["currencies"])]
    #[ORM\Column(length: 25)]
    private ?string $currency = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(string $language): static
    {
        $this->language = $language;

        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): static
    {
        $this->currency = $currency;

        return $this;
    }
}
