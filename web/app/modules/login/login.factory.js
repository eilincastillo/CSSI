(function ()
{
    'use strict';

    angular.module('cssi.factories.login').factory('LoginFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', 'AuthService', LoginFactory]);

    function LoginFactory($q, $resource, CSSIAPI, RESOURCE, AuthService)
    {
        var url = CSSIAPI.URL + RESOURCE.LOGIN + ':username';
        var auth = AuthService.getToken();
        var request = $resource(url, { username: '@user' },
            {
                'get': { method: 'GET', headers: { 'Authorization' : auth }}
            },{
                stripTrailingSlashes: false
            });

        var factory =
        {
            generateToken: login,
            getUser: getUser
        };

        return factory;

        function login(user)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(user,
                function success(data)
                {
                    AuthService.saveToken(data.token);
                    defered.resolve();
                },
                function error(err)
                {
                    defered.reject();
                });

            return promise;
        }

        function getUser(username)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.get({ username: username },
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
