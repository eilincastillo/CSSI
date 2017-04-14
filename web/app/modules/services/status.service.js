/**
 * @description: Servicio encargado del manejo de estados en el sistema
 */
(function()
{
    'use strict';

    angular.module('cssi.services.status').service('StatusService', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', StatusService]);

    function StatusService($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.STATUS + ':statusId';
        var request = $resource(url, { statusId: '@id'},
            {
                'query': { method: 'GET', isArray: true}
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
            //TODO: tratar datos

            return promise;
        }


    }


})();