(function ()
{

    'use strict';

    angular.module('cssi.controllers.specialty').controller('SpecialtyCtrl', ['SpecialtyService', SpecialtyCtrl]);

    function SpecialtyCtrl(SpecialtyService)
    {
        var self = this;
        self.specialtyList = [];

        self.getSpecialtyList = function ()
        {
            SpecialtyService.getAll()
                .then(function (data)
                {
                    self.specialtyList = data;
                })
                .catch(function(e)
                {
                    console.log(e);
                });
        }
    }

})();