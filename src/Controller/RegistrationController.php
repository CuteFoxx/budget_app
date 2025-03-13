<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

final class RegistrationController extends AbstractController
{
    private UserRepository $userRepository;

    private JWTTokenManagerInterface $jwtManager;

    public function __construct(UserRepository $userRepository, JWTTokenManagerInterface $jWTManager)
    {
        $this->userRepository = $userRepository;
        $this->jwtManager = $jWTManager;
    }

    #[Route('api/register', name: 'app_registration')]
    public function index(Request $request): JsonResponse
    {
        if ($request->getMethod() === 'POST') {
            $jsonData = json_decode($request->getContent(), true);

            $user = $this->userRepository->create($jsonData);

            $token = $this->jwtManager->create($user);
            $data = ['token' => $token];


            return new JsonResponse($data);
        }


        return new JsonResponse('Unsupported method', 405);
    }
}
