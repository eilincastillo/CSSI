(function ()
{

    'use strict';

    angular.module('cssi.controllers.appointment').controller('AppointmentCtrl', ['$state', '$stateParams', 'AppointmentService', 'DoctorService', AppointmentCtrl]);

    function AppointmentCtrl($state, $stateParams, AppointmentService, DoctorService)
    {
        var self = this;
        self.patient = {};
        self.appointment = self.accompaniedList = self.homeVisitList = self.percentageAidList = self.doctorList ={};
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

        DoctorService.getAll()
            .then(function (data)
            {
                self.doctorList = data;
            })
            .catch(function (e)
            {

            });

        self.saveFirstStep = function()
        {
            var id =  $stateParams.patientId;
            if(AppointmentService.validate(1))
            {

                $state.go('menu.appointment-add', { patientId: id, appointmentStep: 2 })
             }
        }

        self.saveSecondStep = function()
        {
            var id =  $stateParams.patientId;

            if(AppointmentService.validate(2))
            {
                $state.go('menu.appointment-add', { patientId: id, appointmentStep: 3 });
            }
        }

        self.saveThirdStep = function()
        {
            var id =  $stateParams.patientId;
            if(AppointmentService.validate(3))
            {
                $state.go('menu.appointment-add', { patientId: id, appointmentStep: 4 });
            }
        }


        function isEmpty(step)
        {
            var result = false;

            if(step != null && step != undefined && step != '')
                result = true;

            return result;
        }

        self.accompaniedList = AppointmentService.getAccompaniedOptions();
        self.homeVisitList = AppointmentService.getHomeVisitOptions();
        self.percentageAidList = AppointmentService.getPercentageAidOptions();


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