(function ()
{
    'use strict';

    angular.module('cssi.controllers.menu').controller('MenuCtrl', ['$state', 'LoginService', 'AuthService', MenuCtrl]);

    function MenuCtrl($state, LoginService, AuthService)
    {
        var self = this;
        self.administrator = AuthService.isAdmin();

        self.toDoctor = function ()
        {
            $state.go('doctor');
        }

        self.toUser = function ()
        {
            $state.go('user');
        }

        self.toPatient = function ()
        {
            $state.go('patient');
        }

        self.toReport = function ()
        {
            $state.go('report');
        }


    }
})();