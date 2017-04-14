(function ()
{
    'use strict';

    angular.module('cssi.services.user').service('UserService', ['$q', 'UserFactory', UserService]);

    function UserService($q, UserFactory)
    {
        this.getAll = getAll;
        this.get = get;
        this.getRoles = getRoles;
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
        
        function getRoles()
        {
            var roleList = [];

            roleList.push({ id: 1, name: 'RL_PERSONAL'});
            roleList.push({ id: 2, name: 'ROLE_ADMIN'});

            return roleList;
        }

        function add(user)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedUser =
                {
                    document: user.personal.document,
                    name: user.personal.name,
                    lastName: user.personal.lastname,
                    username: user.username,
                    password: user.password,
                    role: 'ROLE_PERSONAL'
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