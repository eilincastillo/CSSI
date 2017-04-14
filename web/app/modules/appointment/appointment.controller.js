(function ()
{

    'use strict';

    angular.module('cssi.controllers.appointment').controller('AppointmentCtrl', ['$stateParams', 'AppointmentService', AppointmentCtrl]);

    function AppointmentCtrl($stateParams, AppointmentService)
    {
        var self = this;
        self.patient = {};
        self.appointment = {};
        self.appointmentId;


        self.getAppointmentList = function ()
        {
            var urlParameter = $stateParams.patientId;

            AppointmentService.getAll(urlParameter)
                .then(function (data)
                {
                    self.patient = data;
                })
                .catch(function(e)
                {
                    console.log(e);
                });
        }

        self.addAppointment = function (appointment)
        {
            AppointmentService.add(appointment)
                .then(function (data)
                {
                    $state.go('menu.appointment');
                })
                .catch(function (e)
                {

                });
        }

        self.getParameter = function ()
        {

            var urlParameter = $stateParams.appointmentId;

            if(urlParameter)
            {
                AppointmentService.get(urlParameter)
                    .then(function (data)
                    {
                        self.appointment = data;

                    })
                    .catch(function (e)
                    {

                    });

            }
            else
            {
                $state.go('menu.appointment');
            }
        }

    }

})();