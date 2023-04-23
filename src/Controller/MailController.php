<?php

namespace App\Controller;
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
            ->text($message)
            ->html(strip_tags($message));
        //Envoie le mail
        $mailer->send($email);
        try {
            return True;
        }
        catch (\Exception $e){
            return False;
        }
    }
}