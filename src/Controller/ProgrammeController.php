<?php

namespace App\Controller;

use App\Repository\ImageRepository;
use App\Repository\ProgrammeRepository;
use App\Repository\RecetteRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProgrammeController extends AbstractController
{
    #[Route('api/programmes/user/{idUser}', name: 'app_programmes_user')]
    public function programmesUser($idUser, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        //Cherche l'utilisateur liés a cette id
        $user = $userRepository->find($idUser);
        //Récupere les programmes de cette utiklisateur
        $programmes = $user->getProgrammes();
        $response = $serializer->serialize(
            $programmes, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }

    #[Route('api/programmes/recette/{idRecette}', name: 'app_programmes_recette')]
    public function programmeRecette($idRecette, ProgrammeRepository $programmeRepository, SerializerInterface $serializer): JsonResponse
    {
        $programmes = $programmeRepository->findProgrammesByRecette($idRecette);
        $response = $serializer->serialize(
            $programmes, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }

    #[Route('api/programmes/user/{idUser}', name: 'app_all_programmes_coach', methods:'GET')]
    public function ProgrammesCoach($idUser, ProgrammeRepository $programmesRepository, SerializerInterface $serializer): JsonResponse
    {
        $programmes = $programmesRepository->findBy(['deleted_at' => NULL, 'user' => $idUser]);
        $response = $serializer->serialize(
            $programmes, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }
}
