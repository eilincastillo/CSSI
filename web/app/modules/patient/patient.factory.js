(function ()
{
    'use strict';

    angular.module('cssi.factories.patient').factory('PatientFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', PatientFactory]);

    function PatientFactory($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.PATIENT + ':patientId';
        var request = $resource(url, { patientId: '@id' },
            {
                'query':  {method:'GET', isArray:true},
                'update': {method: 'PUT'}
            },{
                stripTrailingSlashes: false
            });

        var factory =
            {
                getAll: getAllPatients,
                get: getPatient,
                update: updatePatient,
                add: addPatient
            };

        return factory;

        function getAllPatients()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.query(null,
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

        function getPatient(patientId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({patientId: patientId},
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

        function updatePatient(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.update({patientId: patient.id }, patient,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });

            return promise;
        }

        function addPatient(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(patient,
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