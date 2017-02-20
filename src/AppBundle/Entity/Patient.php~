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
     * @ORM\Column(name="accompanied", type="string", length=255)
     */
    private $accompanied;

    /**
     * @var string
     *
     * @ORM\Column(name="document", type="string", length=255, nullable=true)
     */
    private $document;

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
     * @ORM\Column(name="homeVisit", type="string", length=255)
     */
    private $homeVisit;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Place")
     * @ORM\JoinColumn(name="place", referencedColumnName="id")
     **/
    private $place;

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
     * @return string
     */
    public function getPlace()
    {
        return array(0 => $this->place);
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
     * Set accompanied
     *
     * @param string $accompanied
     *
     * @return Patient
     */
    public function setAccompanied($accompanied)
    {
        $this->accompanied = $accompanied;

        return $this;
    }

    /**
     * Get accompanied
     *
     * @return string
     */
    public function getAccompanied()
    {
        return $this->accompanied;
    }

    /**
     * Set document
     *
     * @param string $document
     *
     * @return Patient
     */
    public function setDocument($document)
    {
        $this->document = $document;

        return $this;
    }

    /**
     * Get document
     *
     * @return string
     */
    public function getDocument()
    {
        return $this->document;
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
     * Set homeVisit
     *
     * @param string $homeVisit
     *
     * @return Patient
     */
    public function setHomeVisit($homeVisit)
    {
        $this->homeVisit = $homeVisit;

        return $this;
    }

    /**
     * Get homeVisit
     *
     * @return string
     */
    public function getHomeVisit()
    {
        return $this->homeVisit;
    }
}
