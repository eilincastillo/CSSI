<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 21/2/2017
 * Time: 9:15 PM
 */

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
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