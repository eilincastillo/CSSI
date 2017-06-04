(function ()
{
    'use strict';

    angular.module('cssi.factories.login').factory('LoginFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', LoginFactory]);

    function LoginFactory($q, $resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.LOGIN;
        var request = $resource(url,
            {
            },{
                stripTrailingSlashes: false
            });

        var factory =
        {
            generateToken: login
        };

        return factory;

        function login(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(doctor,
                function success(data)
                {
                    defered.resolve(data.token);
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
