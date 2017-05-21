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
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/status/
     * @apiName indexAction
     * @apiGroup Status
     * @apiDescription Get all status.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * [
    {
    "id": 1,
    "name": "Active"
    },
    {
    "id": 2,
    "name": "Inactive"
    }
    ]
     */

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
        $status = $em->getRepository('AppBundle:Status')->findAll();
        return $status;
    }

    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/user/{idStatus}
     * @apiName getStatusAction
     * @apiGroup Status
     * @apiDescription Get a status.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     *{
    "id": 1,
    "username": "fulano",
    "password": "T0UZBcMFg5gRbS5tNedWDdg12wV/NRtsr6mNskhRS3w5vnd/NAxK6vrOtf11wiF5lT/Pzpj91sd8+khmT+A/jA==",
    "status": {
    "id": 1,
    "name": "Active"
    },
    "roles": "ROLE_PERSONAL",
    "personal": {
    "id": 1,
    "document": "",
    "name": "Fulano",
    "second_lastname": "",
    "second_name": "",
    "lastname": "Perez",
    "nationality": ""
    },
    "salt": "7eb39db13fd056ef804382daedce01b2"
    }
     */

    /**
     * Get user by id
     *
     * @var $idStatus
     * @return mixed
     *
     * @Get("/{idStatus}")
     */
    public function getStatusAction($idStatus)
    {
        $em = $this->getDoctrine()->getManager();
        $status = $em->getRepository('AppBundle:Status')->find($idStatus);

        if($status == null)
        {
            return new Response('Error, user not found', Response::HTTP_CONFLICT);
        }

        return $status;

    }

}