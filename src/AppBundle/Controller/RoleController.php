<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 26-Feb-17
 * Time: 2:01 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Role;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends FOSRestController
{

    /**
     * Get all roles
     *
     * @return mixed
     *
     * @Get("/")
     */
    public function getAllAction()
    {
        $em = $this->getDoctrine()->getManager();
        $roles = $em->getRepository('AppBundle:Role')->findAll();
        return $roles;
    }

}