<?php

namespace App\Controller;

use App\Repository\ExpenseRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class ExpenseController extends AbstractController
{

    private TokenStorageInterface $tokenStorage;

    private  SerializerInterface $serializer;

    private ExpenseRepository $expenseRepository;

    private LoggerInterface $logger;

    public function __construct(TokenStorageInterface $tokenStorage, SerializerInterface $serializer, ExpenseRepository $expenseRepository, LoggerInterface $logger)
    {
        $this->tokenStorage = $tokenStorage;
        $this->serializer = $serializer;
        $this->expenseRepository = $expenseRepository;
        $this->logger = $logger;
    }

    #[Route('api/expenses', name: 'app_expense', methods: ['GET'])]
    public function index(ExpenseRepository $expenseRepository): JsonResponse
    {
        $token = $this->tokenStorage->getToken();

        $user = $token->getUser();
        $expenses = $expenseRepository->getNewest($user);

        return $this->json($this->serializer->serialize($expenses, 'json',  ['groups' => ['expense']]));
    }

    #[Route('api/expenses', methods: ["POST"])]
    public function createExpense(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        $expense = $this->expenseRepository->create($jsonData);

        return new JsonResponse($this->serializer->serialize($expense, 'json',  ['groups' => ['expense']]));
    }


    #[Route('api/expenses', methods: ["DELETE"])]
    public function deleteExpense(Request $request)
    {
        $jsonData = json_decode($request->getContent(), true);
        $deleted = $this->expenseRepository->delete($jsonData);

        return new JsonResponse($this->serializer->serialize($deleted, 'json',  ['groups' => ['expense']]));
    }

    #[Route('api/expenses', methods: ["PUT"])]
    public function updateExpense(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        $expense = $this->expenseRepository->update($jsonData);

        return new JsonResponse($this->serializer->serialize($expense, 'json',  ['groups' => ['expense']]));
    }


    #[Route('api/expenses/categories', name: 'app_expense_categories', methods: ['GET'])]
    public function categories(): JsonResponse
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()->getUser();

        $expenseCategories = $user->getExpenseCategories();

        return $this->json($this->serializer->serialize($expenseCategories, 'json',  ['groups' => ['expenseCategories']]));
    }

    #[Route('api/expenses/categories',  methods: ['POST'])]
    public function categoryCreate(Request $request): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        $expenseCategory = $this->expenseRepository->createCategory($jsonData);

        return new JsonResponse($this->serializer->serialize($expenseCategory, 'json',  ['groups' => ['expenseCategories']]));
    }
}
