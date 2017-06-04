(function ()
{
    'use strict';

    angular.module('cssi.factories.specialty').factory('SpecialtyFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', 'AuthService', SpecialtyFactory]);

    function SpecialtyFactory($q, $resource, CSSIAPI, RESOURCE, AuthService)
    {
        var url = CSSIAPI.URL + RESOURCE.SPECIALTY + ':specialtyId';
        var auth = AuthService.getToken();
        var request = $resource(url, { specialtyId: '@id' },
            {
                'save': { method: 'POST', headers: { 'Authorization' : auth }},
                'get': { method: 'GET', headers: { 'Authorization' : auth }},
                'query':  {method:'GET', isArray:true, headers: { 'Authorization' : auth }},
                'update': {method: 'PUT', headers: { 'Authorization' : auth }}
            },{
                stripTrailingSlashes: false
            });


        var factory =
            {
                getAll: getAllSpecialty,
                get: getSpecialty,
                update: updateSpecialty,
                add: addSpecialty
            };

        return factory;

        function getAllSpecialty()
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

        function getSpecialty(specialtyId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({specialtyId: specialtyId},
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

        function updateSpecialty(specialty)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.update({specialtyId: specialty.id }, { name: specialty.name },
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

        function addSpecialty(specialtyName)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save({name: specialtyName},
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