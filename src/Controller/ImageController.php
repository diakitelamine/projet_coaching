<?php

namespace App\Controller;

use App\Repository\ImageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ImageController extends AbstractController
{
    #[Route('api/image/info', name: 'api_image_info', methods:'POST')]
    public function info(Request $request, ImageRepository $imageRepository, SerializerInterface $serializer): JsonResponse
    {
        //Récupere les données dans un tableau
        $data = json_decode($request->getContent(), true);
        dd($request->getContent(),$data,  $request);
        //https://127.0.0.1:8000/api/edit/user/
        //https://127.0.0.1:8000/api/edit/user
        /*$response = $serializer->serialize(
            $image, 'json'
        );
        return new JsonResponse($response, 200, [], true);*/
    }
}
