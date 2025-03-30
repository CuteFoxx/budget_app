<?php

namespace App\Controller;

use App\Repository\ScheduledTaskRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class TaskController extends AbstractController
{
    private TokenStorageInterface $tokenStorage;

    private  SerializerInterface $serializer;

    private LoggerInterface $logger;

    private ScheduledTaskRepository $taskRepository;

    public function __construct(TokenStorageInterface $tokenStorage, SerializerInterface $serializer, LoggerInterface $logger, ScheduledTaskRepository $taskRepository)
    {
        $this->tokenStorage = $tokenStorage;
        $this->serializer = $serializer;
        $this->logger = $logger;
        $this->taskRepository = $taskRepository;
    }

    #[Route('api/task', name: 'api_task')]
    public function index(Request $request): JsonResponse
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()->getUser();
        $tasksLimit = $user->getMaxTasks();
        $scheduledTasksCount = $this->taskRepository->count(['user' => $user->getId()]);
        $data = json_decode($request->getContent(), true);

        if ($scheduledTasksCount >= $tasksLimit) {
            return $this->json(['limit exceeded, upgrade your plan to continue'])->setStatusCode(402);
        } else {
            $this->taskRepository->create($data);

            return $this->json(["Successfully added as a recurring task."])->setStatusCode(200);
        }
    }
}
