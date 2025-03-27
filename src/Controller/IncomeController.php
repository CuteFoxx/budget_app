<?php

namespace App\Controller;

use App\Repository\IncomeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class IncomeController extends AbstractController
{
    private IncomeRepository $incomeRepository;

    private SerializerInterface $serializer;

    private TokenStorageInterface $tokenStorage;

    public function __construct(IncomeRepository $incomeRepository, SerializerInterface $serializer, TokenStorageInterface $tokenStorage)
    {
        $this->incomeRepository = $incomeRepository;
        $this->serializer = $serializer;
        $this->tokenStorage = $tokenStorage;
    }


    #[Route('api/incomes', name: 'api_incomes',  methods: ['GET'])]
    public function get(): JsonResponse
    {
        $token = $this->tokenStorage->getToken();

        $user = $token->getUser();
        $incomes = $this->incomeRepository->getNewest($user);

        return $this->json($this->serializer->serialize($incomes, 'json',  ['groups' => ['income']]));
    }

    #[Route('api/incomes', methods: ['POST'])]
    public function index(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        return new JsonResponse($this->serializer->serialize($this->incomeRepository->create($data), 'json', ['groups' => ['income']]));
    }

    #[Route('api/incomes', methods: ["DELETE"])]
    public function deleteExpense(Request $request)
    {
        $jsonData = json_decode($request->getContent(), true);
        $deleted = $this->incomeRepository->delete($jsonData);

        return new JsonResponse($this->serializer->serialize($deleted, 'json',  ['groups' => ['income']]));
    }

    #[Route('api/incomes/categories',  methods: ['POST'])]
    public function categoryCreate(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        $expenseCategory = $this->incomeRepository->createCategory($jsonData);

        return new JsonResponse($this->serializer->serialize($expenseCategory, 'json',  ['groups' => ['incomeCategories']]));
    }
}
