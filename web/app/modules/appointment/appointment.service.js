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

        function validate(appointment)
        {
            var result = false;

            var nameInput = document.getElementById('name');
            var lastnameInput = document.getElementById('lastname');
            var selectInput = document.getElementById('specialtyList');

            if(ValidateService.validateNotEmpty(nameInput)
                && ValidateService.validateNotEmpty(lastnameInput)
                && ValidateService.validateSelection(selectInput)
                && ValidateService.validateText(nameInput)
                && ValidateService.validateText(lastnameInput))
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