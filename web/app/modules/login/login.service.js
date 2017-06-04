(function () 
{

    'use strict';

    angular.module('cssi.services.login').service('LoginService', ['$q', '$rootScope', 'LoginFactory', LoginService]);

    function LoginService($q, $rootScope, LoginFactory)
    {
        this.login = login;
        
        function login(user)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            LoginFactory.generateToken(user)
                .then(function (token)
                {
                    $rootScope.token = token;
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