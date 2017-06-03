(function ()
{

    'use strict';

    angular.module('cssi.controllers.doctor').controller('DoctorCtrl', ['$state', '$stateParams', 'StatusService', 'SpecialtyService', 'DoctorService', DoctorCtrl]);

    function DoctorCtrl($state, $stateParams, StatusService, SpecialtyService, DoctorService)
    {
        var self = this;
        self.doctorList = self.specialtyList = self.statusList = [];
        self.doctorId;


        self.getDoctorList = function ()
        {
            DoctorService.getAll()
                .then(function (data)
                {
                    self.doctorList = data;
                })
                .catch(function(e)
                {
                    console.log(e);
                });
        }

        self.addDoctor = function (doctor)
        {
            if(DoctorService.validate(doctor))
            {
                DoctorService.add(doctor)
                    .then(function (data)
                    {
                        $state.go('menu.doctor');
                    })
                    .catch(function (e)
                    {

                    });
            }
        }

        self.getParameter = function (updateView)
        {

            if(updateView)
            {
                var urlParameter = $stateParams.doctorId;

                if(urlParameter)
                {
                    DoctorService.get(urlParameter)
                        .then(function (data)
                        {
                            self.doctor = data;

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
                    $state.go('menu.doctor');
                }
            }

            SpecialtyService.getAll()
                .then(function (data)
                {
                    self.specialtyList = data;
                })
                .catch(function (e)
                {

                });

        }

        self.updateDoctor = function (doctor)
        {
            var urlParameter = $stateParams.doctorId;

            if(urlParameter)
            {
                DoctorService.update(doctor)
                    .then(function ()
                    {
                        $state.go('menu.doctor');
                    })
                    .catch(function (e)
                    {

                    });
            }
            else
            {
                $state.go('menu.doctor');
            }
        }

        self.validateSelection = function(identifier)
        {
            var selectInput = document.getElementById(identifier);

            if(selectInput)
            {
                DoctorService.validateSelection(selectInput);
            }
        }

        self.validate = function(identifier)
        {
            var input = document.getElementById(identifier);

            if(input)
            {
                DoctorService.validateField(input);
            }
        }



    }

})();