<?php

namespace App\Scheduler\Handler;

use App\Scheduler\Message\CreateTasks;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class CreateTasksHandler
{
    private LoggerInterface $logger;
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function __invoke(CreateTasks $message)
    {
        $this->logger->info('MESSAGE ID ->' . $message->getId());
        // ... do some work to send the report to the customers
    }
}
