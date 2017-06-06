(function ()
{
    'use strict';

    angular.module('cssi.controllers.patient').controller('PatientCtrl', ['$state', '$stateParams', 'PatientService', 'StatusService', PatientCtrl]);

    function PatientCtrl($state, $stateParams, PatientService, StatusService)
    {
        var self = this;
        self.patientList = self.genderList = self.employeeList = self.scholarshipList = self.stateList = self.districtList = self.nationalityList = self.savingCapacityList = [];
        self.enabledOccupation = self.enabledScholarship = true;


        self.init = function()
        {
            var step = $stateParams.patientStep;

            if( isEmpty(step) && step > 0 && step < 5)
            {
                var currentView = '../app/views/patient/add/patient-add-' + step + '.html';
                self.includePage = currentView;
            }

        }

        self.saveFirstStep = function()
        {
            var id =  $stateParams.patientId;
            if(PatientService.validate(1))
            {
            $state.go('menu.patient-add', { patientId: id, patientStep: 2 })
            }
        }

        self.saveSecondStep = function()
        {
            var id =  $stateParams.patientId;
            if(PatientService.validate(2))
            {
                $state.go('menu.patient-add', { patientId: id, patientStep: 3 })
            }
        }

        self.saveThirdStep = function()
        {
            var id =  $stateParams.patientId;
            if(PatientService.validate(3))
            {
                $state.go('menu.patient-add', { patientId: id, patientStep: 4 })
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

        }

        self.updatePatient = function (patient)
        {
            var urlParameter = $stateParams.patientId;

            if(urlParameter && PatientService.validate(1) && PatientService.validate(2) && PatientService.validate(3)
                && PatientService.validate(4))
            {
                PatientService.update(urlParameter)
                    .then(function ()
                    {
                        $state.go('menu.patient');
                    })
                    .catch(function (e)
                    {

                    });
            }
        }

        self.loadEmployeeOptions = function()
        {
            self.employeeList = PatientService.getEmployee();
        }

        self.loadGenderOptions = function()
        {
            self.genderList = PatientService.getGender();
        }

        self.loadScholarshipOptions = function()
        {
            self.scholarshipList = PatientService.getScholarship();
        }

        self.loadNationalities = function()
        {
            self.nationalityList = PatientService.getNationalities();
        }

        self.loadsavingCapacityOptions = function()
        {
            self.savingCapacityList = PatientService.getsavingCapacityOptions();
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

        self.loadStates = function()
        {
            PatientService.getState()
                .then(function (data)
                {
                    self.stateList = data;
                })
                .catch(function (e)
                {

                });
        }



    }
})();