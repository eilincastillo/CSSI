(function () {

    'use strict';

    angular.module('cssi.services.appointment').service('AppointmentService', ['$q', 'AppointmentFactory', 'ValidateService', AppointmentService]);

    function AppointmentService($q, AppointmentFactory, ValidateService)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.validate = validate;


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
            //VALIDACIONES DE LA PRIMERA PANTALLA
        }

        function validateSecondStep()
        {
            //VALIDACIONES DE LA SEGUNDA PANTALLA
        }

        function validateThirdStep()
        {
            //VALIDACIONES DE LA TERCERA PANTALLA
        }

        function validateAppoinment()
        {
            //VALIDACIONES DEL OBJETO COMPLETO
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