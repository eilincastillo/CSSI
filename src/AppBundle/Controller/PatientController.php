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
     * [  {
    "name": {
    "id": 13,
    "namePersonal": "Alejandra",
    "lastname": "Vaamonde",
    "secondName": "Alejandra",
    "secondLastname": "Vaamonde",
    "document": "14000222",
    "nationality": "V"
    },
    "appointments": 2
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
        $patients = $em->getRepository('AppBundle:Patient')->getPatientClean();
        $appointments = $em->getRepository('AppBundle:Appointment')->findAll();
        $result = array();


        foreach ($patients as $patient)
        {
            $cont = 0;
            foreach ($appointments as $appointment)
            {
                if ($appointment->getPatient()->getId() == $patient["id"])
                    $cont++;
            }
            array_push($result,(array( "personal" =>$patient, "appointments" =>$cont )) );
        }
        return $result;
    }

    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/patient/{idPatient}
     * @apiName getByIdAction
     * @apiGroup Patient
     * @apiDescription Get a patient byId.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 13,
    "name": "Alejandra",
    "lastname": "Vaamonde",
    "secondName": "Alejandra",
    "secondLastname": "Vaamonde",
    "document": "141155212",
    "nationality": "V",
    "historyNumber": "121548890",
    "registrationDate": "2016-08-08T00:00:00+0200",
    "gender": "M",
    "birthdate": "1993-10-06T00:00:00+0100",
    "familyDynamics": "Familia nuclear",
    "job": "false",
    "jobOccupation": "",
    "employmentInstitution": "",
    "idPlace": 2,
    "namePlace": "El Paraiso",
    "placeDetail": "Av. Paez",
    "scholarship": "Ninguno",
    "scholarshipDetail": "",
    "phoneNumber": "0414123456",
    "income": "150000",
    "expenses": "500000",
    "savingCapacity": "true",
    "appointments": [
    {
    "id": 8,
    "date": "2017-02-20T00:00:00+0100",
    "percentageAid": 50,
    "observations": "Necesita ayuda",
    "reasonAppointment": "Necesita ayuda",
    "result": "Aprovado",
    "expectationsPatient": "Ninguna",
    "doctorName": "Cruz Mariasss",
    "doctorLastname": "Vaamonde"
    },
    {
    "id": 9,
    "date": "2017-02-20T00:00:00+0100",
    "percentageAid": 50,
    "observations": "Necesita ayuda",
    "reasonAppointment": "Necesita ayuda",
    "result": "Aprovado",
    "expectationsPatient": "Ninguna",
    "doctorName": "Ana",
    "doctorLastname": "Perez"
    }
    ]
    }
     */

    /**
     * Get all patient
     *
     * @return mixed
     *
     * @Get("/{idPatient}")
     */

    public function getByIdAction($idPatient)
    {
        $em = $this->getDoctrine()->getManager();
        $patient = $em->getRepository('AppBundle:Patient')->findOneById($idPatient);

        $appointments = $em->getRepository('AppBundle:Appointment')->getAppointmentsByPatient($patient);

        return array ("id"=>$patient->getId(),"name"=>$patient->getPersonal()->getName(),"lastname"=>$patient->getPersonal()->getLastname(),
            "secondName"=>$patient->getPersonal()->getSecondName(),"secondLastname"=>$patient->getPersonal()->getSecondLastname(),
            "document"=>$patient->getPersonal()->getDocument(),"nationality"=>$patient->getPersonal()->getNationality(),
            "historyNumber"=>$patient->getHistoryNumber(),
            "registrationDate"=>$patient->getRegistrationDate(),"gender"=>$patient->getGender(),
            "birthdate"=>$patient->getBirthdate(),"familyDynamics"=>$patient->getFamilyDynamics(),
            "job"=>$patient->getJob(),"jobOccupation"=>$patient->getOccupation(),
            "employmentInstitution"=>$patient->getEmploymentInstitution(),
            "idPlace"=>$patient->getPlace()->getId(),"namePlace"=>$patient->getPlace()->getName(),
            "placeDetail"=>$patient->getPlaceDetail(),"scholarship"=>$patient->getScholarship(),
            "scholarshipDetail"=>$patient->getScholarshipDetail(),"phoneNumber"=>$patient->getPhoneNumber(),
            "income"=>$patient->getIncome(),"expenses"=>$patient->getExpenses(),
            "savingCapacity"=>$patient->getSavingCapacity(),
            "appointments"=>$appointments);
        //return $appointments;
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
    "name": "Martin",
    "secondName": "Andres",
    "lastname": "Perez",
    "secondLastname": "Ramirez",
    "historyNumber": "1234567764",
    "nationality": "V",
    "document": "14117222",
    "gender": "M",
    "birthdate": "05/05/1960",
    "familyDynamics": "Familia nuclear",
    "scholarship":"Bachiller",
    "scholarshipDetail":"",
    "job": "true",
    "occupation": "Plomero",
    "employmentInstitution":"",
    "idPlace": 2,
    "placeDetail":"Av. San M",
    "phoneNumber": "0414123456",
    "income":"150000",
    "expenses": "500000",
    "savingCapacity":"true"
     *
     *
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 16,
    "history_number": "1234567764",
    "registration_date": "2016-05-05T00:00:00+0200",
    "gender": "M",
    "birthdate": "2060-05-05T00:00:00+0100",
    "family_dynamics": "Familia nuclear",
    "job": "true",
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
    "id": 17,
    "document": "14117222",
    "name": "Martin",
    "second_lastname": "Ramirez",
    "second_name": "Andres",
    "lastname": "Perez",
    "nationality": "V"
    },
    "place_detail": "Av. San Martin",
    "scholarship": "Bachiller",
    "scholarship_detail": "",
    "occupation": "Plomero",
    "employment_institution": ""
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
                    $patient = $em->getRepository('AppBundle:Patient')->findByHistoryNumber($json["historyNumber"]);
                    $personal = $em->getRepository('AppBundle:Personal')->findByDocument($json['document']);


                    if ($place !== null)
                    {
                        if ($patient==null)
                        {
                            if ($personal==null)
                            {
                                $patient = new Patient();
                                $personal = new Personal();

                                $personal->setName($json["name"]);
                                $personal->setLastname($json["lastname"]);
                                $personal->setSecondName($json["secondName"]);
                                $personal->setSecondLastname($json["secondLastname"]);
                                $patient->setHistoryNumber($json["historyNumber"]);
                                $fixDate = new \DateTime(date("y-m-d",strtotime(date("m/d/Y"))));
                                $patient->setRegistrationDate($fixDate);
                                $personal->setNationality($json["nationality"]);
                                $personal->setDocument($json["document"]);
                                $fixDate = new \DateTime(date("y-m-d",strtotime($json['birthdate'])));
                                $patient->setBirthdate($fixDate);
                                $patient->setFamilyDynamics($json["familyDynamics"]);
                                $patient->setScholarship($json["scholarship"]);
                                $patient->setScholarshipDetail($json["scholarshipDetail"]);
                                $patient->setGender($json["gender"]);
                                $patient->setJob($json["job"]);
                                $patient->setOccupation($json["occupation"]);
                                $patient->setEmploymentInstitution($json["employmentInstitution"]);
                                $patient->setPlaceDetail($json["placeDetail"]);
                                $patient->setPlace($place);
                                $patient->setPersonal($personal);
                                $patient->setPhoneNumber($json["phoneNumber"]);
                                $patient->setIncome($json["income"]);
                                $patient->setExpenses($json["expenses"]);
                                $patient->setSavingCapacity($json["savingCapacity"]);

                                $em->persist($patient);
                                $em->flush();

                                //$response = $em->getRepository('AppBundle:Patient')->findAPatients($personal->getId());
                            }
                            else
                            {
                                $view = $this->view(array("message"=>"Error, a patient with this document already exists"), 409);
                                return $this->handleView($view);
                            }
                        }
                        else
                        {
                            $view = $this->view(array("message"=>"Error, a patient with this history number already exists"), 409);
                            return $this->handleView($view);
                        }
                    }
                    else
                    {
                        $view = $this->view(array("message"=>"Error, the place don't exists"), 409);
                        return $this->handleView($view);
                    }

                    $view = $this->view($patient, 202);
                    return $this->handleView($view);
                    //return new Response('The patient was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                $view = $this->view(array("message"=>"Generic error, the patient was not inserted"), 409);
                return $this->handleView($view);
            }
        }
        $view = $this->view(array("message"=>"Generic error, the patient was not inserted"), 409);
        return $this->handleView($view);
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
    "nationality": "V",
    "gender": "M",
    "document": "14111222",
    "birthdate": "MM/DD/YYYY",
    "familyDynamics": "Familia nuclear",
    "scholarship":"Ninguno",
    "scholarshipDetail":"",
    "job": "false",
    "occupation": "",
    "employmentInstitution":"",
    "idPlace": 2,
    "placeDetail":"Av. Paez",
    "phoneNumber": "0414123456",
    "income":"150000",
    "expenses": "500000",
    "savingCapacity":"true"
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 16,
    "history_number": "1234567764",
    "registration_date": "2016-05-05T00:00:00+0200",
    "gender": "M",
    "birthdate": "2060-05-05T00:00:00+0100",
    "family_dynamics": "Familia nuclear",
    "job": "true",
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
    "id": 17,
    "document": "14117222",
    "name": "Martin",
    "second_lastname": "Ramirez",
    "second_name": "Andres",
    "lastname": "Perez",
    "nationality": "V"
    },
    "place_detail": "Av. San Martin",
    "scholarship": "Bachiller",
    "scholarship_detail": "",
    "occupation": "Plomero",
    "employment_institution": ""
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
                    $patient = $em->getRepository('AppBundle:Patient')->findOneById($idPatient);
                    $personal = $patient->getPersonal();
                    $place = $em->getRepository('AppBundle:Place')->find($json['idPlace']);

                    if ($place !== null && $patient !== null)
                    {
                        $personal->setName($json["name"]);
                        $personal->setLastname($json["lastname"]);
                        $personal->setSecondName($json["secondName"]);
                        $personal->setSecondLastname($json["secondLastname"]);
                        $patient->setHistoryNumber($json["historyNumber"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime(date("m/d/Y"))));
                        $patient->setRegistrationDate($fixDate);
                        $personal->setNationality($json["nationality"]);
                        $personal->setDocument($json["document"]);
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json['birthdate'])));
                        $patient->setBirthdate($fixDate);
                        $patient->setFamilyDynamics($json["familyDynamics"]);
                        $patient->setGender($json["gender"]);
                        $patient->setScholarship($json["scholarship"]);
                        $patient->setScholarshipDetail($json["scholarshipDetail"]);
                        $patient->setGender($json["gender"]);
                        $patient->setJob($json["job"]);
                        $patient->setOccupation($json["occupation"]);
                        $patient->setEmploymentInstitution($json["employmentInstitution"]);
                        $patient->setPlaceDetail($json["placeDetail"]);
                        $patient->setPlace($place);
                        $patient->setPersonal($personal);
                        $patient->setPersonal($personal);
                        $patient->setPhoneNumber($json["phoneNumber"]);
                        $patient->setIncome($json["income"]);
                        $patient->setExpenses($json["expenses"]);
                        $patient->setSavingCapacity($json["savingCapacity"]);

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