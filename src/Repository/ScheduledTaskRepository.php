<?php

namespace App\Repository;

use App\Entity\ScheduledTask;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @extends ServiceEntityRepository<ScheduledTask>
 */
class ScheduledTaskRepository extends ServiceEntityRepository
{
    private TokenStorageInterface $tokenStorage;

    private LoggerInterface $logger;
    public function __construct(ManagerRegistry $registry, TokenStorageInterface $tokenStorage, LoggerInterface $logger)
    {
        parent::__construct($registry, ScheduledTask::class);
        $this->tokenStorage = $tokenStorage;
        $this->logger =  $logger;
    }

    public function create(array $data)
    {
        $user = $this->tokenStorage->getToken()->getUser();

        $scheduledTask = new ScheduledTask();

        $scheduledTask->setUser($user);
        $scheduledTask->setPayload(json_decode($data['payload'], true));
        $scheduledTask->setRepeatDays($data['days']);
        $scheduledTask->setType($data['type']);

        $this->getEntityManager()->persist($scheduledTask);
        $this->getEntityManager()->flush();

        return $scheduledTask;
    }

    //    /**
    //     * @return ScheduledTask[] Returns an array of ScheduledTask objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?ScheduledTask
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
