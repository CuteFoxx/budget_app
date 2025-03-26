<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;

final class RegistrationController extends AbstractController
{
    const TTL = 2592000; //1month
    private UserRepository $userRepository;

    private JWTTokenManagerInterface $jwtManager;

    private RefreshTokenGeneratorInterface $refreshTokenGenerator;
    private RefreshTokenManagerInterface $refreshTokenManager;
    public function __construct(UserRepository $userRepository, JWTTokenManagerInterface $jWTManager, RefreshTokenGeneratorInterface $refreshTokenGenerator, RefreshTokenManagerInterface $refreshTokenManager)
    {
        $this->userRepository = $userRepository;
        $this->jwtManager = $jWTManager;
        $this->refreshTokenGenerator  = $refreshTokenGenerator;
        $this->refreshTokenManager = $refreshTokenManager;
    }

    #[Route('api/register', name: 'app_registration', methods: ['POST'])]
    public function index(Request $request): JsonResponse
    {

        $jsonData = json_decode($request->getContent(), true);

        $user = $this->userRepository->create($jsonData);

        if (!is_string($user)) {
            return $this->userRepository->createCookies($user);
        } else {
            return new JsonResponse($user, 409);
        }
    }
}
