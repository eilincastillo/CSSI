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
 * ApiDoc
 * @api {get} cssi/web/app_dev.php/api/appointment/
 * @apiName getAllAction
 * @apiGroup Appointment
 * @apiDescription Get all appointment.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * {
"id": 1,
"date": "2017-03-01T00:00:00+0100",
"price": 200000,
"percentage_aid": 10,
"observations": "Ninguna",
"reason_appointment": "Quiere ayuda",
"patient": {
"id": 1,
"name": "Fulana",
"lastname": "Diaz",
"history_number": "111111111",
"registration_date": "2017-03-08T00:00:00+0100",
"accompanied": "No",
"document": "123458",
"gender": "F",
"birthdate": "1997-03-11T00:00:00+0100",
"family_dynamics": "Familia nuclear",
"home_visit": "No",
"job": "true",
"job_detail": "bla bla",
"place": {
"id": 2,
"name": "El Paraiso",
"type": "Parroquia",
"place": {
"id": 1,
"name": "Distrito Capital",
"type": "Estado"
}
}
},
"status": {
"id": 1,
"name": "Active"
},
"doctor": {
"id": 1,
"name": "Cruz Maria",
"lastname": "Vaamonde",
"specialty": {
"id": 1,
"name": "Cardiologia"
},
"status": {
"id": 1,
"name": "Active"
}
}
}
]
 *
 */

    /**
     * Get all appointment
     *
     * @return mixed
     *
     * @Get("/")
     */

    public function getAllAction()
    {
        $em = $this->getDoctrine()->getManager();
        $appointment = $em->getRepository('AppBundle:Appointment')->findAll();
        return $appointment;
    }




    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/appointment/{idAppointment}
     * @apiName getByIdAction
     * @apiGroup Appointment
     * @apiDescription Get appointment by id.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 1,
    "accompanied": "",
    "date": "2017-03-01T00:00:00+0100",
    "homeVisit": "",
    "price": 200000,
    "percentageAid": 10,
    "observations": "Ninguna",
    "reasonAppointment": "Quiere ayuda",
    "result": "No aprobado",
    "expectationsPatient": "Ninguna",
    "doctor": {
    "idDoctor": 1,
    "nameDoctor": "Cruz Maria",
    "lastnameDoctor": "Vaamonde",
    "specialtyDoctor": "Cardiologia"
    }
    }
     *
     *
     */

    /**
     * Get appointment by id
     *
     * @return mixed
     *
     * @Get("/{idAppointment}")
     */

    public function getByIdAction($idAppointment)
    {
        $em = $this->getDoctrine()->getManager();
        $appointment= new Appointment();
        $appointment = $em->getRepository('AppBundle:Appointment')->findOneById($idAppointment);
        return array("id"=>$appointment->getId(), "accompanied"=>$appointment->getAccompanied(),
            "date"=>$appointment->getDate(), "homeVisit"=>$appointment->getHomeVisit(),
            "price"=>$appointment->getPrice(),"percentageAid"=> $appointment->getPercentageAid(),
            "observations"=>$appointment->getObservations(),"reasonAppointment"=>$appointment->getReasonAppointment(),
            "result"=>$appointment->getResult(),"expectationsPatient"=>$appointment->getExpectationsPatient(),
            "doctor"=>array("idDoctor"=>$appointment->getDoctor()->getId(),
                "nameDoctor"=>$appointment->getDoctor()->getName(),
                "lastnameDoctor"=>$appointment->getDoctor()->getLastName(),
                "specialtyDoctor"=>$appointment->getDoctor()->getSpecialty()->getName())
        );
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
    "date": "MM/DD/YYYY",
    "price": "100000",
    "percentageAid": "50",
    "observations": "Necesita ayuda",
    "reasonAppointment": "Necesita ayuda",
    "result": "Aprovado",
    "accompanied": "",
    "homeVisit": "",
    "expectationsPatient":"Quiere ayuda",
    "idDoctor" : 1,
    "idPatient":1
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
    "id": 11,
    "date": "2016-10-09T00:00:00+0200",
    "accompanied": "Si",
    "home_visit": "",
    "price": 100000,
    "percentage_aid": 50,
    "observations": "Necesita ayuda",
    "reason_appointment": "Necesita ayuda",
    "result": "Aprovado",
    "expectations_patient": "Quiere ayuda",
    "patient": {
    "id": 16,
    "history_number": "1234567764",
    "registration_date": "2016-05-05T00:00:00+0200",
    "gender": "M",
    "birthdate": "1970-05-05T00:00:00+0100",
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
    "place_detail": "Av. San M",
    "scholarship": "Bachiller",
    "scholarship_detail": "",
    "occupation": "Plomero",
    "employment_institution": ""
    },
    "user": {
    "id": 4,
    "username": "fulana_93",
    "password": "v/rG+KdPjIghHVIYe/1dVhfJflFmFNW4sc4u3+m32hrjAt3zVGvg1iaTZSwMvzYgE7ILS8J9RiqxjPWI/fapqA==",
    "status": {
    "id": 1,
    "name": "Active"
    },
    "roles": "ROLE_PERSONAL",
    "personal": {
    "id": 14,
    "document": "12115447",
    "name": "Fulana",
    "second_lastname": "Sanchez",
    "second_name": "",
    "lastname": "Perez",
    "nationality": "V"
    },
    "salt": "65611dd1596afc0eb94a00b8b67328d2"
    }
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
                    $doctor = $em->getRepository('AppBundle:Doctor')->find($json["idDoctor"]);
                    $appointment = new Appointment();

                    if ($doctor !==null)
                    {
                        if ($patient !== null)
                        {
                            $fixDate = new \DateTime(date("y-m-d",strtotime($json["date"])));
                            $appointment->setDate($fixDate);
                            $appointment->setPrice($json["price"]);
                            $appointment->setPercentageAid($json["percentageAid"]);
                            $appointment->setHomeVisit($json["homeVisit"]);
                            $appointment->setAccompanied($json["accompanied"]);
                            $appointment->setObservations($json["observations"]);
                            $appointment->setReasonAppointment($json["reasonAppointment"]);
                            $appointment->setResult($json["result"]);
                            $appointment->setExpectationsPatient($json["expectationsPatient"]);
                            $appointment->setUser($this->getUser());
                            $appointment->setDoctor($doctor);
//                        $appointment->set($json["caseRemitted"]);
//                        $appointment->setFamilyDynamics($json["institutionName"]);
//                        $appointment->setHomeVisit($json["institutionType"]);
                            $appointment->setPatient($patient);

                            $em->persist($appointment);
                            $em->flush();
                        }
                        else
                        {
                            $view = $this->view(array("message"=>"Error, the patient don't exists"), 409);
                            return $this->handleView($view);
                        }
                    }
                    else
                    {
                        $view = $this->view(array("message"=>"Error, the doctor don't exists"), 409);
                        return $this->handleView($view);
                    }

                    //return new Response('The appointment was successfully added', Response::HTTP_ACCEPTED);
                    $view = $this->view($appointment, 202);
                    return $this->handleView($view);
                }
            }
            catch (Exception $ex)
            {
                $view = $this->view(array("message"=>"Generic Error, the appointment was not edited"), 409);
                return $this->handleView($view);
            }
        }
        $view = $this->view(array("message"=>"Generic Error, the appointment was not edited"), 409);
        return $this->handleView($view);
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
    "accompanied": "",
    "homeVisit": "",
    "idDoctor" : 1,
    "expectationsPatient":"Quiere ayuda"
      }
     *
     *    * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
    "id": 11,
    "date": "2016-10-09T00:00:00+0200",
    "accompanied": "Si",
    "home_visit": "",
    "price": 100000,
    "percentage_aid": 50,
    "observations": "Necesita ayuda",
    "reason_appointment": "Necesita ayuda",
    "result": "Aprovado",
    "expectations_patient": "Quiere ayuda",
    "patient": {
    "id": 16,
    "history_number": "1234567764",
    "registration_date": "2016-05-05T00:00:00+0200",
    "gender": "M",
    "birthdate": "1970-05-05T00:00:00+0100",
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
    "place_detail": "Av. San M",
    "scholarship": "Bachiller",
    "scholarship_detail": "",
    "occupation": "Plomero",
    "employment_institution": ""
    },
    "user": {
    "id": 4,
    "username": "fulana_93",
    "password": "v/rG+KdPjIghHVIYe/1dVhfJflFmFNW4sc4u3+m32hrjAt3zVGvg1iaTZSwMvzYgE7ILS8J9RiqxjPWI/fapqA==",
    "status": {
    "id": 1,
    "name": "Active"
    },
    "roles": "ROLE_PERSONAL",
    "personal": {
    "id": 14,
    "document": "12115447",
    "name": "Fulana",
    "second_lastname": "Sanchez",
    "second_name": "",
    "lastname": "Perez",
    "nationality": "V"
    },
    "salt": "65611dd1596afc0eb94a00b8b67328d2"
    }
     */

    /**
     * Update a appointment
     * @var Request $request
     * @return mixed
     *
     * @Put("/{idAppointment}")
     */

    public function updateAction(Request $request, $idAppointment)
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
                    $appointment =  $em->getRepository('AppBundle:Appointment')->find($idAppointment);
                    $patient = $appointment->getPatient();
                    $doctor = $em->getRepository('AppBundle:Doctor')->find($json["idDoctor"]);

                    if ($patient !== null && $appointment !== null && $doctor !==null)
                    {
                        $fixDate = new \DateTime(date("y-m-d",strtotime($json["date"])));
                        $appointment->setDate($fixDate);
                        $appointment->setPrice($json["price"]);
                        $appointment->setPercentageAid($json["percentageAid"]);
                        $appointment->setObservations($json["observations"]);
                        $appointment->setReasonAppointment($json["reasonAppointment"]);
                        $appointment->setHomeVisit($json["homeVisit"]);
                        $appointment->setAccompanied($json["accompanied"]);
                        $appointment->setResult($json["result"]);
                        $appointment->setExpectationsPatient($json["expectationsPatient"]);
                        $appointment->setDoctor($doctor);
//                        $appointment->set($json["caseRemitted"]);
//                        $appointment->setFamilyDynamics($json["institutionName"]);
//                        $appointment->setHomeVisit($json["institutionType"]);
                        $appointment->setPatient($patient);

                        $em->persist($appointment);
                        $em->flush();
                    }
                    else
                    {
                        $view = $this->view(array("message"=>"Error, the patient or doctor or appointment don't exists"), 409);
                        return $this->handleView($view);
                    }

                    $view = $this->view($appointment, 202);
                    return $this->handleView($view);
                    //return new Response('The appointment was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                $view = $this->view(array("message"=>"Generic Error, the appointment was not edited"), 409);
                return $this->handleView($view);
            }
        }
        $view = $this->view(array("message"=>"Generic Error, the appointment was not edited"), 409);
        return $this->handleView($view);
    }
}