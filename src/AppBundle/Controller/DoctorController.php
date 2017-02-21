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
     * @Get("/")
     */

    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $specialty = $em->getRepository('AppBundle:Doctor')->findAll();
        return $specialty;
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

                    return new Response('The doctor was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the doctor was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the doctor was not inserted',Response::HTTP_CONFLICT);
    }
}