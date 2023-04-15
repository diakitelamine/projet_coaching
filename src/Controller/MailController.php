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
    static function sendEmailRegister(MailerInterface $mailer, $to): Bool
    {
        $email = (new Email())
            ->from(new Address('support@moc.fr'))
            ->to(new Address($to))
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');
            
        $mailer->send($email);
        try {
            return True;
        }
        catch (\Exception $e){
            return False;
        }
    }
}