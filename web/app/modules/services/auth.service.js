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

            if(isAuthenticated())
            {
                if(!isAdminUser() 
                    && toState.name !== 'menu.unauthorized'
                    && toState.name !== 'menu.patient'
                    && toState.name !== 'menu.patient-add'
                    && toState.name !== 'menu.patient-update'
                    && toState.name !== 'menu.appointment'
                    && toState.name !== 'menu.appointment-add'
                    && toState.name !== 'menu.appointment-detail'
                    && toState.name !== 'menu.report')
                    {
    
                        redirectUnauthorized();
                        event.preventDefault();                    
    
                    }
            }
            else if(toState.name !== 'menu.login')
            {
                redirectLogin();
                event.preventDefault();
            }
            
            
        });

        function save(token)
        {
            storage.setItem('token', token);
        }

        function exists(element)
        {
            var result = false;

            if(storage.getItem(element) !== undefined
                && storage.getItem(element) !== null
                && storage.getItem(element) !== '')
                {
                    result = true;
                }

            return result;
        }

        function redirectLogin()
        {
            $state.go('menu.login');
        }

        function redirectUnauthorized()
        {
            $state.go('menu.unauthorized');
        }

        function getToken()
        {

            if(isAuthenticated())
            {
                return AUTH.concat(storage.getItem('token'));
            }
        }

        function isAuthenticated()
        {
            var result = false;

            if(exists('token') 
                && exists('name')
                && exists('lastname')
                && exists('role'))
                {
                    result = true;
                }


            return result;
        }

        function isAdminUser()
        {
            var result = false;

            if(storage.getItem('role') === 'ROLE_ADMIN')
            {
                result = true;
            }

            return result;
        }





    }

})();