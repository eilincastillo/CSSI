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

        self.init = function()
        {
            var step = $stateParams.appointmentStep;

            if( isEmpty(step) && step > 0 && step < 5)
            {
                var currentView = '../app/views/appointment/add/appointment-add-' + step + '.html';
                self.includePage = currentView;
            }

        }

        function isEmpty(step)
        {
            var result = false;

            if(step != null && step != undefined && step != '')
                result = true;

            return result;
        }


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