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
     * @api {get} cssi/web/app_dev.php/api/report/patientByJob/
     * @apiName getAllPatientsByJobAction
     * @apiGroup Report
     * @apiDescription Get all patients by Job.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * [
    {
    "name": "Cardiologia",
    "count": 1
    },
    {
    "name": "Dermatologia",
    "count": 2
    }
    ]
     */

    /**
     * Get all patients by Specialty
     *
     * @return mixed
     *
     * @Get("/patientByJob/")
     */

    public function getPatientByJobAction()
    {
        try
        {
            $em = $this->getDoctrine()->getManager();
            $response= array();

            $patientsWithJob = $em->getRepository('AppBundle:Patient')->findPatientByJobStatus("true");
            $patientsWithoutJob = $em->getRepository('AppBundle:Patient')->findPatientByJobStatus("false");

            array_push($response,(array( "name" =>"withJob", "count" =>count($patientsWithJob) )) );
            array_push($response,(array( "name" =>"withoutJob", "count" =>count($patientsWithoutJob) )) );

            return ($response);

        } catch (Exception $ex)
        {
            return new Response('Error', Response::HTTP_CONFLICT);
        }
    }

    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/report/patientBySpecialty/
     * @apiName getAllPatientsByParishesAction
     * @apiGroup Report
     * @apiDescription Get all patients by Specialty.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * [
    {
    "name": "Cardiologia",
    "count": 1
    },
    {
    "name": "Dermatologia",
    "count": 2
    }
    ]
     */

    /**
     * Get all patients by Specialty
     *
     * @return mixed
     *
     * @Get("/patientBySpecialty/")
     */

    public function getPatientBySpecialtyAction()
    {
        try
        {
            $em = $this->getDoctrine()->getManager();
            $specialties = $em->getRepository('AppBundle:Specialty')->findAll();
            $patientsInSpecialty= array();

            foreach ($specialties as $specialty)
            {

                $patients = $em->getRepository('AppBundle:Patient')->getPatientAppointmentsBySpecialty($specialty->getId());
                $contPatient = count($patients);
                $name= $specialty->getName();
                array_push($patientsInSpecialty,(array( "name" =>$name, "count" =>$contPatient )) );
            }
            return ($patientsInSpecialty);

        } catch (Exception $ex)
        {
            return new Response('Error', Response::HTTP_CONFLICT);
        }
    }


    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/report/patientByDocument/
     * @apiName findPatientByDocumentOrHistoryNumberAction
     * @apiGroup Report
     * @apiDescription find Patient by Document or HistoryNumber.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "nationality": "",
    "document": "",
    "historyNumber": "11111"
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 13,
    "history_number": "121548890",
    "registration_date": "2016-08-08T00:00:00+0200",
    "gender": "M",
    "birthdate": "1993-10-06T00:00:00+0100",
    "family_dynamics": "Familia nuclear",
    "job": "false",
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
    "id": 12,
    "document": "141155212",
    "name": "Alejandra",
    "second_lastname": "Vaamonde",
    "second_name": "Alejandra",
    "lastname": "Vaamonde",
    "nationality": "V"
    },
    "place_detail": "Av. Paez",
    "scholarship": "Ninguno",
    "scholarship_detail": "",
    "occupation": "",
    "employment_institution": "",
    "phone_number": "0414123456",
    "income": "150000",
    "expenses": "500000",
    "saving_capacity": "true"
    }
     */

    /**
     * find Patient by Document or HistoryNumber
     *
     * @return mixed
     *
     * @Post("/patientByDocument/")
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

                        $personal = $em->getRepository('AppBundle:Personal')->findOneByDocument($json['document']);
                        //$personal = $em->getRepository('AppBundle:Personal')->getPersonalByDocumentAndNationality($json['document'],$json["nationality"]);


                        if ($personal != null)
                        {
                            $patients = $em->getRepository('AppBundle:Patient')->findOneByPersonal($personal->getId());
                            if ($personal->getNationality() == $json["nationality"])
                            {
//                                $response = array($personal,$patients);
                                $view = $this->view($patients, 202);
                                return $this->handleView($view);
                                //return ($patients);
                            }

                        }
                        else
                        {
                            $view = $this->view(array("message"=>"Error patient with this document don't exist"), 409);
                            return $this->handleView($view);
                        }
                    }
                    else
                        if ($json['historyNumber'] !="")
                        {
                            $patients = $em->getRepository('AppBundle:Patient')->findOneByHistoryNumber($json['historyNumber']);

                            if ($patients != null)
                            {
                                //$response = array($personal,$patients);
                                $view = $this->view($patients, 202);
                                return $this->handleView($view);
                                //return ($patients);
                            }
                            else
                            {
                                $view = $this->view(array("message"=>"Error patient with this history name don't exist"), 409);
                                return $this->handleView($view);
                            }
                        }
                        else
                        {
                            $view = $this->view(array("message"=>"Error historyNumber and document can\t be null in the same time"), 409);
                            return $this->handleView($view);
                        }

                }
                else
                {
                    $view = $this->view(array("message"=>"Bad json"), 409);
                    return $this->handleView($view);
                }

            } catch (Exception $ex)
            {
                    $view = $this->view(array("message"=>"Generic error"), 409);
                    return $this->handleView($view);
            }
        }
        $view = $this->view(array("message"=>"Generic error"), 409);
        return $this->handleView($view);
    }

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/report/rangeAge/
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
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "femalePercentage": 50,
    "malePercentage": 25,
    "femaleTotal": 2,
    "maleTotal": 1,
    "totalPatient": 4
    }
     */

    /**
     * Get female patient between a range of age
     *
     * @return mixed
     *
     * @Post("/rangeAge/")
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
     * @api {get} cssi/web/app_dev.php/api/report/allPatientParishes/
     * @apiName getAllPatientsByParishesAction
     * @apiGroup Report
     * @apiDescription Get all patients by Parishes.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * [
    {
    "name": "El Paraiso",
    "count": 2
    },
    {
    "name": "La Vega",
    "count": 1
    }
    ]
     */

    /**
     * Get all patients by Parishes
     *
     * @return mixed
     *
     * @Get("/allPatientParishes/")
     */

    public function getAllPatientsByParishesAction()
    {
        try
        {
            $em = $this->getDoctrine()->getManager();
            $parishes = $em->getRepository('AppBundle:Place')->getAddressDistrict(1);
            $patients = $em->getRepository('AppBundle:Patient')->findAll();
            $patientsInParish= array();

            foreach ($parishes as $parish)
            {
                $contPatient=0;
                foreach ($patients as $patient)
                {
                    if ($patient->getPlace()->getName() == $parish["name"])
                        $contPatient++;
                }
                $name= $parish["name"];
                array_push($patientsInParish,(array( "name" =>$name, "count" =>$contPatient )) );

            }
            return ($patientsInParish);

        } catch (Exception $ex)
        {
            return new Response('Error', Response::HTTP_CONFLICT);
        }

    }

    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/report/howMany/{idPatient}
     * @apiName howManyAPatientSolicitedHelpAction
     * @apiGroup Report
     * @apiDescription Get how many a patient solicited the help.
     *
     * @apiParamExample {json} Response-Example:
     * {
    "numberAppointment": 0,
    "patient": {
    "id": 13,
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
    "id": 12,
    "document": "14000222",
    "name": "Alejandra",
    "second_lastname": "Vaamonde",
    "second_name": "Alejandra",
    "lastname": "Vaamonde",
    "nationality": "V"
    }
    }
    }
     */

    /**
     * Get how many a patient solicited the help
     *
     * @return mixed
     *
     * @Get("/howMany/{idPatient}")
     */

    public function howManyAPatientSolicitedHelpAction($idPatient)
    {
        $em = $this->getDoctrine()->getManager();

        $patient = $em->getRepository('AppBundle:Patient')->find($idPatient);
        $appointment = $em->getRepository('AppBundle:Appointment')->getAppointmentsByPatient($patient);
        //return array('appointment' => $appointment, 'patient' => $patient);
        return array('numberAppointment' => count($appointment), 'patient' => $patient);
    }

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/report/patientParishes/
     * @apiName getPatientByParishesAction
     * @apiGroup Report
     * @apiDescription Get a patient by Parishes.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "nameParishes": "La Vega"
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "totalPatient": 1,
    "patients": [
    {
    "id": 14,
    "historyNumber": "1234567890",
    "registrationDate": "1970-01-01T00:00:00+0100",
    "gender": "M",
    "birthdate": "1970-01-01T00:00:00+0100",
    "familyDynamics": "Familia nuclear",
    "job": "false",
    "jobDetail": "",
    "namePersonal": "Alejandra",
    "lastnamePersonal": "Vaamonde",
    "secondNamePersonal": "Alejandra",
    "secondLastnamePersonal": "Vaamonde",
    "document": "14111222",
    "nationality": "V"
    }
    ]
    }
     *
     */

    /**
     * Get a patient by Parishes
     *
     * @return mixed
     *
     * @Post("/patientParishes/")
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
                        $patients = $em->getRepository('AppBundle:Patient')->findByPlace($parishes);
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
     * @api {post} cssi/web/app_dev.php/api/report/countPersonsAndHelp/
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
     *
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
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "totalPatient": 2,
    "totalHelp": 187500
    }
     *
     */

    /**
     * Get how persons and money have the system for range of date
     *
     * @return mixed
     *
     * @Post("/countPersonsAndHelp/")
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