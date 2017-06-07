(function ()
{
    'use strict';

    angular.module('cssi.controllers.menu').controller('MenuCtrl', ['$state', MenuCtrl]);

    function MenuCtrl($state)
    {
        var storage = sessionStorage;

        var self = this;
        self.username = null;

        function init()
        {
            if(storage.getItem('username'))
                self.username = storage.getItem('username');
        }

        init();


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