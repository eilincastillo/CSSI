<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Patient
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PatientRepository")
 */
class Patient
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="historyNumber", type="string", length=255)
     */
    private $historyNumber;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="registrationDate", type="datetime")
     */
    private $registrationDate;



    /**
     * @var string
     *
     * @ORM\Column(name="gender", type="string", length=255)
     */
    private $gender;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="birthdate", type="datetime")
     */
    private $birthdate;

    /**
     * @var string
     *
     * @ORM\Column(name="familyDynamics", type="string", length=255, nullable=true)
     */
    private $familyDynamics;


    /**
     * @var string
     *
     * @ORM\Column(name="job", type="string", length=255)
     */
    private $job;

    /**
     * @var string
     *
     * @ORM\Column(name="jobDetail", type="string", length=255, nullable=true)
     */
    private $jobDetail;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Place")
     * @ORM\JoinColumn(name="place", referencedColumnName="id")
     **/
    private $place;

    /**
     *
     * @ORM\OneToOne(targetEntity="Personal", cascade={"all"})
     * @ORM\JoinColumn(name="personal", referencedColumnName="id")
     **/
    private $personal;

    /**
     * Set personal
     *
     * @param string $personal
     *
     * @return Patient
     */
    public function setPersonal($personal)
    {
        $this->personal = $personal;

        return $this;
    }

    /**
     * Get personal
     *
     * @return personal
     */
    public function getPersonal()
    {
        return $this->personal;
    }

    /**
     * Set place
     *
     * @param string $place
     *
     * @return Patient
     */
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }

    /**
     * Get place
     *
     * @return place
     */
    public function getPlace()
    {
        return $this->place;
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get job
     * @return string
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Set job
     *
     * @param string $job
     *
     * @return Patient
     */
    public function setJob($job)
    {
        $this->job = $job;
    }

    /**
     * Get job detail
     * @return string
     */
    public function getJobDetail()
    {
        return $this->jobDetail;
    }

    /**
     * Set job detail
     * @param string $jobDetail
     * @return Patient
     */
    public function setJobDetail($jobDetail)
    {
        $this->jobDetail = $jobDetail;
    }



    /**
     * Set historyNumber
     *
     * @param string $historyNumber
     *
     * @return Patient
     */
    public function setHistoryNumber($historyNumber)
    {
        $this->historyNumber = $historyNumber;

        return $this;
    }

    /**
     * Get historyNumber
     *
     * @return string
     */
    public function getHistoryNumber()
    {
        return $this->historyNumber;
    }

    /**
     * Set registrationDate
     *
     * @param \DateTime $registrationDate
     *
     * @return Patient
     */
    public function setRegistrationDate($registrationDate)
    {
        $this->registrationDate = $registrationDate;

        return $this;
    }

    /**
     * Get registrationDate
     *
     * @return \DateTime
     */
    public function getRegistrationDate()
    {
        return $this->registrationDate;
    }

    /**
     * Set document
     *
     * @param string $gender
     *
     * @return Patient
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return string
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set birthdate
     *
     * @param \DateTime $birthdate
     *
     * @return Patient
     */
    public function setBirthdate($birthdate)
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    /**
     * Get birthdate
     *
     * @return \DateTime
     */
    public function getBirthdate()
    {
        return $this->birthdate;
    }

    /**
     * Set familyDynamics
     *
     * @param string $familyDynamics
     *
     * @return Patient
     */
    public function setFamilyDynamics($familyDynamics)
    {
        $this->familyDynamics = $familyDynamics;

        return $this;
    }

    /**
     * Get familyDynamics
     *
     * @return string
     */
    public function getFamilyDynamics()
    {
        return $this->familyDynamics;
    }

}
