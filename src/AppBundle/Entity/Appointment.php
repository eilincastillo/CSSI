<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Appointment
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="AppBundle\Repository\AppointmentRepository")
 */
class Appointment
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
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @var string
     *
     * @ORM\Column(name="accompanied", type="string", length=255)
     */
    private $accompanied;

    /**
     * @var string
     *
     * @ORM\Column(name="homeVisit", type="string", length=255)
     */
    private $homeVisit;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float")
     */
    private $price;

    /**
     * @var integer
     *
     * @ORM\Column(name="percentageAid", type="integer")
     */
    private $percentageAid;

    /**
     * @var string
     *
     * @ORM\Column(name="observations", type="string", length=255, nullable=true)
     */
    private $observations;

    /**
     * @var string
     *
     * @ORM\Column(name="reasonAppointment", type="string", length=255, nullable=true)
     */
    private $reasonAppointment;

    /**
     * @var string
     *
     * @ORM\Column(name="result", type="string", length=255, nullable=true)
     */
    private $result;

    /**
     * @var string
     *
     * @ORM\Column(name="expectationsPatient", type="string", length=255, nullable=true)
     */
    private $expectationsPatient;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Patient")
     * @ORM\JoinColumn(name="patient", referencedColumnName="id")
     **/
    private $patient;

    /**
     *
     * @ORM\ManyToOne(targetEntity="Status")
     * @ORM\JoinColumn(name="status", referencedColumnName="id")
     **/
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="Doctor")
     * @ORM\JoinColumn(name="doctor", referencedColumnName="id")
     **/
    private $doctor;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user", referencedColumnName="id")
     **/
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="referredToBy", type="string", length=255, nullable=true)
     */
    private $referredToBy;

    /**
     * Set patient
     *
     * @param string $patient
     *
     * @return Appointment
     */
    public function setPatient($patient)
    {
        $this->patient = $patient;

        return $this;
    }

    /**
     * Get patient
     *
     * @return string
     */
    public function getPatient()
    {
        return $this->patient;
    }

    /**
     * Set status
     *
     * @param string $status
     *
     * @return Appointment
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string
     */
    public function getStatus()
    {
        return array(0 => $this->status);
    }

    /**
     * Set doctos
     *
     * @param string $doctor
     *
     * @return Appointment
     */
    public function setDoctor($doctor)
    {
        $this->doctor = $doctor;

        return $this;
    }

    /**
     * Get doctor
     *
     * @return string
     */
    public function getDoctor()
    {
        return $this->doctor;
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
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Appointment
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set price
     *
     * @param float $price
     *
     * @return Appointment
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return float
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set percentageAid
     *
     * @param integer $percentageAid
     *
     * @return Appointment
     */
    public function setPercentageAid($percentageAid)
    {
        $this->percentageAid = $percentageAid;

        return $this;
    }

    /**
     * Get percentageAid
     *
     * @return integer
     */
    public function getPercentageAid()
    {
        return $this->percentageAid;
    }

    /**
     * Set observations
     *
     * @param string $observations
     *
     * @return Appointment
     */
    public function setObservations($observations)
    {
        $this->observations = $observations;

        return $this;
    }

    /**
     * Get observations
     *
     * @return string
     */
    public function getObservations()
    {
        return $this->observations;
    }

    /**
     * Set reasonAppointment
     *
     * @param string $reasonAppointment
     *
     * @return Appointment
     */
    public function setReasonAppointment($reasonAppointment)
    {
        $this->reasonAppointment = $reasonAppointment;

        return $this;
    }

    /**
     * Get reasonAppointment
     *
     * @return string
     */
    public function getReasonAppointment()
    {
        return $this->reasonAppointment;
    }

    /**
     * Set result
     *
     * @param string $result
     *
     * @return Appointment
     */
    public function setResult($result)
    {
        $this->result = $result;

        return $this;
    }

    /**
     * Get result
     *
     * @return string
     */
    public function getResult()
    {
        return $this->result;
    }

    /**
     * Set expectationsPatient
     *
     * @param string $expectationsPatient
     *
     * @return Appointment
     */
    public function setExpectationsPatient($expectationsPatient)
    {
        $this->expectationsPatient = $expectationsPatient;

        return $this;
    }

    /**
     * Get expectationsPatient
     *
     * @return string
     */
    public function getExpectationsPatient()
    {
        return $this->expectationsPatient;
    }

    /**
     * @return string
     */
    public function getAccompanied()
    {
        return $this->accompanied;
    }

    /**
     * @param string $accompanied
     */
    public function setAccompanied($accompanied)
    {
        $this->accompanied = $accompanied;
    }

    /**
     * @return string
     */
    public function getHomeVisit()
    {
        return $this->homeVisit;
    }

    /**
     * @param string $homeVisit
     */
    public function setHomeVisit($homeVisit)
    {
        $this->homeVisit = $homeVisit;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getReferredToBy()
    {
        return $this->referredToBy;
    }

    /**
     * @param string $referredToBy
     */
    public function setReferredToBy($referredToBy)
    {
        $this->referredToByreferredToBy = $referredToBy;
    }


}
