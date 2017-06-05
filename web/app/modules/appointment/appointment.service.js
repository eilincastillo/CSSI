(function () {

    'use strict';

    angular.module('cssi.services.appointment').service('AppointmentService', ['$q', 'AppointmentFactory', 'ValidateService', AppointmentService]);

    function AppointmentService($q, AppointmentFactory, ValidateService)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.validate = validate;
        this.getAccompaniedOptions = getAccompaniedOptions;
        this.getHomeVisitOptions = getHomeVisitOptions;
        this.getPercentageAidOptions = getPercentageAidOptions;


        function getAll(patientId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            AppointmentFactory.getAll(patientId)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function getAccompaniedOptions()
        {
            var accompaniedList = [];

            accompaniedList.push({ id: 'true', name: 'Si'});
            accompaniedList.push({ id: 'false', name:'No'});

            return accompaniedList;
        }

        function getHomeVisitOptions()
        {
            var homeVisitList = [];

            homeVisitList.push({ id: 'true', name: 'Si'});
            homeVisitList.push({ id: 'false', name:'No'});

            return homeVisitList;
        }

        function getPercentageAidOptions()
        {
            var percentageAidList = [];
            var i;
            for (i = 1; i <=100; i++) {
                percentageAidList.push({ id: i, name: i});
            }

            return percentageAidList;
        }

        function get(appointmentId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            AppointmentFactory.get(appointmentId)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function validate(step)
        {
            var result = false;
            switch(step)
            {
                case 1:
                    result = validateFirstStep();
                    break;
                case 2:
                    result = validateSecondStep();
                    break;
                case 3:
                    result = validateThirdStep();
                    break;
                case 4:
                    result = validateAppoinment();
                    break;
            }

            return result;
        }

        function validateFirstStep()
        {
            var result = false;

            var referredToByInput = document.getElementById('referredToBy');
            var selectInput = document.getElementById('accompanied');

            if(ValidateService.validateNotEmpty(referredToByInput)
                && ValidateService.validateSelection(selectInput)
                && ValidateService.validateText(referredToByInput))
            {
                result = true;
            }

            return result;
        }

        function validateSecondStep()
        {
            var result = false;

            var reasonAppointmentInput = document.getElementById('reasonAppointment');
            var expectationsPatientInput = document.getElementById('expectationsPatient');

            if(ValidateService.validateNotEmpty(reasonAppointmentInput)
                && ValidateService.validateNotEmpty(expectationsPatientInput)
                && ValidateService.validateText(reasonAppointmentInput)
                && ValidateService.validateText(expectationsPatientInput))
            {
                result = true;
            }
            return result;
        }

        function validateThirdStep()
        {
            var result = false;

            var resultInput = document.getElementById('result');
            var homeVisitSelectInput = document.getElementById('homeVisitList');
            var doctorSelectInput = document.getElementById('doctorList');
            var observationsInput = document.getElementById('observations');

            if(ValidateService.validateNotEmpty(resultInput)
                && ValidateService.validateNotEmpty(observationsInput)
                && ValidateService.validateText(resultInput)
                && ValidateService.validateSelection(homeVisitSelectInput)
                && ValidateService.validateSelection(doctorSelectInput)
                && ValidateService.validateText(observationsInput))
            {
                result = true;
            }
            return result;
        }

        function validateAppoinment()
        {
            var result = false;

            var priceInput = document.getElementById('price');
            var percentageAidSelectInput = document.getElementById('percentageAidList');

            if(ValidateService.validateNotEmpty(priceInput)
                && ValidateService.validateNumber(priceInput)
                && ValidateService.validateSelection(percentageAidSelectInput))
            {
                result = true;
            }
            return result;
        }


        function add(appointment)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedAppointment =
                {
                    referredToBy: appointment.referredToBy,
                    accompanied: appointment.accompanied,
                    reasonAppointment: appointment.reasonAppointment,
                    expectationsPatient: appointment.expectationsPatient,
                    result: appointment.result,
                    homeVisit: appointment.homeVisit.id,
                    doctor: appointment.doctor.id,
                    percentageAid: appointment.percentageAid.id,
                    observations: appointment.observations,
                    observations: appointment.observations,
                    observations: appointment.observations,
                    price: appointment.price
                };

            AppointmentFactory.add(addedAppointment)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

    }

})();