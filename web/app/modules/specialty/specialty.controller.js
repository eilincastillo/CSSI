(function ()
{

    'use strict';

    angular.module('cssi.controllers.specialty').controller('SpecialtyCtrl', ['$state', '$stateParams', 'SpecialtyService', SpecialtyCtrl]);

    function SpecialtyCtrl($state, $stateParams, SpecialtyService)
    {
        var self = this;
        self.specialtyList = [];
        self.specialty = {};
        self.specialtyId;

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

        self.getParameter = function ()
        {
            var urlParameter = $stateParams.specialtyId;

            if(urlParameter)
            {
                SpecialtyService.get(urlParameter)
                    .then(function (data)
                    {
                        self.specialty.name = data.name;
                    })
                    .catch(function (e)
                    {

                    });
            }
            else
            {
                $state.go('menu.specialty');
            }

        }

        self.updateSpecialty = function (specialtyName)
        {
            var urlParameter = $stateParams.specialtyId;

            if(urlParameter)
            {
                SpecialtyService.update(urlParameter, specialtyName)
                    .then(function ()
                    {
                        $state.go('menu.specialty');
                    })
                    .catch(function (e)
                    {

                    });
            }
            else
            {
                $state.go('menu.specialty');
            }
        }
    }

})();