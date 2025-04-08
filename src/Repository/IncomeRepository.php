<?php

namespace App\Repository;

use App\Entity\Income;
use App\Entity\IncomeCategory;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use DateTime;
use Symfony\Component\Clock\ClockAwareTrait;

/**
 * @extends ServiceEntityRepository<Income>
 */
class IncomeRepository extends ServiceEntityRepository
{
    use ClockAwareTrait;

    private TokenStorageInterface $tokenStorage;

    private IncomeCategoryRepository $incomeCategoryRepository;

    public function __construct(ManagerRegistry $registry, TokenStorageInterface $tokenStorage, IncomeCategoryRepository $incomeCategoryRepository)
    {
        parent::__construct($registry, Income::class);

        $this->tokenStorage = $tokenStorage;
        $this->incomeCategoryRepository =  $incomeCategoryRepository;
    }

    public function create($data, ?User $User = null)
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()?->getUser() ?? $User;
        $timezone = $user->getUserSettings()->getTimezone();
        $income = new Income();
        $incomeCategory = $this->incomeCategoryRepository->findOneByName($data['category'] ?? '');
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

        $income->setUser($user);
        $income->setAmount($data['amount'] ?? 0);
        $income->setName($data['name'] ?? '');
        $income->setDate($date);
        $income->setIncomeCategory($incomeCategory);

        $this->getEntityManager()->persist($income);
        $this->getEntityManager()->flush();

        return $income;
    }

    public function update($data)
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->tokenStorage->getToken()->getUser();
        $incomeCategory = $this->incomeCategoryRepository->findOneByName($data['category'] ?? '');
        $timestamp = intval($data['date']) / 1000.0;
        $timezone = $user->getUserSettings()->getTimezone();
        $date = new \DateTime("@$timestamp");
        if (!is_null($timezone) && !empty($timezone)) {
            $date->setTimezone(new \DateTimeZone($timezone));
        }

        $income = $this->findOneById($data['id'] ?? -1);
        $income?->setAmount($data['amount']);
        $income?->setName($data['name']);
        $income?->setDate($date);
        $income?->setUser($user);
        $income?->setIncomeCategory($incomeCategory);
        $income?->setCreated($this->now());

        $this?->getEntityManager()->flush();

        return $income;
    }

    public function delete($data)
    {
        $ids = $data['id'];

        $deleted = $this->createQueryBuilder('i')
            ->delete('App\Entity\Income', 'i')
            ->where('i.id IN (:ids)')
            ->setParameter('ids', $ids)
            ->getQuery()
            ->execute();

        return $deleted;
    }


    public function createCategory($data)
    {
        $user = $this->tokenStorage->getToken()->getUser();

        $incomeCategory = new IncomeCategory();
        $incomeCategory->setName($data['name']);
        $incomeCategory->setUser($user);

        $this->getEntityManager()->persist($incomeCategory);
        $this->getEntityManager()->flush();

        return $incomeCategory;
    }

    public function getNewest($user)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.user = :val')
            ->setParameter('val', $user->getId())
            ->orderBy('i.date', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }

    //    /**
    //     * @return Income[] Returns an array of Income objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('i')
    //            ->andWhere('i.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('i.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Income
    //    {
    //        return $this->createQueryBuilder('i')
    //            ->andWhere('i.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
