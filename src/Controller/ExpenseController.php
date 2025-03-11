<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class ExpenseController extends AbstractController
{

    #[Route('api/expenses', name: 'app_expense')]
    public function index(TokenStorageInterface $tokenStorage, SerializerInterface $serializer): JsonResponse
    {
        $token = $tokenStorage->getToken();

        $user = $token->getUser();

        return $this->json($serializer->serialize($user, 'json',  ['groups' => ['expense']]));
    }
}
