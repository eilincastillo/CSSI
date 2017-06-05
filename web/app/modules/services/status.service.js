/**
 * @description: Servicio encargado del manejo de estados en el sistema
 */
(function()
{
    'use strict';

    angular.module('cssi.services.status').service('StatusService', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', 'AuthService', StatusService]);

    function StatusService($q, $resource, CSSIAPI, RESOURCE, AuthService)
    {
        var url = CSSIAPI.URL + RESOURCE.STATUS + ':statusId';
        var auth = AuthService.getToken();
        var request = $resource(url, { statusId: '@id'},
            {
                'get': { method: 'GET', headers: { 'Authorization' : auth }},
                'query': { method: 'GET', isArray: true, headers: { 'Authorization' : auth }}
            },
            {
                stripTrailingSlashes: false
            });

        this.getAll = getAllStatus;
        this.get = getStatus;

        function getAllStatus()
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

        function getStatus(statusId)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.get({statusId: statusId},
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