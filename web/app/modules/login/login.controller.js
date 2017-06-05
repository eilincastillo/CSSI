(function ()
{
    'use strict';

    angular.module('cssi.controllers.login').controller('LoginCtrl', ['$state', 'LoginService', LoginCtrl]);

    function LoginCtrl($state, LoginService)
    {
        var self = this;
        self.user = 
        {
            username: null,
            password: null
        };

        self.login = function (user)
        {
            LoginService.login(user)
                .then(function ()
                {
                    $state.go('menu.report');
                })
                .catch(function (e)
                {

                })
        }

        self.logout = function()
        {
            if(LoginService.logout())
            {
                $('menu.login');
            }
        }

    }
})();