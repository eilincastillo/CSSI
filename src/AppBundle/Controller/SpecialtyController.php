<?php
/**
 * Created by PhpStorm.
 * User: eilin
 * Date: 12/2/2017
 * Time: 5:18 PM
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\Post;


class SpecialtyController extends FOSRestController
{
    /**
     * Create a job position
     * @var Request $request
     * @return mixed
     *
     * @Post("/create")
     */
    public function createAction(Request $request)
    {

    }

}