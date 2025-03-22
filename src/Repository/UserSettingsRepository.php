<?php

namespace App\Repository;

use App\Entity\User;
use App\Entity\UserSettings;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Psr\Log\LoggerInterface;

/**
 * @extends ServiceEntityRepository<UserSettings>
 */
class UserSettingsRepository extends ServiceEntityRepository
{
    private LoggerInterface $logger;
    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, UserSettings::class);

        $this->logger =  $logger;
    }

    public function create(array $data, User $user)
    {
        if (is_null($user->getUserSettings())) {
            $settings = new UserSettings();
            $settings->setUser($user);

            $this->setSettings($data, $settings);
            $this->getEntityManager()->persist($settings);
        } else {
            $settings = $this->findByUserId($user->getId());
            $this->setSettings($data, $settings);
        }


        $this->getEntityManager()->flush();

        return $settings;
    }

    private function findByUserId($id): UserSettings
    {
        return $this->createQueryBuilder('s')
            ->where('s.user = :id')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();
    }

    private function setSettings(array $data, UserSettings $entity)
    {
        $entity->setLanguage($data['language']);
        $entity->setCurrency($data['currency']);
    }

    //    /**
    //     * @return UserSettings[] Returns an array of UserSettings objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?UserSettings
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
