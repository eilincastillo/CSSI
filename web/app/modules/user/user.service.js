(function ()
{
    'use strict';

    angular.module('cssi.services.user').service('UserService', ['$q', 'UserFactory', 'ValidateService', 'StatusService', UserService]);

    function UserService($q, UserFactory, ValidateService, StatusService)
    {
        this.getAll = getAll;
        this.get = get;
        this.getRoles = getRoles;
        this.add = add;
        this.update = update;
        this.validate = validate;
        this.getNationalites = getNationalites;
        this.getStatus = getStatus;

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
                    data.personal.nationality = { id: data.personal.nationality, name: data.personal.nationality };

                    data.roles = { id: data.roles, name: (data.roles === 'ROLE_ADMIN')? 'Administrador' : 'Usuario' }



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

            roleList.push({ id: 'ROLE_PERSONAL', name: 'Usuario'});
            roleList.push({ id: 'ROLE_ADMIN', name: 'Administrador'});

            return roleList;
        }

        function getNationalites()
        {
            var nationalityList = [];

            nationalityList.push({ id: 'V', name: 'V'});
            nationalityList.push({ id: 'E', name:'E'});

            return nationalityList;
        }

        function getStatus()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            StatusService.getAll()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function (e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function validate(user)
        {
            var result = false;

            var selectInput = document.getElementById('nationalityList');
            var documentInput = document.getElementById('document');
            var nameInput = document.getElementById('name');
            var lastnameInput = document.getElementById('lastname');
            var usernameInput = document.getElementById('username');
            var passwordInput = document.getElementById('password');
            var retypePasswordInput = document.getElementById('retypePassword');

            if (usernameInput !=null)
            {
                if (ValidateService.validateNotEmpty(usernameInput) &&
                    ValidateService.validateText(usernameInput))
                {
                    result = true;
                }
            }

            if(ValidateService.validateNotEmpty(documentInput)
                && ValidateService.validateNotEmpty(nameInput)
                && ValidateService.validateNotEmpty(lastnameInput)
                && ValidateService.validateNotEmpty(passwordInput)
                && ValidateService.validateNotEmpty(retypePasswordInput)
                && ValidateService.validateSelection(selectInput)
                && ValidateService.validateText(nameInput)
                && ValidateService.validateText(lastnameInput)
                && ValidateService.validatePassword(passwordInput)
                && ValidateService.validatePassword(retypePasswordInput)
                && ValidateService.validateNumber(documentInput))
            {
                result = true;
            }

            return result;
        }

        function add(user)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedUser =
                {
                    document: user.personal.document,
                    nationality: user.personal.nationality.id,
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
                    nationality: user.personal.nationality.id,
                    name: user.personal.name,
                    lastname: user.personal.lastname,
                    username: user.username,
                    secondName:"",
                    secondLastname:"",
                    password: user.password,
                    idStatus: user.status.id,
                    role: user.roles.id,
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