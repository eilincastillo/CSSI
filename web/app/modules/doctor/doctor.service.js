(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['DoctorFactory', DoctorService]);

    function DoctorService(DoctorFactory)
    {
        this.getAll = getAll;

        function getAll()
        {
            DoctorFactory.getAll();
        }
    }

})();