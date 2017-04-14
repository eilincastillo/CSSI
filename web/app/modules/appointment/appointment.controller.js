(function ()
{

    'use strict';

    angular.module('cssi.controllers.appointment').controller('AppointmentCtrl', ['$stateParams', 'AppointmentService', AppointmentCtrl]);

    function AppointmentCtrl($stateParams, AppointmentService)
    {
        var self = this;
        self.appointmentList = [];
        self.appointment = {};
        self.appointmentId;


        self.getAppointmentList = function ()
        {
            AppointmentService.getAll()
                .then(function (data)
                {
                    self.appointmentList = data;
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