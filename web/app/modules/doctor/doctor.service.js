(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['$q', 'DoctorFactory', DoctorService]);

    function DoctorService($q, DoctorFactory)
    {
        this.getAll = getAll;

        function getAll()
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.getAll()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }
    }

})();