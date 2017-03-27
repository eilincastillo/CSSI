(function ()
{

    'use strict';

    angular.module('cssi.controllers.doctor').controller('DoctorCtrl', ['DoctorService', DoctorCtrl]);

    function DoctorCtrl(DoctorService)
    {
        var self = this;
        self.doctorList = [];

        self.getDoctorList = function ()
        {
            DoctorService.getAll()
                .then(function ()
                {

                })
                .catch(function()
                {

                });
        }
    }

})();