<?php

namespace App\Scheduler;

use App\Repository\ScheduledTaskRepository;
use App\Scheduler\Message\CreateTasks;
use Symfony\Component\Scheduler\Attribute\AsSchedule;
use Symfony\Component\Scheduler\RecurringMessage;
use Symfony\Component\Scheduler\Schedule;
use Symfony\Component\Scheduler\ScheduleProviderInterface;
use Symfony\Contracts\Cache\CacheInterface;

#[AsSchedule('tasks')]
final class TasksSchedule implements ScheduleProviderInterface
{


    public function __construct(
        private CacheInterface $cache,

    ) {}

    public function getSchedule(): Schedule
    {

        return (new Schedule())
            ->add(
                RecurringMessage::cron('*/1 * * * *', new CreateTasks(1))
                // @TODO - Create a Message to schedule
                // RecurringMessage::every('1 hour', new App\Message\Message()),
            )
            ->stateful($this->cache)
        ;
    }
}
