(function ()
{
    'use strict';

    angular.module('cssi.factories.appointment').factory('AppointmentFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', AppointmentFactory]);

    function AppointmentFactory($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.APPOINTMENT + ':appointmentId';
        var request = $resource(url, { appointmentId: '@id' },
            {
                'query':  {method:'GET', isArray:true},
                'update': {method: 'PUT'}
            },{
                stripTrailingSlashes: false
            });


        var factory =
            {
                getAll: getAllAppointments,
                get: getAppointment,
                add: addAppointment
            };

        return factory;

        function getAllAppointments(patientId)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var url = CSSIAPI.URL + RESOURCE.PATIENT + ':patientId';
            var requestAll = $resource(url, { patientId: '@id' },
                {
                    'query':  {method:'GET', isArray:true}
                },{
                    stripTrailingSlashes: false
                });


            requestAll.get({patientId: patientId},
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(e)
                {
                    defered.reject();
                });

            return promise;
        }

        function getAppointment(appointmentId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({appointmentId: appointmentId},
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });
            //TODO: tratar datos

            return promise;
        }


        function addAppointment(appointment)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(appointment,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });
            //TODO: tratar datos

            return promise;
        }
    }

})();
