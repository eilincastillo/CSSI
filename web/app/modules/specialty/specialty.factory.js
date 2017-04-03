(function ()
{
    angular.module('cssi.factories.specialty').factory('SpecialtyFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', SpecialtyFactory]);

    function SpecialtyFactory($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.SPECIALTY;
        var request = $resource(url, { },
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

        function getSpecialty(doctorId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({doctorId: doctorId},
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

        function updateSpecialty()
        {

        }

        function addSpecialty()
        {

        }
    }
})();