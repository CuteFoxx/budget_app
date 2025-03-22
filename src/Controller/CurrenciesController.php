<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\CurrenciesRepository;
use Symfony\Component\Serializer\SerializerInterface;

final class CurrenciesController extends AbstractController
{
    private  SerializerInterface $serializer;
    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer =  $serializer;
    }

    #[Route('api/currencies', name: 'api_currencies', methods: ["GET", 'POST'])]
    public function index(CurrenciesRepository $currenciesRepository): JsonResponse
    {
        $currencies = $currenciesRepository->getAll();

        return $this->json($this->serializer->serialize($currencies, 'json', ['groups' => ['currencies']]));
    }
}
