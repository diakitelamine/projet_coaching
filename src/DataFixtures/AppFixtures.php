<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    { 

        $faker = Factory::create();

        for($u=0; $u<10; $u++){
              $user = new User();
              $user->setFirstname($faker->firstName());
              $user->setLastname($faker->lastName());
              $user->setEmail($faker->email());
              $user->setPassword($faker->password());
              $manager->persist($user);
        }
        

        $manager->flush();
    }
}
