(function ()
{
    'use strict';

    angular.module('cssi.controllers.patient').controller('PatientCtrl', ['$state', '$stateParams', 'PatientService', PatientCtrl]);

    function PatientCtrl($state, $stateParams, PatientService)
    {
        var self = this;
        self.patientList = self.genderList = self.employeeList = self.scholarshipList = self.stateList = self.districtList = [];
        self.enabledOccupation = self.enabledScholarship = true;
        self.occupationStep;
        self.contactStep;
        self.personalStep = true;

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
            PatientService.add(patient)
                .then(function (data)
                {
                    $state.go('menu.patient');
                })
                .catch(function (e)
                {

                });
        }

        self.backStep = function ()
        {
            if(self.contactStep)
            {
                self.personalStep = true;
                self.contactStep = false;
                self.occupationStep = false;
            }
            else if(self.occupationStep)
            {
                self.personalStep = false;
                self.contactStep = true;
                self.occupationStep = false;
            }
        }

        self.nextStep = function ()
        {
            if(self.personalStep)
            {
                self.personalStep = false;
                self.contactStep = true;
                self.occupationStep = false;
            }
            else if(self.contactStep)
            {
                self.personalStep = false;
                self.contactStep = false;
                self.occupationStep = true;
            }
            else if(self.occupationStep)
            {
                self.personalStep = false;
                self.contactStep = false;
                self.occupationStep = false;
            }
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
                            self.user = data;

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