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

}