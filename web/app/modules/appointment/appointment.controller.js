(function ()
{

    'use strict';

    angular.module('cssi.controllers.appointment').controller('AppointmentCtrl', ['$state', '$stateParams', 'AppointmentService', AppointmentCtrl]);

    function AppointmentCtrl($state, $stateParams, AppointmentService)
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

        self.saveFirstStep = function()
        {
            if(AppointmentService.validate(1))
            {
                $state.go('menu.appointment-add({ patientId : ctrl.patient.id, appointmentStep: 2 })');
            }
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
            if(AppointmentService.validate(4))
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
        }

    }

})();