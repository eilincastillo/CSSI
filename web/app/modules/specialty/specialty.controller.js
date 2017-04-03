(function ()
{

    'use strict';

    angular.module('cssi.controllers.specialty').controller('SpecialtyCtrl', ['$state', 'SpecialtyService', SpecialtyCtrl]);

    function SpecialtyCtrl($state, SpecialtyService)
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

        self.addSpecialty = function (specialtyName)
        {
            SpecialtyService.add(specialtyName)
                .then(function (data)
                {
                    $state.go('menu.specialty');
                })
                .catch(function (e)
                {

                });
        }
    }

})();