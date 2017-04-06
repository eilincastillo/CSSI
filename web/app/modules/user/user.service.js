(function ()
{
    'use strict';

    angular.module('cssi.services.user').service('UserService', ['$q', 'UserFactory', UserService]);

    function UserService($q, UserFactory)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.update = update;

        function getAll()
        {
            var defered = $q.defer();
            var promise = defered.promise;


            UserFactory.getAll()
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

        function get(userId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            UserFactory.get(userId)
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

            var addedUser =
                {
                    name: doctor.name,
                    lastname: doctor.lastname,
                    idSpecialty: doctor.specialty.id
                };

            UserFactory.add(addedUser)
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

            var updatedUser =
                {
                    id: doctor.id,
                    name: doctor.name,
                    lastname: doctor.lastname,
                    idSpecialty: doctor.specialty.id,
                    idStatus: doctor.status.id
                };

            UserFactory.update(updatedUser)
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