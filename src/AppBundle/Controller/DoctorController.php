<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 20/2/2017
 * Time: 9:31 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Doctor;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use AppBundle\Entity\Specialty;
use AppBundle\Entity\Status;
use Symfony\Component\HttpFoundation\Response;

class DoctorController extends FOSRestController
{
    /**
     * Get all doctor
     *
     * @return mixed
     *
     * @Get("")
     */

    public function getAllAction()
    {
        $em = $this->getDoctrine()->getManager();
        $doctor = $em->getRepository('AppBundle:Doctor')->findAll();
        return $doctor;
    }

    /**
     * Get a doctor
     * @var Request $request, $idSpecialty
     * @return mixed
     *
     * @Get("/{idDoctor}")
     */
    public function getAction($idDoctor)
    {

        try
        {
            $em = $this->getDoctrine()->getManager();

            $doctor = $em->getRepository('AppBundle:Doctor')->find($idDoctor);

            return $doctor;

        }
        catch (Exception $ex)
        {
            return new Response('Error, the doctor was not found',Response::HTTP_CONFLICT);
        }


    }


    /**
     * Get active doctors
     *
     * @return mixed
     *
     * @Get("/active")
     */

    public function activeDoctorsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $doctors = $em->getRepository('AppBundle:Doctor')->getActiveDoctors(1);
        return $doctors;
    }

    /**
     * Create a speciality
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


                    $specialty = $em->getRepository('AppBundle:Specialty')->find($json["idSpecialty"]);
                    $status = $em->getRepository('AppBundle:Status')->find(1);

                    if ($specialty != null)
                    {
                        $doctor = new Doctor();
                        $doctor->setName($json["name"]);
                        $doctor->setLastname($json["lastname"]);
                        $doctor->setSpecialty($specialty);
                        $doctor->setStatus($status);

                        $em->persist($doctor);
                        $em->flush();
                    }
                    else
                        return new Response('Error, the specialty don\'t exists',Response::HTTP_CONFLICT);

                    $view = $this->view($doctor, 202);
                    return $this->handleView($view);
                    //return new Response('The doctor was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the doctor was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the doctor was not inserted',Response::HTTP_CONFLICT);
    }

    /**
     * Edit a doctor
     * @var Request $request, $idDoctor
     * @return mixed
     *
     * @Put("/{idDoctor}")
     */

    public function updateAction(Request $request,$idDoctor)
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

                    $doctor = $em->getRepository('AppBundle:Doctor')->find($idDoctor);
                    $specialty = $em->getRepository('AppBundle:Specialty')->find($json["idSpecialty"]);
                    $status = $em->getRepository('AppBundle:Status')->find($json["idStatus"]);

                    if ($doctor != null )
                    {
                        if ($specialty != null || $status != null)
                        {
                            $doctor->setName($json["name"]);
                            $doctor->setLastname($json["lastname"]);
                            $doctor->setSpecialty($specialty);
                            $doctor->setStatus($status);

                            $em->persist($doctor);
                            $em->flush();
                        }
                        else
                            return new Response('Error, the specialty or status don\'t exists',Response::HTTP_CONFLICT);
                    }
                    else
                        return new Response('Error, the Doctor don\'t exists',Response::HTTP_CONFLICT);

                    $view = $this->view($doctor, 202);
                    return $this->handleView($view);
                    //return new Response('The doctor was successfully edited', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the doctor was not edited',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the doctor was not edited',Response::HTTP_CONFLICT);
    }
}