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
     * @var string
     *
     * @ORM\Column(name="placeDetail", type="string", length=255)
     */
    private $placeDetail;

    /**
     * @var string
     *
     * @ORM\Column(name="scholarship", type="string", length=255)
     */
    private $scholarship;

    /**
     * @var string
     *
     * @ORM\Column(name="scholarshipDetail", type="string", length=255)
     */
    private $scholarshipDetail;

    /**
     * @var string
     *
     * @ORM\Column(name="occupation", type="string", length=255)
     */
    private $occupation;

    /**
     * @var string
     *
     * @ORM\Column(name="employmentInstitution", type="string", length=255)
     */
    private $employmentInstitution;

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

    /**
     * @return string
     */
    public function getPlaceDetail()
    {
        return $this->placeDetail;
    }

    /**
     * @param string $placeDetail
     */
    public function setPlaceDetail($placeDetail)
    {
        $this->placeDetail = $placeDetail;
    }

    /**
     * @return string
     */
    public function getScholarship()
    {
        return $this->scholarship;
    }

    /**
     * @param string $scholarship
     */
    public function setScholarship($scholarship)
    {
        $this->scholarship = $scholarship;
    }

    /**
     * @return string
     */
    public function getScholarshipDetail()
    {
        return $this->scholarshipDetail;
    }

    /**
     * @param string $scholarshipDetail
     */
    public function setScholarshipDetail($scholarshipDetail)
    {
        $this->scholarshipDetail = $scholarshipDetail;
    }

    /**
     * @return string
     */
    public function getOccupation()
    {
        return $this->occupation;
    }

    /**
     * @param string $occupation
     */
    public function setOccupation($occupation)
    {
        $this->occupation = $occupation;
    }

    /**
     * @return string
     */
    public function getEmploymentInstitution()
    {
        return $this->employmentInstitution;
    }

    /**
     * @param string $employmentInstitution
     */
    public function setEmploymentInstitution($employmentInstitution)
    {
        $this->employmentInstitution = $employmentInstitution;
    }



}
