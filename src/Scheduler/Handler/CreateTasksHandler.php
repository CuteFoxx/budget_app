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
        $tasks = $this->scheduledTask->findAll();

        foreach ($tasks as $task) {
            /**
             * @var \App\Entity\User
             */
            $user = $task?->getUser();


            $userTimeZone = $user->getUserSettings()->getTimezone() ?? 'UTC';
            $timezone = new \DateTimeZone($userTimeZone);
            $date = new \DateTime('now', $timezone);
            $dayName = $date->format('l');

            $this->logger->info('DAYNAME EXEC ->' . $task->getExecutedAt()->format('l'));
            $this->logger->info('DAYNAME  ->' . $dayName);
            $this->logger->info(json_encode($task->getExecutedAt()->format('l') == $dayName));

            if (in_array($dayName, $task->getRepeatDays()) && !($task?->getExecutedAt()->format('l') == $dayName)) {

                $data = [...$task->getPayload(), 'date' => $date];

                $task?->getType() ?? '' === 'expense' ?
                    $this->expenseRepository->create([...$data, 'category' => $data['expenseCategory']['name']], $user) :
                    $this->incomeRepository->create([...$data, 'category' => $data['incomeCategory']['name']], $user);

                $task->setExecutedAt($date);
            }

            if (is_null($task->getExecutedAt())) {
                $task->setExecutedAt($date);
            }
            $this->taskRepository->getEntityManager()->flush();
        }
        // ... do some work to send the report to the customers
    }
}
