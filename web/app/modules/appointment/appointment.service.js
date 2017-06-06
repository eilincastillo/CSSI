(function () {

    'use strict';

    angular.module('cssi.services.appointment').service('AppointmentService', ['$q', 'AppointmentFactory', 'ValidateService', AppointmentService]);

    function AppointmentService($q, AppointmentFactory, ValidateService)
    {
        var storage = sessionStorage;

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


        function get(appointmentId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            AppointmentFactory.get(appointmentId)
                .then(function (data)
                {
                    data.document = data.personal.nationality.concat('-')
                                                                .concat(data.personal.document);
                    data.name = data.personal.firstLastname.concat(' ')
                                                            .concat(data.personal.secondLastname)
                                                            .concat(', ')
                                                            .concat(data.personal.firstName)
                                                            .concat(' ')
                                                            .concat(data.personal.secondName);
                    delete data.personal;
                    data.user = data.user.firstLastname.concat(', ')
                                                        .concat(data.user.firstName);
                    data.doctor = 'Dr(a) '.concat(data.doctor.lastnameDoctor)
                                            .concat(', ')
                                            .concat(data.doctor.nameDoctor)
                                            .concat(' - ')
                                            .concat(data.doctor.specialtyDoctor);
                    data.date = new Date(data.date).toISOString().split('T')[0];
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
            var accompaniedInput = document.getElementById('accompanied');

            if(ValidateService.validateNotEmpty(referredToByInput)
                && ValidateService.validateText(referredToByInput)
                && ValidateService.validateSelection(accompaniedInput))
            {
                storage.setItem('referredToBy', referredToByInput.value);
                storage.setItem('accompanied', accompaniedInput.value);

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
                storage.setItem('reasonAppointment', reasonAppointment.value);
                storage.setItem('expectationsPatient', expectationsPatientInput.value);

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
                storage.setItem('result', resultInput.value);
                storage.setItem('observations', observationsInput.value);
                storage.setItem('homeVisit', homeVisitSelectInput.value);
                storage.setItem('doctor', doctorSelectInput.value);

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
                storage.setItem('price', priceInput.value);
                storage.setItem('percentageAid', percentageAidSelectInput.value);

                result = true;
            }

            return result;
        }


        function add(patientId)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedAppointment =
                {
                    referredToBy: storage.getItem('referredToBy'),
                    accompanied: storage.getItem('accompanied'),
                    reasonAppointment: storage.getItem('reasonAppointment'),
                    expectationsPatient: storage.getItem('expectationsPatient'),
                    result: storage.getItem('result'),
                    homeVisit: storage.getItem('homeVisit'),
                    idDoctor: parseInt(storage.getItem('doctor')),
                    percentageAid: storage.getItem('percentageAid'),
                    observations: storage.getItem('observations'),
                    price: storage.getItem('price'),
                    idPatient: parseInt(patientId)
                };

            AppointmentFactory.add(addedAppointment)
                .then(function (data)
                {

                    storage.removeItem('referredToBy');
                    storage.removeItem('accompanied');
                    storage.removeItem('reasonAppointment');
                    storage.removeItem('expectationsPatient');
                    storage.removeItem('result');
                    storage.removeItem('homeVisit');
                    storage.removeItem('doctor');
                    storage.removeItem('percentageAid');
                    storage.removeItem('observations');
                    storage.removeItem('price');

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
            return AppointmentFactory.getAccompanied();
        }

        function getHomeVisitOptions()
        {
            return AppointmentFactory.getHomeVisit();
        }

        function getPercentageAidOptions()
        {
            return AppointmentFactory.getPercentageAid();
        }

    }

})();