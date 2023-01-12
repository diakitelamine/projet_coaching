<?php

namespace App\DataFixtures;

use App\Entity\Ingredient;
use App\Entity\Recette;
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
              $users = new User();
              $users->setFirstname($faker->firstName());
              $users->setLastname($faker->lastName());
              $users->setEmail($faker->email());
              $users->setPassword($faker->password());
              $manager->persist($users);


        }
        

        $manager->flush();
    }
}
