<?php
namespace App\Controller;
use App\Repository\ReservationRepository;
use DateTime;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ReservationController extends AbstractController
{
    #[Route('api/reservation/{idCoach}', name: 'app_reservation')]
    public function reservation($idCoach, ReservationRepository $reservationRepository, SerializerInterface $serializer): Response
    {
        $reservations = $reservationRepository->findBy(['coach' => $idCoach]);
        $response = $serializer->serialize(
            $reservations, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }

    #[Route('api/reservation/disponible/{idCoach}', name: 'app_reservation')]
    public function planningReservation($idCoach, ReservationRepository $reservationRepository, SerializerInterface $serializer, EntityManagerInterface $entityManager): Response
    {
        
        $reservations = $reservationRepository->findBy(['coach' => $idCoach]);
        $nonDiponible = [];
        foreach ($reservations as $key => $reservation) {
            $dateStart = $reservation->getCommence();
            $dateEnd= $reservation->getFini();
            $nonDiponible[$dateStart->format('Y-m-d')] = ['start' =>$dateStart->format('H:i'), 'end' => $dateEnd->format('H:i')];
        }
        $disponible = [];
        $date = new \DateTime();
        $hourMin = 9;
        $hourMax = 21;
        for ($j=1; $j <= 14; $j++) { 
            for ($h=$hourMin; $h <=$hourMax ; $h++) { 
                //Si l'horaire n'est pas diponible
                $hourStart = $h.':00';
                $hourEnd = ($h+1).':00';
                if(isset($nonDiponible[$date->format('Y-m-d')]) &&  $hourStart >= $nonDiponible[$date->format('Y-m-d')]['start'] && $hourStart <= $nonDiponible[$date->format('Y-m-d')]['end'] || $hourMin < $hourStart || $hourMax < $hourEnd){
                    //On fait rien
                }
                else{
                    //Si l'horraire est disponible
                    $disponible[$date->format('Y-m-d')][] =  $hourStart." - ".$hourEnd ;
                }
            }
           $date->modify("+1 day");
        }
        $response = $serializer->serialize(
            $disponible, 'json'
        );
        return new JsonResponse($response, 200, [], true);
    }
}
