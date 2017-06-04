(function ()
{
    'use strict';

    angular.module('cssi.services.auth').service('AuthService', ['$state', '$q', '$rootScope', 'AUTH', AuthService]);

    function AuthService($state, $q, $rootScope, AUTH)
    {
        var storage = sessionStorage;

        this.saveToken = save;
        this.getToken = getToken;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams)
        {
            console.log(toState.name);
            console.log(event);
            console.log(fromState.name);
        });


        function save(token)
        {
            storage.setItem('token', token);
        }

        function isAuthenticated()
        {
            var result = false;

            if(storage.getItem('token') !== undefined
                && storage.getItem('token') !== null
                && storage.getItem('token') !== '')
                {
                    result = true;
                }

            return result;
        }

        function redirectLogin()
        {
            $state.go('menu.login');
        }

        function getToken()
        {

            if(isAuthenticated())
            {
                return AUTH.concat(storage.getItem('token'));
            }
            else
            {
                redirectLogin();
            }
        }




    }

})();