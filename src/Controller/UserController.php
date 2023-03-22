<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    #[Route('api/coachs/', name: 'api_coachs')]
    public function coachs(UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {   
        //On récupere tout les users avec un role coach
        $userCoachs = $userRepository->getUserByRole('ROLE_COACH');

        $coachs = $serializer->serialize(
            $userCoachs, 'json'
        );
        return new JsonResponse($coachs, 200, [], true);
    }

    #[Route('api/coachs/{maxResult}', name: 'api_coachs_limited')]
    public function coachsLimited($maxResult, UserRepository $userRepository, SerializerInterface $serializer):JsonResponse
    {   
        //On récupere tout les users avec un role coach
        $userCoachs = $userRepository->getUserByRole('ROLE_COACH', $maxResult);
        
        $coachs = $serializer->serialize(
            $userCoachs, 'json'
        );
        return new JsonResponse($coachs, 200, [], true);
    }

    #[Route('api/image/user/{userId}', name: 'api_image_user')]
    public function image($userId, UserRepository $userRepository, SerializerInterface $serializer):JsonResponse
    {
        //On récupere l'image de l'utilisateur
        $user = $userRepository->find($userId);
        $image = $user->getImage(); 
        $response = $serializer->serialize(
            $image, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }
    #[Route('api/auth/user', name: 'api_auth_user', methods:'POST')]
    public function tryToLogin(Request $request, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        //Récupere les données dans un tableau
        $data = json_decode($request->getContent(), true);
        if ($data['auth']) {
            if (empty($data['email']) && empty($data['password'])) {
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Veuilliez remplir tout les champs'
                    ], 'json'
                );
                return new JsonResponse($message, 404, [], true);
            }
            $user = $userRepository->findOneBy(['email'=>$data['email']]);
            if ($passwordHasher->isPasswordValid($user, $data['password'])) {
                $message = $serializer->serialize(
                    [
                        'code' => 200,
                        'message' => 'Connexion réussie',
                        'user' => $user
                    ], 'json'
                );
                return new JsonResponse($message, 200, [], true);
            }
            else{
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Email ou mot de passe incorrect'
                    ], 'json'
                );
                return new JsonResponse($message, 404, [], true);
            }
        }
        $message = $serializer->serialize(
            [
                'code' => 404,
                'message'=> 'Une erreur est survenue veuillez réessayer'
            ], 'json'
        );
        return new JsonResponse($message, 404, [], true);
    }

    #[Route('api/register/user', name: 'api_register_user', methods:'POST')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {

        //Récupere les données dans un tableau
        $data = json_decode($request->getContent(), true);
        //dd($data['roles']);
        //Si la requêtes est faites pour créer un nouvelle user
        if ($data['newUser']) {
            if (empty($data['email']) || empty($data['password']) || empty($data['firstName']) || empty($data['lastName'])) {
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Veuilliez remplir tout les champs'
                    ], 'json'
                );
                return new JsonResponse($message, 404, [], true);
            }
            //Effectue une verifaction sur l'email
            $userExist = $userRepository->findOneBy(['email' => $data['email']]);
            if (!is_null($userExist)) {
                $message = $serializer->serialize(
                    [
                        'code' => 401,
                        'message' => 'Cette adresse email est déjà utilisé'
                    ], 'json'
                );
                return new JsonResponse($message, 401, [], true);
            }
            //Verification mot de passe
            if ($data['confirmPassword'] != $data['password']) {
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Les deux mot de passe ne correspondent pas'
                    ], 'json'
                );
                return new JsonResponse($message, 404, [], true);
            }
            //Verification du role
            if (empty($data['roles'][0])) {
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Veuillez préciser si vous êtes coach ou utilisateur'
                    ], 'json'
                );
                return new JsonResponse($message, 401, [], true);
            }
            //On enregistre un nouvelle utilisateur
            $user = new User();
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $data['password']
            );
            $user->setEmail($data['email']);
            $user->setRoles($data['roles']);
            $user->setPassword($hashedPassword);
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            $user->setCreatedAt(new \DateTime($data['createdAt']));
            $entityManager->persist($user);
            $entityManager->flush();
            $message = $serializer->serialize(
                [
                    'code' => 200,
                    'user' => $user, 
                    'message'=> 'Inscription réussie. Vous pouvez désormais vous connecter.'
                ], 'json'
            );
            return new JsonResponse($message, 200, [], true);
        }
        $message = $serializer->serialize(
            [
                'code' => 404,
                'message'=> 'Une erreur est survenue veuillez réessayer'
            ], 'json'
        );
        return new JsonResponse($message, 404, [], true);
    }
}
