<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Constraints\Json;

class UserController extends AbstractController
{
    #[Route('api/coachs', name: 'app_coachs')]
    public function coachs(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        //On récupere tout les users avec un role coach
        $userCoachs = $userRepository->getUserByRole('ROLE_COACH');
       // dd($userCoachs);
        $coachs = $serializer->serialize(
            $userCoachs, 'json'
        );
        return new JsonResponse($coachs, 200, [], true);
    }
}
