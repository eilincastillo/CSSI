<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 16/2/2017
 * Time: 8:52 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Status;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\Get;

class StatusController extends FOSRestController
{
    /**
     * Get all status
     *
     * @return mixed
     *
     * @Get("/")
     */

    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $specialty = $em->getRepository('AppBundle:Status')->findAll();
        return $specialty;
    }

}