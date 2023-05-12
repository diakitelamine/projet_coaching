<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mime\Address;

class MailController extends AbstractController
{
    #[Route('send/email/register', name: 'send_email')]
    static function sendEmailRegister(MailerInterface $mailer, $to, $key): Bool
    {
        
        //Message
        $message = "<p>Bonjour,</p>

        <p>Merci d’avoir rejoint MOC.</p>

        <p>Nous aimerions vous confirmer que votre compte a été créé avec succès. Pour accéder au MOC, cliquez sur le lien ci-dessous.</p>

        <p>".$_ENV['APP_LOCAL']."register/confirm/$key</p>

        <p>Si vous rencontrez des difficultés pour vous connecter à votre compte, contactez-nous à myonlinecoachcontact@gmail.com.</p>

        <p>Cordialement,</p>

        <p>L’équipe du MOC</p>";

        //Configure l'envoie du mail
        $email = (new Email())
            ->from(new Address('support@moc.fr'))
            ->to(new Address($to))
            ->subject('Confirmez votre inscription MOC')
            ->text(strip_tags($message))
            ->html($message);
        try {
             //Envoie le mail
            $mailer->send($email);
            return True;
        }
        catch (\Exception $e){
            return False;
        }
    }

    #[Route('send/email/account/active', name: 'send_email_account_active')]
    static function sendEmailAccountActive(MailerInterface $mailer, User $user): Bool
    {
        
        //Message
        $message = "<p>Bonjour, ".$user->getFirstName()." ".$user->getLastName()." </p>

        <p>Nous vous remercions d’avoir complété votre inscription auprès de MOC.</p>

        <p>Cet e-mail confirme que votre compte est activé et que vous faites officiellement partie de la famille de MOC.</p>
       
        <p>Bon sport !</p>

        <p>Cordialement,</p>

        <p> L’équipe de MOC </p>";

        //Configure l'envoie du mail
        $email = (new Email())
            ->from(new Address('support@moc.fr'))
            ->to(new Address($user->getEmail()))
            ->subject('Merci d’avoir validé votre inscription')
            ->text(strip_tags($message))
            ->html($message);
        try {
             //Envoie le mail
            $mailer->send($email);
            return True;
        }
        catch (\Exception $e){
            return False;
        }
    }
}