(function ()
{
    angular.module('cssi.factories.specialty').factory('SpecialtyFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', SpecialtyFactory]);

    function SpecialtyFactory($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.SPECIALTY + ':specialtyId';
        var request = $resource(url, { specialtyId: '@id' },
            {
                'query':  {method:'GET', isArray:true},
                'update': {method: 'PUT'}
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
            //TODO: tratar datos

            return promise;
        }

        function updateSpecialty(specialtyId, specialtyName)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.update({specialtyId: specialtyId}, { id: specialtyId, name: specialtyName},
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
            //TODO: tratar datos

            return promise;
        }
    }
})();