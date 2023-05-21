<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ImageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Mime\Address;

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

    #[Route('api/image/profil/user/{userId}', name: 'api_image_profil_user')]
    public function profilImage($userId, UserRepository $userRepository, ImageRepository $imageRepository, SerializerInterface $serializer):JsonResponse
    {
        //On récupere l'image de profil de l'utilisateur
       // $user = $userRepository->find($userId);
        $image = $imageRepository->findOneBy(['user' => $userId, 'detail' => 'profil', 'deleted_at' => NULL]);
        $response = $serializer->serialize(
            $image, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }

    #[Route('api/image/cover/user/{userId}', name: 'api_image_cover_user')]
    public function coverImage($userId, UserRepository $userRepository, ImageRepository $imageRepository, SerializerInterface $serializer):JsonResponse
    {
        //On récupere l'image de couverture de l'utilisateur
        //$user = $userRepository->find($userId);
        $image = $imageRepository->findOneBy(['user' => $userId, 'detail' => 'cover', 'deleted_at' => NULL]);
        $response = $serializer->serialize(
            $image, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }

    #[Route('api/edit/user', name: 'api_edit_user', methods:'POST')]
    public function edit(Request $request, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        //Récupere les données dans un tableau
        $data = json_decode($request->getContent(), true);
        dd($data);
        //https://127.0.0.1:8000/api/edit/user/
        //https://127.0.0.1:8000/api/edit/user
        /*$response = $serializer->serialize(
            $image, 'json'
        );
        return new JsonResponse($response, 200, [], true);*/
    }

    #[Route('api/user/{userId}', name: 'api_user')]
    public function user($userId, UserRepository $userRepository, SerializerInterface $serializer):JsonResponse
    {
        //On récupere l'utilisateur pas supprimer
        $user = $userRepository->findOneBy(['id' => $userId, 'deleted_at' => NULL]);
        $response = $serializer->serialize($user, 'json');
        return new JsonResponse($response, 200, [], true);
    }

    #[Route('api/auth/user', name: 'api_auth_user', methods:'POST')]
    public function tryToLogin(Request $request, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        //Récupere les données dans un tableau
        $data = json_decode($request->getContent(), true);

        //Traitement data (eneleve les espaces et les balises)
        $data['email'] = strip_tags(trim($data['email']));
        $data['password'] = strip_tags(trim($data['password']));

        //Envoie du formulaire
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
            //Si le compte n'est pas activé
            if (!$user->isActive()) {
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Votre adresse e-mail n\'as pas été vérifié'
                    ], 'json'
                );
                return new JsonResponse($message, 404, [], true);
            }

            if ($user && $passwordHasher->isPasswordValid($user, $data['password'])) {
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
    public function register(MailerInterface $mailer, Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {

        //Récupere les données dans un tableau
        $data = json_decode($request->getContent(), true);

        //Traitement data (eneleve les espaces et les balises)
        $data['email'] = strip_tags(trim($data['email']));
        $data['password'] = strip_tags(trim($data['password']));
        $data['firstName'] = strip_tags(trim($data['firstName']));
        $data['lastName'] = strip_tags(trim($data['lastName']));

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
            //Génere une clé
            $key = md5(uniqid(rand(), true));
            //Envoie d'un mail 
            if (!MailController::sendEmailRegister($mailer, $data['email'], $key)) {
                $message = $serializer->serialize(
                    [
                        'code' => 404,
                        'message' => 'Une erreur est survenue veuilliez réessayer ultérieurement.'
                    ], 'json'
                );
                return new JsonResponse($message, 404, [], true);
            }
            //On enregistre un nouvelle utilisateur
            $user = new User();
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $data['password']
            );
            $user->setKeyRegister($key);
            $user->setEmail(strtolower($data['email']));
            $user->setRoles($data['roles']);
            $user->setPassword($hashedPassword);
            $user->setFirstName(ucfirst(strtolower($data['firstName'])));
            $user->setLastName(ucfirst(strtolower($data['lastName'])));
            $user->setCreatedAt(new \DateTime($data['createdAt']));
            $user->setActive(0);
            $entityManager->persist($user);
            $entityManager->flush();
            $message = $serializer->serialize(
                [
                    'code' => 200,
                    'user' => $user, 
                    'message'=> 'Inscription réussie. Veuilliez confirmer votre adresse e-mail.'
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

    #[Route('/register/confirm/{key}', name: 'confirm_account_user', methods:'GET')]
    public function confirmAccount($key, UserRepository $userRepository, EntityManagerInterface $entityManager, MailerInterface $mailer,): Response
    {
        //On récupere l'utilisateur liés à la clé 
        $user = $userRepository->findOneBy(['key_register' => $key]);
        if ($user) {
            $user->setKeyRegister(NULL);
            $user->setActive(1);
            $entityManager->persist($user);
            $entityManager->flush();
            MailController::sendEmailAccountActive($mailer, $user);
        }
        return $this->renderForm('user/register/confirm.html.twig', ['user' => $user, 'link' => $_ENV['APP_LOCAL'].'#/auth']);
    }
}
