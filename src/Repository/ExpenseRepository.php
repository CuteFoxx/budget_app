<?php

namespace App\Repository;

use App\Entity\Expense;
use App\Entity\ExpenseCategory;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use DateTime;

use function Symfony\Component\Clock\now;

/**
 * @extends ServiceEntityRepository<Expense>
 */
class ExpenseRepository extends ServiceEntityRepository
{
    private TokenStorageInterface $tokenStorage;

    private ExpenseCategoryRepository $expenseCategoryRepository;

    private LoggerInterface $logger;

    public function __construct(ManagerRegistry $registry, TokenStorageInterface $tokenStorage, ExpenseCategoryRepository $expenseCategoryRepository, LoggerInterface $logger)
    {
        parent::__construct($registry, Expense::class);

        $this->tokenStorage = $tokenStorage;
        $this->expenseCategoryRepository = $expenseCategoryRepository;
        $this->logger = $logger;
    }

    public function create($data, ?User $User = null)
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()?->getUser() ?? $User;
        $timezone = $user->getUserSettings()->getTimezone();
        $expenseCategory = $this->expenseCategoryRepository->findOneByName($data['category'] ?? '');
        $date = null;

        if (!$data['date'] instanceof DateTime) {
            $timestamp = intval($data['date']) / 1000.0;
            $date = new \DateTime("@$timestamp");
        } else {
            $date = new $data['date'];
        }


        if (!is_null($timezone) && !empty($timezone)) {
            $date->setTimezone(new \DateTimeZone($timezone));
        }

        $expense = new Expense();
        $expense->setAmount($data['amount']);
        $expense->setName($data['name']);
        $expense->setDate($date);
        $expense->setUser($user);
        $expense->setExpenseCategory($expenseCategory);
        $expense->setCreated(now());

        $this->getEntityManager()->persist($expense);
        $this->getEntityManager()->flush();

        return $expense;
    }

    public function delete($data)
    {
        $ids = $data['id'];

        $deleted = $this->createQueryBuilder('e')
            ->delete('App\Entity\Expense', 'e')
            ->where('e.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->execute();

        return $deleted;
    }

    public function update($data)
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()->getUser();
        $expenseCategory = $this->expenseCategoryRepository->findOneByName($data['category'] ?? '');
        $timestamp = intval($data['date']) / 1000.0;
        $timezone = $user->getUserSettings()->getTimezone();
        $date = new \DateTime("@$timestamp");
        if (!is_null($timezone) && !empty($timezone)) {
            $date->setTimezone(new \DateTimeZone($timezone));
        }

        $expense = $this->findOneById($data['id'] ?? -1);
        $expense?->setAmount($data['amount']);
        $expense?->setName($data['name']);
        $expense?->setDate($date);
        $expense?->setUser($user);
        $expense?->setExpenseCategory($expenseCategory);
        $expense?->setCreated(now());

        $this?->getEntityManager()->flush();

        return $expense;
    }

    public function createCategory($data)
    {
        $user = $this->tokenStorage->getToken()->getUser();

        $expenseCategory = new ExpenseCategory();
        $expenseCategory->setName($data['name']);
        $expenseCategory->setUser($user);

        $this->getEntityManager()->persist($expenseCategory);
        $this->getEntityManager()->flush();

        return $expenseCategory;
    }

    public function getNewest($user)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.user = :val')
            ->setParameter('val', $user->getId())
            ->orderBy('e.date', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }
    public function findOneById($id)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.id = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    //    /**
    //     * @return Expense[] Returns an array of Expense objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('e')
    //            ->andWhere('e.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('e.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Expense
    //    {
    //        return $this->createQueryBuilder('e')
    //            ->andWhere('e.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
