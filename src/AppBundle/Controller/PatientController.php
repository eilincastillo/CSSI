<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 21/2/2017
 * Time: 9:25 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Patient;
use AppBundle\Entity\Personal;
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
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/patient/
     * @apiName getAllAction
     * @apiGroup Patient
     * @apiDescription Get all patient.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * [
    {
    "id": 1,
    "name": "Active"
    },
    {
    "id": 2,
    "name": "Inactive"
    }
    ]
     */

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
    "secondName": "Alejandra",
    "lastname": "Vaamonde",
    "secondLastname": "Vaamonde",
    "historyNumber": "1234567890",
    "registrationDate": "MM/DD/YYYY",
    "nationality": "Si",
    "document": "14111222",
    "gender": "M",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "job": "false",
    "jobDetail": "",
    "idPlace": 2
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 14,
    "history_number": "1234567890",
    "registration_date": "1970-01-01T00:00:00+0100",
    "gender": "M",
    "birthdate": "1970-01-01T00:00:00+0100",
    "family_dynamics": "Familia nuclear",
    "job": "false",
    "job_detail": "",
    "place": {
    "id": 2,
    "name": "El Paraiso",
    "type": "Parroquia",
    "place": {
    "id": 1,
    "name": "Distrito Capital",
    "type": "Estado"
    }
    },
    "personal": {
    "id": 13,
    "document": "14111222",
    "name": "Alejandra",
    "second_lastname": "Vaamonde",
    "second_name": "Alejandra",
    "lastname": "Vaamonde",
    "nationality": "Si"
    }
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
                    $personal = new Personal();

                    if ($place !== null)
                    {
                        $personal->setName($json["name"]);
                        $personal->setLastname($json["lastname"]);
                        $personal->setSecondName($json["secondName"]);
                        $personal->setSecondLastname($json["secondLastname"]);
                        $patient->setHistoryNumber($json["historyNumber"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["registrationDate"])));
                        $patient->setRegistrationDate($fixDate);
                        $personal->setNationality($json["nationality"]);
                        $personal->setDocument($json["document"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json['birthdate'])));
                        $patient->setBirthdate($fixDate);
                        $patient->setFamilyDynamics($json["familyDynamics"]);
                        $patient->setGender($json["gender"]);
                        $patient->setJob($json["job"]);
                        $patient->setJobDetail($json["jobDetail"]);
                        $patient->setPlace($place);
                        $patient->setPersonal($personal);

                        $em->persist($patient);
                        $em->flush();

                        //$response = $em->getRepository('AppBundle:Patient')->findAPatients($personal->getId());
                    }
                    else
                        return new Response('Error, the place don\'t exists',Response::HTTP_CONFLICT);

                    $view = $this->view($patient, 202);
                    return $this->handleView($view);
                    //return new Response('The patient was successfully added', Response::HTTP_ACCEPTED);
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
    "secondName": "Alejandra",
    "lastname": "Vaamonde",
    "secondLastname": "Vaamonde",
    "historyNumber": "1234567890",
    "registrationDate": "MM/DD/YYYY",
    "nationality": "V",
    "gender": "M",
    "document": "14111222",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "job": "true",
    "job_detail": "Plomero",
    "idPlace": 2
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 14,
    "history_number": "1234567890",
    "registration_date": "1970-01-01T00:00:00+0100",
    "gender": "M",
    "birthdate": "1970-01-01T00:00:00+0100",
    "family_dynamics": "Familia nuclear",
    "job": "false",
    "job_detail": "",
    "place": {
    "id": 2,
    "name": "El Paraiso",
    "type": "Parroquia",
    "place": {
    "id": 1,
    "name": "Distrito Capital",
    "type": "Estado"
    }
    },
    "personal": {
    "id": 13,
    "document": "14111222",
    "name": "Alejandra",
    "second_lastname": "Vaamonde",
    "second_name": "Alejandra",
    "lastname": "Vaamonde",
    "nationality": "Si"
    }
    }
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
                    $personal = $em->getRepository('AppBundle:Personal')->findByPatient($idPatient);
                    $place = $em->getRepository('AppBundle:Place')->find($json['idPlace']);

                    if ($place !== null && $patient !== null)
                    {
                        $personal->setName($json["name"]);
                        $personal->setLastname($json["lastname"]);
                        $personal->setSecondName($json["secondName"]);
                        $personal->setSecondLastname($json["secondLastname"]);
                        $patient->setHistoryNumber($json["historyNumber"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["registrationDate"])));
                        $patient->setRegistrationDate($fixDate);
                        $personal->setNationality($json["nationality"]);
                        $personal->setDocument($json["document"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json['birthdate'])));
                        $patient->setBirthdate($fixDate);
                        $patient->setFamilyDynamics($json["familyDynamics"]);
                        $patient->setGender($json["gender"]);
                        $patient->setJob($json["job"]);
                        $patient->setJobDetail($json["jobDetail"]);
                        $patient->setPlace($place);
                        $patient->setPersonal($personal);

                        $em->persist($patient);
                        $em->flush();

                        //$response = $em->getRepository('AppBundle:Patient')->findAPatients($personal->getId());
                    }
                    else
                        return new Response('Error, the place or patient don\'t exists',Response::HTTP_CONFLICT);

                    $view = $this->view($patient, 202);
                    return $this->handleView($view);
                    //return new Response('The patient was successfully added', Response::HTTP_ACCEPTED);
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