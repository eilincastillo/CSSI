(function () 
{

    'use strict';

    angular.module('cssi.services.login').service('LoginService', ['$q', 'AuthService', 'LoginFactory', LoginService]);

    function LoginService($q, AuthService, LoginFactory)
    {
        this.login = login;
        
        function login(user)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            LoginFactory.generateToken(user)
                .then(function (token)
                {
                    AuthService.saveToken(token);
                    defered.resolve();
                })
                .catch(function (e)
                {
                    defered.reject(e);
                });

            return promise;
        }
    }

})();