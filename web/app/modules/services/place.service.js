/**
 * @description: Servicio encargado del manejo de lugares en el sistema
 */
(function()
{
    'use strict';

    angular.module('cssi.services.place').service('PlaceService', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', PlaceService]);

    function PlaceService($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.PLACE + ':placeId';
        var request = $resource(url, { placeId: '@id'},
            {
                'query': { method: 'GET', isArray: true}
            },
            {
                stripTrailingSlashes: false
            });

        this.getStates = getAllStates;
        this.getDistricts = getDistrictsByState;

        function getAllStates()
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

        function getDistrictsByState(placeId)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.get({placeId: placeId},
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