<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }
    #[Route('api/coachs', name: 'app_coach',  methods: ['GET'])]
    public function coachs(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        //On récupere tout les users avec un role coach
        $userCoachs = $userRepository->getUserByRole('ROLE_COACH');
        $coachs = $serializer->serialize(
            $userCoachs,
            'json',
            [
                'groups' => ['listeCoachSimple']
            ]
        );
        return new JsonResponse($coachs, 200, [], true);
    }
}
