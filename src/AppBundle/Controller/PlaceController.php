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
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/place/
     * @apiName getStatesAction
     * @apiGroup Place
     * @apiDescription Get all doctor.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     *[
    {
    "id": 1,
    "name": "Distrito Capital"
    },
    {
    "id": 4,
    "name": "Vargas"
    }
    ]
     */

    /**
     * Get All States
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
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/place/{idState}
     * @apiName getDistrictsAction
     * @apiGroup Place
     * @apiDescription Get Districts.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     *[
    {
    "id": 2,
    "name": "El Paraiso"
    },
    {
    "id": 3,
    "name": "La Vega"
    }
    ]
     */

    /**
     * Get Districts
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