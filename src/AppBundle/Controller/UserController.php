<?php
/**
 * Created by PhpStorm.
 * User: marco
 * Date: 26-Feb-17
 * Time: 2:53 PM
 */

namespace AppBundle\Controller;


use AppBundle\Entity\Personal;
use AppBundle\Entity\User;
use Symfony\Component\Config\Definition\Exception\Exception;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\Post;
use AppBundle\Entity\Status;
use AppBundle\Entity\Role;


class UserController extends FOSRestController
{
    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/user/
     * @apiName getAllAction
     * @apiGroup User
     * @apiDescription Get all users.
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     *[
    {
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
     * ]
     */

    /**
     * Get all users
     *
     * @return mixed
     *
     * @Get("/")
     */
    public function getAllAction()
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('AppBundle:User')->findAll();
        return $users;
    }

    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/user/{idUser}
     * @apiName getUserAction
     * @apiGroup User
     * @apiDescription Get a users.
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
     * @var $idUser
     * @return mixed
     *
     * @Get("/{idUser}")
     */
    public function getUserAction($idUser)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('AppBundle:User')->find($idUser);

        if($user == null)
        {
            return new Response('Error, user not found', Response::HTTP_CONFLICT);
        }

        return $user;

    }

    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/user/
     * @apiName saveAction
     * @apiGroup User
     * @apiDescription Create a user.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "username": "fulana_93",
    "password": "1234",
    "name": "Fulana",
    "lastname": "Perez",
    "secondName": "",
    "secondLastname": "Sanchez",
    "document": "12115447",
    "nationality": "V",
    "role":"ROLE_PERSONAL"
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
    "id": 4,
    "username": "fulana_93",
    "password": "v/rG+KdPjIghHVIYe/1dVhfJflFmFNW4sc4u3+m32hrjAt3zVGvg1iaTZSwMvzYgE7ILS8J9RiqxjPWI/fapqA==",
    "status": {
    "id": 1,
    "name": "Active"
    },
    "roles": "ROLE_PERSONAL",
    "personal": {
    "id": 14,
    "document": "12115447",
    "name": "Fulana",
    "second_lastname": "Sanchez",
    "second_name": "",
    "lastname": "Perez",
    "nationality": "V"
    },
    "salt": "65611dd1596afc0eb94a00b8b67328d2"
    }
     */

    /**
     * Save user
     *
     * @var Request $request
     * @return mixed
     *
     * @Post("/")
     */
    public function saveAction(Request $request)
    {
        $content = $request->getContent();

        if($content != null)
        {
            $json = json_decode($content, true);
            try
            {
                if ($json != null)
                {
                    $em = $this->getDoctrine()->getManager();

                    $user = $em->getRepository('AppBundle:User')->findByUsername($json["username"]);
                    $personal = $em->getRepository('AppBundle:Personal')->findByDocument($json["document"]);
                    if ($user ==null)
                    {
                        if ($personal==null)
                        {
                            $em = $this->getDoctrine()->getManager();

                            $status = $em->getRepository('AppBundle:Status')->find(1);

                            $user = new User();

                            $user->setUsername($json["username"]);

                            $encoder = $this->get('security.encoder_factory')->getEncoder($user);
                            $user->setSalt(md5(time()));
                            $passwordCodificado = $encoder->encodePassword($json['password'],$user->getSalt());
                            $user->setPassword($passwordCodificado);

                            $personal = new Personal();

                            $personal->setDocument($json["document"]);
                            $personal->setNationality($json["nationality"]);
                            $personal->setName($json["name"]);
                            $personal->setLastname($json["lastname"]);
                            $personal->setSecondName($json["secondName"]);
                            $personal->setSecondLastname($json["secondLastname"]);

                            $user->setPersonal($personal);
                            $user->setStatus($status);
                            $user->setRoles($json["role"]);

                            $em->persist($user);
                            $em->flush();

                            $view = $this->view($user, 202);
                            return $this->handleView($view);
                        }
                        else
                        {
                            $view = $this->view(array("message"=>"Error, a user with this document already exists"), 409);
                            return $this->handleView($view);
                        }
                    }
                    else
                    {
                        $view = $this->view(array("message"=>"Error, a user with this username already exists"), 409);
                        return $this->handleView($view);
                    }
                    //return ($patients);
                    //return new Response('The doctor was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                $view = $this->view(array("message"=>"Generic Error, the user was not inserted"), 409);
                return $this->handleView($view);
            }
        }
        $view = $this->view(array("message"=>"Generic Error, bad json"), 409);
        return $this->handleView($view);

    }

    /**
     * ApiDoc
     * @api {put} cssi/web/app_dev.php/api/user/{idUser}
     * @apiName updateAction
     * @apiGroup User
     * @apiDescription Update a user.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "username": "fulana_93",
    "password": "1234",
    "name": "Fulana",
    "lastname": "Perez",
    "secondName": "",
    "secondLastname": "Sanchez",
    "document": "12115447",
    "nationality": "V",
    "idStatus": 1,
    "role":"ROLE_PERSONAL"
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     * {
    "id": 4,
    "username": "fulana_93",
    "password": "v/rG+KdPjIghHVIYe/1dVhfJflFmFNW4sc4u3+m32hrjAt3zVGvg1iaTZSwMvzYgE7ILS8J9RiqxjPWI/fapqA==",
    "status": {
    "id": 1,
    "name": "Active"
    },
    "roles": "ROLE_PERSONAL",
    "personal": {
    "id": 14,
    "document": "12115447",
    "name": "Fulana",
    "second_lastname": "Sanchez",
    "second_name": "",
    "lastname": "Perez",
    "nationality": "V"
    },
    "salt": "65611dd1596afc0eb94a00b8b67328d2"
    }
     */

    /**
     * Update user info
     *
     * @var Request $request, $idUser
     * @return mixed
     *
     * @PUT("/{idUser}")
     */
    public function updateAction(Request $request, $idUser)
    {
        $content = $request->getContent();

        if($content != null)
        {
            $json = json_decode($content, true);

            try
            {
                if($json != null)
                {
                    $em = $this->getDoctrine()->getManager();

                    $user = $em->getRepository('AppBundle:User')->find($idUser);
                    $status = $em->getRepository('AppBundle:Status')->find($json["idStatus"]);


                    if($user != null)
                    {
                        if($status != null)
                        {

                            $personal = $user->getPersonal();
                            $personal->setDocument($json["document"]);
                            $personal->setNationality($json["nationality"]);
                            $personal->setName($json["name"]);
                            $personal->setLastname($json["lastname"]);
                            $personal->setSecondName($json["secondName"]);
                            $personal->setSecondLastname($json["secondLastname"]);

                            $user->setUsername($json["username"]);
                            $user->setSalt(md5(time()));
                            $encoder = $this->get('security.encoder_factory')->getEncoder($user);
                            $passwordCodificado = $encoder->encodePassword($json['password'],$user->getSalt());
                            $user->setPassword($passwordCodificado);
                            $user->setRoles($json["role"]);
                            $user->setStatus($status);
                            $user->setPersonal($personal);
                            $em->persist($user);
                            $em->flush();

                        }
                        else
                        {
                            $view = $this->view(array("message"=>"Error, the status or role don't exists"), 409);
                            return $this->handleView($view);
                        }
                    }
                    else
                    {
                        $view = $this->view(array("message"=>"Error, the User don't exists"), 409);
                        return $this->handleView($view);
                    }

                    //return new Response('The user was successfully edited', Response::HTTP_ACCEPTED);
                    $view = $this->view($user, 202);
                    return $this->handleView($view);
                }
            }
            catch (Exception $ex)
            {
                $view = $this->view(array("message"=>"Generic Error, the user was not edited"), 409);
                return $this->handleView($view);
            }
        }
        $view = $this->view(array("message"=>"Generic Error, bad json the user was not edited"), 409);
        return $this->handleView($view);
    }
}