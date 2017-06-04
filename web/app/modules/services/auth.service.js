(function ()
{
    'use strict';

    angular.module('cssi.services.auth').service('AuthService', ['$state', '$q', '$rootScope', 'AUTH', AuthService]);

    function AuthService($state, $q, $rootScope, AUTH)
    {
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
            $rootScope.storage.setItem('token', token);
        }

        function isAuthenticated()
        {
            var result = false;

            if($rootScope.storage.getItem('token') !== undefined
                && $rootScope.storage.getItem('token') !== null
                && $rootScope.storage.getItem('token') !== '')
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
                return AUTH.concat($rootScope.storage.getItem('token'));
            }
            else
            {
                redirectLogin();
            }
        }




    }

})();