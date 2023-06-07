<?php

namespace App\Controller;

use App\Repository\IngredientRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class IngredientController extends AbstractController
{
    #[Route('api/ingredients', name: 'app_ingredients')]
    public function ingredients(IngredientRepository $ingredientRepository, SerializerInterface $serializer): JsonResponse
    {
        $ingredients = $ingredientRepository->findBy(['deleted_at' => NULL]);
        $response = $serializer->serialize(
            $ingredients, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }
}
