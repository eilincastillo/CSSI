<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 26-Feb-17
 * Time: 10:23 PM
 */

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Get;

class PlaceController extends FOSRestController
{

    /**
     *
     * @return mixed
     *
     * @Get("/")
     */
    public function getStatesAction()
    {
        $em = $this->getDoctrine()->getManager();
        $states = $em->getRepository('AppBundle:Place')->getAddressState();
        return $states;
    }


    /**
     * @var $idState
     *
     * @return mixed
     *
     * @Get("/{idState}")
     */
    public function getDistrictsAction($idState)
    {
        $em = $this->getDoctrine()->getManager();
        $districts = $em->getRepository('AppBundle:Place')->getAddressDistrict($idState);
        return $districts;
    }

}