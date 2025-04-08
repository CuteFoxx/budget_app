<?php

namespace App\Scheduler\Message;

use App\Repository\ScheduledTaskRepository;
use Psr\Log\LoggerInterface;
use DateTime;
use DateTimeZone;

class CreateTasks
{
    public function __construct(private int $id) {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getTasksForExecution(ScheduledTaskRepository $scheduledTask, LoggerInterface $logger)
    {
        $tasksForExec = [];

        $tasks = $scheduledTask->findAll();

        foreach ($tasks as $task) {
            /**
             * @var \App\Entity\User
             */
            $user = $task?->getUser();


            $userTimeZone = $user->getUserSettings()->getTimezone() ?? 'UTC';
            $timezone = new DateTimeZone($userTimeZone);
            $date = new DateTime('now', $timezone);
            $dayName = $date->format('l');


            if (in_array($dayName, $task->getRepeatDays()) && !($task?->getExecutedAt()?->format('l') ?? '' == $dayName)) {
                $tasksForExec[] = $task;
            }
        }

        return $tasksForExec;
    }
}
