<?php

namespace App\Controller;

use App\Repository\ExpenseRepository;
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


    public function __construct(TokenStorageInterface $tokenStorage, SerializerInterface $serializer, ExpenseRepository $expenseRepository)
    {
        $this->tokenStorage = $tokenStorage;
        $this->serializer = $serializer;
        $this->expenseRepository = $expenseRepository;
    }

    #[Route('api/expenses', name: 'app_expense')]
    public function index(): JsonResponse
    {
        $token = $this->tokenStorage->getToken();

        $user = $token->getUser();

        return $this->json($this->serializer->serialize($user, 'json',  ['groups' => ['expense']]));
    }

    #[Route('api/expenses/categories', name: 'app_expense_categories')]
    public function categories(): JsonResponse
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()->getUser();

        $expenseCategories = $user->getExpenseCategories();

        return $this->json($this->serializer->serialize($expenseCategories, 'json',  ['groups' => ['expenseCategories']]));
    }

    #[Route('api/expenses/create', name: 'app_expense_create')]
    public function createExpense(Request $request): JsonResponse
    {
        if ($request->getMethod() === 'POST') {
            $jsonData = json_decode($request->getContent(), true);

            $expense = $this->expenseRepository->create($jsonData);



            return new JsonResponse(json_encode($expense));
        }

        return new JsonResponse('test');
    }
}
