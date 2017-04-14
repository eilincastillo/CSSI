(function () {

    'use strict';

    angular.module('cssi.services.appointment').service('AppointmentService', ['$q', 'AppointmentFactory', AppointmentService]);

    function AppointmentService($q, AppointmentFactory)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;


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