(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['$q', 'DoctorFactory', DoctorService]);

    function DoctorService($q, DoctorFactory)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.update = update;

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

        function get(doctorId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.get(doctorId)
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

        function add(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.add(doctor)
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

        function update(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.update(doctor)
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