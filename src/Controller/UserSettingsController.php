<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserSettingsRepository;
use Psr\Log\LoggerInterface;

final class UserSettingsController extends AbstractController
{

    private TokenStorageInterface $tokenStorage;

    private  SerializerInterface $serializer;
    public function __construct(TokenStorageInterface $tokenStorage, SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
        $this->tokenStorage = $tokenStorage;
    }


    #[Route('/api/user/settings', name: 'api_user_settings', methods: ['POST'])]
    public function get(): JsonResponse
    {
        $token = $this->tokenStorage->getToken();

        /**
         * @var User
         */
        $user = $token->getUser();

        $settings = $user->getUserSettings();

        return $this->json($this->serializer->serialize($settings, 'json',  ['groups' => ['settings']]));
    }


    #[Route('/api/user/set/settings', name: 'api_user_set_settings')]
    public function setSettings(Request $request, UserSettingsRepository $userSettingsRepository): JsonResponse
    {
        $jsonData = json_decode($request->getContent(), true);
        $token = $this->tokenStorage->getToken();

        /**
         * @var User
         */
        $user = $token->getUser();
        $settings = $userSettingsRepository->create($jsonData, $user);



        return $this->json($this->serializer->serialize($settings, 'json',  ['groups' => ['settings']]));
    }
}
