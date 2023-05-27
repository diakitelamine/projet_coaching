<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{
    static function importImageBase64($base64, $path){
        //Recupere l'etension de l'image
        $extension = explode('/', mime_content_type($base64))[1];
        if(!in_array($extension, ['png', 'gif', 'jpeg', 'jpg'])){
            return ['code'=> 400, 'message'=> 'Merci d\'importer des images au format png, jpeg ou gif'];
        }
        //Creer l'image dans le bon dossier
        $nameFile = md5(uniqid()).'.'.$extension;
        $outputFile = $path.$nameFile;
        $file = fopen($outputFile, "wb");
        $data = explode(',', $base64);
        fwrite($file, base64_decode($data[1]));
        fclose($file);
        return ['code' => 200 , 'file'=> $nameFile];
    }
}
