(function ()
{
    'use strict';

    angular.module('cssi.controllers.menu').controller('MenuCtrl', ['$state', MenuCtrl]);

    function MenuCtrl($state)
    {
        var self = this;

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