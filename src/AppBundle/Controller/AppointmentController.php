<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 21/2/2017
 * Time: 9:15 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Appointment;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Put;
use Symfony\Component\HttpFoundation\Response;

class AppointmentController extends FOSRestController
{
    /**
     * Get all appointment
     *
     * @return mixed
     *
     * @Get("/")
     */

    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $appointment = $em->getRepository('AppBundle:Appointment')->findAll();
        return $appointment;
    }

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/appointment/
     * @apiName createAction
     * @apiGroup Patient
     * @apiDescription Create a patient.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *date": "MM/DD/YYYY",
    "price": "100000",
    "percentageAid": "50",
    "observations": "Necesita ayuda",
    "reasonAppointment": "Necesita ayuda",
    "result": "Aprovado",
    ""caseRemitted": "No",
    "institutionName": "",
    "institutionType": "",
    "idPatient":1
     * }
     *
     */

    /**
     * Create a appointment
     * @var Request $request
     * @return mixed
     *
     * @Post("/")
     */

    public function createAction(Request $request)
    {
        $content = $request->getContent();

        if ($content != null)
        {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();
                    $patient = $em->getRepository('AppBundle:Patient')->find($json["idPatient"]);
                    $appointment = new Appointment();

                    if ($patient !== null)
                    {
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["date"])));
                        $appointment->setDate($fixDate);
                        $appointment->setPrice($json["price"]);
                        $appointment->setPercentageAid($json["percentageAid"]);
                        $appointment->setObservations($json["observations"]);
                        $appointment->setReasonAppointment($json["reasonAppointment"]);
                        $appointment->setResult($json["result"]);
//                        $appointment->set($json["caseRemitted"]);
//                        $appointment->setFamilyDynamics($json["institutionName"]);
//                        $appointment->setHomeVisit($json["institutionType"]);
                        $appointment->setPatient($patient);

                        $em->persist($appointment);
                        $em->flush();
                    }
                    else
                        return new Response('Error, the place or patient don\'t exists',Response::HTTP_CONFLICT);


                    return new Response('The appointment was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the appointment was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the appointment was not inserted',Response::HTTP_CONFLICT);
    }

    /**
     * ApiDoc
     * @api {put} cssi/web/app_dev.php/api/appointment/{idAppointment}
     * @apiName createAction
     * @apiGroup Appointment
     * @apiDescription Update a Appointment.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *date": "MM/DD/YYYY",
    "price": "100000",
    "percentageAid": "50",
    "observations": "Necesita ayuda",
    "reasonAppointment": "Necesita ayuda",
    "result": "Aprovado",
    ""caseRemitted": "No",
    "institutionName": "",
    "institutionType": "",
    "idPatient":1
     * }
     *
     */

    /**
     * Update a appointment
     * @var Request $request
     * @return mixed
     *
     * @Put("/{appointment}")
     */

    public function updateAction(Request $request, $appointment)
    {
        $content = $request->getContent();

        if ($content != null)
        {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();
                    $patient = $em->getRepository('AppBundle:Patient')->find($json["idPatient"]);
                    $appointment =  $em->getRepository('AppBundle:Appointment')->find($appointment);

                    if ($patient !== null && $appointment !== null)
                    {
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["date"])));
                        $appointment->setDate($fixDate);
                        $appointment->setPrice($json["price"]);
                        $appointment->setPercentageAid($json["percentageAid"]);
                        $appointment->setObservations($json["observations"]);
                        $appointment->setReasonAppointment($json["reasonAppointment"]);
                        $appointment->setResult($json["result"]);
//                        $appointment->set($json["caseRemitted"]);
//                        $appointment->setFamilyDynamics($json["institutionName"]);
//                        $appointment->setHomeVisit($json["institutionType"]);
                        $appointment->setPatient($patient);

                        $em->persist($appointment);
                        $em->flush();
                    }
                    else
                        return new Response('Error, the place or patient don\'t exists',Response::HTTP_CONFLICT);


                    return new Response('The appointment was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the appointment was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the appointment was not inserted',Response::HTTP_CONFLICT);
    }
}