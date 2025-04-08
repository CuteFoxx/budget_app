<?php

namespace App\Scheduler\Handler;

use App\Repository\ExpenseRepository;
use App\Repository\IncomeRepository;
use App\Repository\ScheduledTaskRepository;
use App\Repository\UserRepository;
use App\Scheduler\Message\CreateTasks;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class CreateTasksHandler
{
    private LoggerInterface $logger;

    private  ScheduledTaskRepository $scheduledTask;

    private ExpenseRepository $expenseRepository;

    private IncomeRepository $incomeRepository;

    private ScheduledTaskRepository $taskRepository;

    public function __construct(LoggerInterface $logger, ScheduledTaskRepository $scheduledTask, ExpenseRepository $expenseRepository, IncomeRepository $incomeRepository, ScheduledTaskRepository $taskRepository)
    {
        $this->logger = $logger;
        $this->scheduledTask = $scheduledTask;
        $this->expenseRepository = $expenseRepository;
        $this->incomeRepository = $incomeRepository;
        $this->taskRepository = $taskRepository;
    }

    public function __invoke(CreateTasks $message)
    {
        $tasks = $message->getTasksForExecution($this->scheduledTask, $this->logger);

        if (empty($tasks)) {
            return;
        }

        foreach ($tasks as $task) {
            /**
             * @var \App\Entity\User
             */
            $user = $task?->getUser();


            $userTimeZone = $user->getUserSettings()->getTimezone() ?? 'UTC';
            $timezone = new \DateTimeZone($userTimeZone);
            $date = new \DateTime('now', $timezone);


            $data = [...$task->getPayload(), 'date' => $date];

            switch ($task->getType()) {
                case "expense":
                    $this->expenseRepository->create([...$data, 'category' => $data['expenseCategory']['name']], $user);
                    break;
                case "income":
                    $this->incomeRepository->create([...$data, 'category' => $data['incomeCategory']['name']], $user);
                    break;
            }

            $task->setExecutedAt($date);

            $this->taskRepository->getEntityManager()->flush();
        }
    }
}
