(function ()
{

    'use strict';

    angular.module('cssi.controllers.doctor').controller('DoctorCtrl', ['StatusService', 'SpecialtyService', 'DoctorService', DoctorCtrl]);

    function DoctorCtrl(DoctorService)
    {
        var self = this;
        self.doctorList = self.specialtyList = self.statusList = [];
        self.doctor = {};
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
            DoctorService.add(doctor)
                .then(function (data)
                {
                    $state.go('menu.doctor');
                })
                .catch(function (e)
                {

                });
        }

        self.getParameter = function ()
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

            }
            else
            {
                $state.go('menu.doctor');
            }
        }

        self.updateDoctor = function (doctor)
        {
            var urlParameter = $stateParams.doctorId;

            if(urlParameter)
            {
                DoctorService.update(urlParameter, doctor)
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
    }

})();