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

            roleList.push({ id: 1, name: 'ROLE_PERSONAL'});
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
                    nationality: user.personal.nationality,
                    name: user.personal.name,
                    lastname: user.personal.lastname,
                    username: user.username,
                    secondName:"",
                    secondLastname:"",
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

        function update(user)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var updatedUser =
                {
                    document: user.personal.document,
                    nationality: user.personal.nationality,
                    name: user.personal.name,
                    lastname: user.personal.lastname,
                    username: user.username,
                    secondName:"",
                    secondLastname:"",
                    password: user.password,
                    idStatus: user.status.id,
                    role: user.roles,
                    id: user.id
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