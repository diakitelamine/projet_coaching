<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use App\Entity\Ingredient;
use App\Entity\Recette;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void 
    { 
        $faker = Factory::create('fr_FR');
        $users = [];
        for ($u=0; $u<50; $u++){

              $user = new User();
              $user->setFirstname($faker->firstName());
              $user->setLastname($faker->lastName());
              $user->setEmail($faker->email());
              $user->setPassword($faker->password());
              $manager->persist($user);
              $users[] = $user;
        }

            $categories =[];

            for ($i = 0; $i < 50; $i++) {
            
                $categorie= new Categorie();
                $categorie->setName($faker->text(49));
                $categorie->setDescription($faker->text(200));
                $categorie->setImageUrl($faker->imageUrl());
                $categorie->setCreatedAt(new DateTime());
                $manager->persist($categorie);
                $categories[] = $categorie;
            }

             $ingredients = [];

            for ($i = 0; $i < 50; $i++) {
            
                $ingredient= new Ingredient();
                $ingredient->setName($faker->text(49));
                $manager->persist($ingredient);
                $ingredients[] = $ingredient;
            }

            for ($i = 0; $i < 50; $i++) {
            
                $recette= new  Recette();
                $recette->setName($faker->text(49));
                $recette->setDescription($faker->text(49));
                $recette->setImageUrl($faker->imageUrl());
                $recette->setDureeMoyen(rand(0, 100));
                $recette->setCreatedAt(new \DateTime());
                $recette->addCategory($categories[$faker->numberBetween(0,14)]);
                $recette->addIngredient($ingredients[$faker->numberBetween(0,14)]);
                $recette->setAuthor($users[$faker->numberBetween(0,49)]);
                $manager->persist($recette);
            }
        $manager->flush();
    }
}