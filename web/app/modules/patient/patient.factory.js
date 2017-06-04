(function ()
{
    'use strict';

    angular.module('cssi.factories.patient').factory('PatientFactory', ['$q', '$rootScope', '$resource', 'CSSIAPI', 'RESOURCE', 'AUTH', PatientFactory]);

    function PatientFactory($q, $rootScope, $resource, CSSIAPI, RESOURCE, AUTH)
    {
        var url = CSSIAPI.URL + RESOURCE.PATIENT + ':patientId';
        var auth = AUTH.concat($rootScope.token);
        var request = $resource(url, { patientId: '@id' },
            {
                'save': {method: 'POST', headers: { 'Authorization' : auth }},
                'get': { method: 'GET', headers: { 'Authorization' : auth }},
                'query':  {method:'GET', isArray:true, headers: { 'Authorization' : auth }},
                'update': {method: 'PUT', headers: { 'Authorization' : auth }}
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

            return promise;
        }
    }

})();