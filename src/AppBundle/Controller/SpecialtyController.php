<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 12/2/2017
 * Time: 5:18 PM
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Specialty;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Post;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Put;


class SpecialtyController extends FOSRestController
{
    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/specialty/
     * @apiName indexAction
     * @apiGroup Specialty
     * @apiDescription Get all Specialties.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * [
    {
    "id": 1,
    "name": "Cardiologia"
    },
    {
    "id": 2,
    "name": "Dermatologia"
    },
    {
    "id": 3,
    "name": "Pediatria"
    }
    ]
     */
    /**
     * Get all specialty
     *
     * @return mixed
     *
     * @Get("/")
     */

    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $specialty = $em->getRepository('AppBundle:Specialty')->findAll();
        return $specialty;
    }

    /**
     * ApiDoc
     * @api {get} cssi/web/app_dev.php/api/specialty/{idSpecialty}
     * @apiName getAction
     * @apiGroup Specialty
     * @apiDescription Get a Specialties.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 1,
    "name": "Cardiologia"
    }

     */

    /**
     * Get a specialty
     * @var Request $request, $idSpecialty
     * @return mixed
     *
     * @Get("/{idSpecialty}")
     */
    public function getAction($idSpecialty)
    {
        try
        {
            $em = $this->getDoctrine()->getManager();
            $specialty = $em->getRepository('AppBundle:Specialty')->find($idSpecialty);
            return $specialty;
        }
        catch (Exception $ex)
        {
            return new Response('Error, the specialty was not found',Response::HTTP_CONFLICT);
        }
    }


    /**
     * ApiDoc
     * @api {post} cssi/web/app_dev.php/api/specialty/
     * @apiName createAction
     * @apiGroup Specialty
     * @apiDescription Create a speciality.
     *
     * @apiParamExample {json} Request-Example:
     * {
     "name": "Odontologia"
      }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 4,
    "name": "Odontologia"
    }
     */

    /**
     * Create a speciality
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

                    $specialty = $em->getRepository('AppBundle:Specialty')->findByName($json["name"]);

                    if ($specialty == null)
                    {
                        $specialty = new Specialty();
                        $specialty->setName($json["name"]);

                        $em->persist($specialty);
                        $em->flush();
                    }
                    else
                        return new Response('Error, the specialty already exists',Response::HTTP_CONFLICT);


                    $view = $this->view($specialty, 202);
                    return $this->handleView($view);
                    //return new Response($specialty, Response::HTTP_ACCEPTED);

                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the specialty was not inserted',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the specialty was not inserted',Response::HTTP_CONFLICT);
    }

    /**
     * ApiDoc
     * @api {put} cssi/web/app_dev.php/api/specialty/{idSpecialty}
     * @apiName updateAction
     * @apiGroup Specialty
     * @apiDescription Edit a speciality.
     *
     * @apiParamExample {json} Request-Example:
     * {
    "name": "Odontologia"
    }
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
     * {
    "id": 4,
    "name": "Odontologia"
    }
     */

    /**
     * Edit a specialty
     * @var Request $request, $idSpecialty
     * @return mixed
     *
     * @Put("/{idSpecialty}")
     */
    public function updateAction(Request $request,$idSpecialty)
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

                    $specialty = $em->getRepository('AppBundle:Specialty')->find($idSpecialty);

                    $specialtyRepeat = $em->getRepository('AppBundle:Specialty')->findByName($json["name"]);

                    if ($specialty != null)
                    {
                        if ($specialtyRepeat==null)
                        {
                            $specialty->setName($json["name"]);
                            $em->persist($specialty);
                            $em->flush();
                        }
                        else
                            return new Response('Error, This specialty name already exists',Response::HTTP_CONFLICT);
                    }
                    else
                        return new Response('Error, the specialty don\'t exists',Response::HTTP_CONFLICT);

                    $view = $this->view($specialty, 202);
                    return $this->handleView($view);
                    //return new Response('The specialty was successfully edited', Response::HTTP_ACCEPTED);
                }
            }
            catch (Exception $ex)
            {
                return new Response('Error, the specialty was not edited',Response::HTTP_CONFLICT);
            }
        }
        return new Response('Error, the specialty was not edited',Response::HTTP_CONFLICT);
    }




}