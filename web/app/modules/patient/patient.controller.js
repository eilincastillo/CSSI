(function ()
{
    'use strict';

    angular.module('cssi.controllers.patient').controller('PatientCtrl', ['$state', '$stateParams', 'PatientService', 'StatusService', PatientCtrl]);

    function PatientCtrl($state, $stateParams, PatientService, StatusService)
    {
        var self = this;
        self.patientList = self.genderList = self.employeeList = self.scholarshipList = self.stateList = self.districtList = self.nationalityList = [];
        self.enabledOccupation = self.enabledScholarship = true;
        self.occupationStep;
        self.contactStep;
        self.personalStep = true;
        self.nationalityList = [];
        self.genderList = [];


        self.init = function()
        {
            var step = $stateParams.patientStep;

            if( isEmpty(step) && step > 0 && step < 5)
            {
                var currentView = '../app/views/patient/add/patient-add-' + step + '.html';
                self.includePage = currentView;
            }

        }

        self.saveFirstStep = function(patient)
        {
            // if(AppointmentService.validate(1))
            // {
            $state.go('menu.appointment-add', { patientId: id, appointmentStep: 2 })
            // }
        }

        self.saveSecondStep = function()
        {
            if(AppointmentService.validate(2))
            {
                $state.go('menu.appointment-add({ patientId : ctrl.patient.id, appointmentStep: 3 })');
            }
        }

        self.saveThirdStep = function()
        {
            if(AppointmentService.validate(3))
            {
                $state.go('menu.appointment-add({ patientId : ctrl.patient.id, appointmentStep: 4 })');
            }
        }

        function isEmpty(step)
        {
            var result = false;

            if(step != null && step != undefined && step != '')
                result = true;

            return result;
        }


        self.getPatientList = function ()
        {
            PatientService.getAll()
                .then(function (data)
                {
                    self.patientList = data;
                })
                .catch(function(e)
                {
                    console.log(e);
                });
        }

        self.nationalityList = PatientService.getNationalites();
        self.genderList = PatientService.getGenders();

        self.addPatient = function (patient)
        {
            if(PatientService.validate(4))
            {
                PatientService.add(patient)
                    .then(function (data)
                    {
                        $state.go('menu.patient');
                    })
                    .catch(function (e)
                    {

                    });
            }
        }

        self.backStep = function ()
        {
            console.log('Atras');
        }

        self.nextStep = function ()
        {
            console.log('Siguiente');
        }

        self.getParameter = function (updateView)
        {
            self.occupationStep = self.contactStep = false;
            self.personalStep = true;


            if(updateView)
            {
                var urlParameter = $stateParams.patientId;


                if(urlParameter)
                {
                    PatientService.get(urlParameter)
                        .then(function (data)
                        {
                            self.patient = data;

                        })
                        .catch(function (e)
                        {

                        });

                    StatusService.getAll()
                        .then(function (data)
                        {
                            self.statusList = data;
                        })
                        .catch(function (e)
                        {

                        });

                }
                else
                {
                    $state.go('menu.patient');
                }

            }

            PatientService.getState()
                .then(function (data)
                {
                    self.stateList = data;
                })
                .catch(function (e)
                {

                });

            self.genderList = PatientService.getGender();
            self.employeeList = PatientService.getEmployee();
            self.scholarshipList = PatientService.getScholarship();

        }

        self.updatePatient = function (patient)
        {
            var urlParameter = $stateParams.patientId;

            if(urlParameter)
            {
                PatientService.update(patient)
                    .then(function ()
                    {
                        $state.go('menu.patient');
                    })
                    .catch(function (e)
                    {

                    });
            }
            else
            {
                $state.go('menu.patient');
            }
        }

        self.getNationalities = function()
        {
            var nationalities = PatientService.getNationalities();

            self.nationalityList = nationalities;
        }


        self.loadDistricts = function (place)
        {
            PatientService.getDistricts(place.id)
                .then(function (data)
                {
                    self.districtList = data;
                })
                .catch(function (e)
                {

                });
        }

        self.toggleOccupation = function (occupation)
        {
            if(occupation.id == 1)
                self.enabledOccupation = false;
            else
                self.enabledOccupation = true;
        }

        self.toggleScholarship = function(scholarship)
        {
            if(scholarship.id == 5)
                self.enabledScholarship = false;
            else
                self.enabledScholarship = true;
        }


    }
})();