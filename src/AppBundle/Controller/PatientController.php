<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 21/2/2017
 * Time: 9:25 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Patient;
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
     * Get all patient
     *
     * @return mixed
     *
     * @Get("/report/howMany/{idPatient}")
     */

    public function howManyPatientSolicitedHelpAction($idPatient)
    {
        $em = $this->getDoctrine()->getManager();

        $patient = $em->getRepository('AppBundle:Patient')->find($idPatient);
        $appointment = $em->getRepository('AppBundle:Appointment')->getAppointmentsByPatient($patient);
        return array('appointment' => $appointment, 'patient' => $patient);
    }

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/patient/report/patientParishes
     * @apiName getPatientByParishesAction
     * @apiGroup Report
     * @apiDescription Get all patient by Parishes.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "nameParishes": "La Vega"
    }
     */

    /**
     * Get all patient by Parishes
     *
     * @return mixed
     *
     * @Post("/report/patientParishes")
     */

    public function getPatientByParishesAction(Request $request)
    {
        $content = $request->getContent();

        if ($content != null) {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();
                    $parishes = $em->getRepository('AppBundle:Place')->findByName($json['nameParishes']);

                    if ($parishes !=null)
                    {
                        $patients = $em->getRepository('AppBundle:Patient')->getPatientByParishes($json['nameParishes']);
                        return array("totalPatient"=>count($patients) , "patients"=>$patients);
                    }
                    else
                        return new Response('Error',Response::HTTP_CONFLICT);

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

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/patient/report/patientByDocument
     * @apiName findPatientByDocumentOrHistoryNumberAction
     * @apiGroup Report
     * @apiDescription find Patient by Document or HistoryNumber.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "document": "",
    "historyNumber": "11111"
    }
     */

    /**
     * find Patient by Document or HistoryNumber
     *
     * @return mixed
     *
     * @Post("/report/patientByDocument")
     */

    public function findPatientByDocumentOrHistoryNumberAction(Request $request)
    {
        $content = $request->getContent();

        if ($content != null) {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();

                    if ($json['document'] !="")
                    {
                        $patients = $em->getRepository('AppBundle:Patient')->findPatientByDocument($json['document']);

                        if ($patients != null)
                            return ($patients);
                        else
                            return new Response('Error patient don\'t exist',Response::HTTP_NO_CONTENT);
                    }
                    else
                        if ($json['historyNumber'] !="")
                        {
                            $patients = $em->getRepository('AppBundle:Patient')->findPatientByHistoryNumber($json['historyNumber']);

                            if ($patients != null)
                                return ($patients);
                            else
                                return new Response('Error',Response::HTTP_NO_CONTENT);
                        }
                        else
                            return new Response('Error',Response::HTTP_CONFLICT);

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

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/patient/report/rangeAge
     * @apiName getAppointmentsByPatientAction
     * @apiGroup Report
     * @apiDescription Get female patient between a range of age.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "min": 12,
    "max": 25
    }
     *
     */

    /**
     * Get female patient between a range of age
     *
     * @return mixed
     *
     * @Post("/report/rangeAge")
     */

    public function getAppointmentsByPatientAction(Request $request)
    {
        $content = $request->getContent();

        if ($content != null) {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();
                    $min = $json['min'];
                    $max = $json['max'];
                    $patients = $em->getRepository('AppBundle:Patient')->findAll();
                    $femalecount=0;
                    $malecount=0;


                    foreach ($patients as $patient)
                    {
                        $birthdate = $patient->getBirthdate();
                        $day= date('d');
                        $month=date('m');
                        $year=date('Y');
                        $today =$fixDate = new \DateTime(date("y-m-d",strtotime("$year"."/"."$month"."/"."$day")));
                        $diff= $birthdate->diff($today);
                        $diff= $diff->format('%Y ');

                        if ($diff>= $min && $diff<= $max)
                        {
                            if ($patient->getGender() == "F")
                                $femalecount++;
                            else
                                if ($patient->getGender() == "M")
                                    $malecount++;

                        }

                    }
                    $femaleTotal= $femalecount*100/(count($patients));
                    $maleTotal= $malecount*100/(count($patients));

                    return array("femalePercentage"=>$femaleTotal , "malePercentage"=>$maleTotal,
                        "femaleTotal"=>$femalecount,"maleTotal"=>$malecount, "totalPatient"=>count($patients));
                }
                else
                    return new Response('Error, the place don\'t exists',Response::HTTP_CONFLICT);
            } catch (Exception $ex)
            {
                return new Response('Error', Response::HTTP_CONFLICT);
            }
        }

        return new Response('Error, the place don\'t exists',Response::HTTP_CONFLICT);
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
    "registrationDate": ""MM/DD/YYYY",
    "accompanied": "Si",
    "document": "14111222",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "homeVisit": "No",
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
    "document": "14111222",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "homeVisit": "No",
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