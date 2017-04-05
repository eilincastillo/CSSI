<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 21/2/2017
 * Time: 9:25 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Patient;
use AppBundle\Entity\Place;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends FOSRestController
{

    /**
     * Get all patient
     *
     * @return mixed
     *
     * @Get("/")
     */

    public function getAllAction()
    {
        $em = $this->getDoctrine()->getManager();
        $patient = $em->getRepository('AppBundle:Patient')->findAll();
        return $patient;
    }


    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/patient/
     * @apiName createAction
     * @apiGroup Patient
     * @apiDescription Create a patient.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "name": "Alejandra",
    "lastname": "Vaamonde",
    "historyNumber": "1234567890",
    "registrationDate": "MM/DD/YYYY",
    "accompanied": "Si",
    "document": "14111222",
    "gender": "M",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "homeVisit": "No",
    "job": "false",
    "job_detail": "",
    "idPlace": 2
    }
     *
     */

    /**
     * Create a patient
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
                    $place = $em->getRepository('AppBundle:Place')->find($json['idPlace']);
                    $patient = new Patient();

                    if ($place !== null)
                    {
                        $patient->setName($json["name"]);
                        $patient->setLastname($json["lastname"]);
                        $patient->setHistoryNumber($json["historyNumber"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["registrationDate"])));
                        $patient->setRegistrationDate($fixDate);
                        $patient->setAccompanied($json["accompanied"]);
                        $patient->setDocument($json["document"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json['birthdate'])));
                        $patient->setBirthdate($fixDate);
                        $patient->setFamilyDynamics($json["familyDynamics"]);
                        $patient->setHomeVisit($json["homeVisit"]);
                        $patient->setGender($json["gender"]);
                        $patient->setJob($json["job"]);
                        $patient->setJobDetail($json["job_detail"]);
                        $patient->setPlace($place);

                        $em->persist($patient);
                        $em->flush();
                    }
                    else
                        return new Response('Error, the place don\'t exists',Response::HTTP_CONFLICT);

                    return new Response('The patient was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the patient was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the patient was not inserted',Response::HTTP_CONFLICT);
    }

    /**
     * ApiDoc
     * @api {put} cssi/web/app_dev.php/api/patient/{idPatient}
     * @apiName createAction
     * @apiGroup Patient
     * @apiDescription Create a patient.
     *
     * @apiParamExample {json} Request-Example:
    {
    "name": "Alejandra",
    "lastname": "Vaamonde",
    "historyNumber": "1234567890",
    "registrationDate": "MM/DD/YYYY",
    "accompanied": "Si",
    "gender": "M",
    "document": "14111222",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "homeVisit": "No",
    "job": "true",
    "job_detail": "Plomero",
    "idPlace": 2
    }
     *
     */

    /**
     * Create a patient
     * @var Request $request,  $idPatient
     * @return mixed
     *
     * @Put("/{idPatient}")
     */
    public function updateAction(Request $request, $idPatient)
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
                    $patient = $em->getRepository('AppBundle:Patient')->find($idPatient);
                    $place = $em->getRepository('AppBundle:Place')->find($json['idPlace']);

                    if ($place !== null && $patient !== null)
                    {
                        $patient->setName($json["name"]);
                        $patient->setLastname($json["lastname"]);
                        $patient->setHistoryNumber($json["historyNumber"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["registrationDate"])));
                        $patient->setRegistrationDate($fixDate);
                        $patient->setAccompanied($json["accompanied"]);
                        $patient->setDocument($json["document"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json['birthdate'])));
                        $patient->setBirthdate($fixDate);
                        $patient->setFamilyDynamics($json["familyDynamics"]);
                        $patient->setHomeVisit($json["homeVisit"]);
                        $patient->setGender($json["gender"]);
                        $patient->setJob($json["job"]);
                        $patient->setJobDetail($json["job_detail"]);
                        $patient->setPlace($place);

                        $em->persist($patient);
                        $em->flush();
                    }
                    else
                        return new Response('Error, the place or patient don\'t exists',Response::HTTP_CONFLICT);

                    return new Response('The patient was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the patient was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the patient was not inserted',Response::HTTP_CONFLICT);
    }
}