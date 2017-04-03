<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 2/4/2017
 * Time: 5:32 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Appointment;
use AppBundle\Entity\Patient;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use Symfony\Component\HttpFoundation\Response;

class ReportController extends FOSRestController
{

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/report/countPersonsAndHelp
     * @apiName getCountPersonsAndMoneyAction
     * @apiGroup Report
     * @apiDescription Get how persons and money have the system for range of date.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "type_filter": "year",
    "parameter":
    {
    "year": 2016
    }
    }
     * @apiParamExample {json} Request-Example:
     * {
    "type_filter": "range",
    "parameter":
    {
    "month_start": 1,
    "month_end": 2,
    "year": 2016
    }
    }
     */

    /**
     * Get how persons and money have the system for range of date
     *
     * @return mixed
     *
     * @Post("/countPersonsAndHelp")
     */

    public function getCountPersonsAndMoneyAction(Request $request)
    {
        $content = $request->getContent();

        if ($content != null) {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();
                    $appointments = $em->getRepository('AppBundle:Appointment')->getAppointmentsByPatientAndDate();
                    $monthStart=0;
                    $monthEnd=0;
                    $total=0;
                    $patientsInThisDate= array();
                    $yearRequest = $json["parameter"]["year"];

                        if ($json["type_filter"] == "range")
                        {
                            $monthStart = $json["parameter"]["month_start"];
                            $monthEnd = $json["parameter"]["month_end"];
                        }

                    foreach ($appointments as $appointment)
                    {
                        $registrationDate = $appointment["date"];
                        $registrationYear = date_format($registrationDate, 'Y');
                        $idPatient = ($appointment["idPatient"]);

                        if ($json["type_filter"] == "year")
                        {
                            if ($registrationYear == $yearRequest )
                            {
                                if (!in_array($idPatient, $patientsInThisDate))
                                    array_push($patientsInThisDate,( $idPatient) );

                                $total = $total + ($appointment["price"]*($appointment["percentageAid"]/100));
                            }

                        }
                        if ($json["type_filter"] == "range")
                        {
                            if ($registrationYear == $yearRequest )
                            {
                                $registrationMonth = date_format($registrationDate, 'n');

                                if ($registrationMonth>= $monthStart && $registrationMonth<=$monthEnd)
                                {
                                    if (!in_array($idPatient, $patientsInThisDate))
                                        array_push($patientsInThisDate,( $idPatient) );

                                    $total = $total + ($appointment["price"]*($appointment["percentageAid"]/100));
                                }
                            }
                        }
                    }
                    //return (($patientsInThisDate));
                    return array("totalPatient"=>count($patientsInThisDate) , "totalHelp"=>$total);

                }
                else
                    return new Response('Error',Response::HTTP_CONFLICT);
            } catch (Exception $ex)
            {
                return new Response('Error', Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the place don\'t exists',Response::HTTP_CONFLICT);
    }


}