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
            switch(step)
            {
                case 1:
                    validateFirstStep();
                    break;
                case 2:
                    validateSecondStep();
                    break;
                case 3:
                    validateThirdStep();
                    break;
                case 4:
                    validateAppoinment();
                    break;
            }
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
            var homeVisitSelectInput = document.getElementById('homeVisit');
            var percentageAidSelectInput = document.getElementById('percentageAid');
            var observationsInput = document.getElementById('observations');

            if(ValidateService.validateNotEmpty(resultInput)
                && ValidateService.validateNotEmpty(observationsInput)
                && ValidateService.validateText(resultInput)
                && ValidateService.validateSelection(homeVisitSelectInput)
                && ValidateService.validateSelection(percentageAidSelectInput)
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
            var doctorSelectInput = document.getElementById('doctor');

            if(ValidateService.validateNotEmpty(priceInput)
                && ValidateService.validateText(priceInput)
                && ValidateService.validateSelection(doctorSelectInput))
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
                    name: appointment.name,
                    lastname: appointment.lastname,
                    idSpecialty: appointment.specialty.id
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