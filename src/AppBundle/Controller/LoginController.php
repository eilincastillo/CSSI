<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 4/6/2017
 * Time: 2:35 PM
 */

namespace AppBundle\Controller;


use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Get;
use Symfony\Component\Config\Definition\Exception\Exception;

class LoginController extends FOSRestController
{
    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/login_check/{idUser}
     * @apiName getUserByUsernameAction
     * @apiGroup Login
     * @apiDescription Get user by username.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     */

    /**
     * Get user by username
     *
     * @var $username
     * @return mixed
     *
     * @Get("/{username}")
     */
    public function getUserByUsernameAction($username)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AppBundle:User')->findOneByUsername($username);

        if($user == null)
        {
            $view = $this->view(array("message"=>"Error, user not found"), 409);
            return $this->handleView($view);
        }

        return array("role"=>$user->getRoles()[0],"name"=>$user->getPersonal()->getName(), "lastname"=> $user->getPersonal()->getLastname());
        //return $user;
    }

}