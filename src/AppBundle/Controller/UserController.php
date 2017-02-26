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
     * Get user by id
     *
     * @return mixed
     *
     * @Get("/{idUser}")
     */
    public function getUserAction()
    {

    }


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

                    $status = $em->getRepository('AppBundle:Status')->find(1);
                    $role = $em->getRepository('AppBundle:Role')->find($json["idRole"]);

                    if ($role != null)
                    {
                        $user = new User();

                        $user->setUsername($json["username"]);
                        $user->setPassword($json["password"]);

                        $personal = new Personal();

                        $personal->setDocument($json["document"]);
                        $personal->setName($json["name"]);
                        $personal->setLastname($json["lastName"]);

                        $user->setPersonal($personal);
                        $user->setStatus($status);
                        $user->setRole($role);

                        $em->persist($user);
                        $em->flush();
                    }
                    else
                    {
                        return new Response('Error, the role don\'t exists', Response::HTTP_CONFLICT);
                    }

                    return new Response('The doctor was successfully added', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the user was not inserted', Response::HTTP_CONFLICT);
            }
        }

        return new Response('Error, the user was not inserted', Response::HTTP_CONFLICT);

    }


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
                    $role = $em->getRepository('AppBundle:Role')->find($json["idRole"]);


                    if($user != null)
                    {
                        if($status != null && $role != null)
                        {

                            $personal = $user->getPersonal();
                            $personal->setDocument($json["document"]);
                            $personal->setName($json["name"]);
                            $personal->setLastname($json["lastName"]);

                            $user->setUsername($json["username"]);
                            $user->setPassword($json["password"]);
                            $user->setRole($role);
                            $user->setStatus($status);
                            $user->setPersonal($personal);
                            $em->persist($user);
                            $em->flush();

                        }
                        else
                            return new Response('Error, the status or role don\'t exists', Response::HTTP_CONFLICT);
                    }
                    else
                        return new Response('Error, the User don\'t exists', Response::HTTP_CONFLICT);

                    return new Response('The user was successfully edited', Response::HTTP_ACCEPTED);


                }


            }
            catch (Exception $ex)
            {
                return new Response('Error, the user was not edited', Response::HTTP_CONFLICT);
            }
        }

        return new Response('Error, the user was not edited', Response::HTTP_CONFLICT);

    }
}