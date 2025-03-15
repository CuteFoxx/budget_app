<?php

namespace App\Repository;

use App\Entity\Expense;
use App\Entity\ExpenseCategory;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @extends ServiceEntityRepository<Expense>
 */
class ExpenseRepository extends ServiceEntityRepository
{
    private TokenStorageInterface $tokenStorage;

    private ExpenseCategoryRepository $expenseCategoryRepository;

    public function __construct(ManagerRegistry $registry, TokenStorageInterface $tokenStorage, ExpenseCategoryRepository $expenseCategoryRepository)
    {
        parent::__construct($registry, Expense::class);

        $this->tokenStorage = $tokenStorage;
        $this->expenseCategoryRepository = $expenseCategoryRepository;
    }

    public function create($data)
    {
        $user = $this->tokenStorage->getToken()->getUser();
        $expenseCategory = $this->expenseCategoryRepository->findOneByName($data['category']);

        $expense = new Expense();
        $expense->setAmount($data['amount']);
        $expense->setName($data['name']);
        $expense->setUser($user);
        $expense->setExpenseCategory($expenseCategory);

        $this->getEntityManager()->persist($expense);
        $this->getEntityManager()->flush();

        return $expense;
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
