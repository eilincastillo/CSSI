(function () 
{
    'use strict';
    
    angular.module('cssi.controllers.user').controller('UserCtrl', ['$state', '$stateParams', 'UserService', UserCtrl]);
    
    function UserCtrl($state, $stateParams, UserService)
    {
        var self = this;
        self.userList = self.statusList = self.roleList = self.nationalityList = [];
        self.user = {};
        self.userId;
        self.retype;

        self.getUserList = function ()
        {
            UserService.getAll()
                .then(function (data)
                {
                    self.userList = data;
                })
                .catch(function(e)
                {
                    console.log(e);
                });
        }

        self.addUser = function (user)
        {
            if(UserService.validate(user))
            {
                UserService.add(user)
                    .then(function (data)
                    {
                        $state.go('menu.user');
                    })
                    .catch(function (e)
                    {

                    });
            }

        }

        self.getParameter = function (updateView)
        {
            var urlParameter = $stateParams.userId;

            if(urlParameter)
            {
                UserService.get(urlParameter)
                    .then(function (data)
                    {
                        self.user = data;

                    })
                    .catch(function (e)
                    {

                    });
            }
            else
            {
                $state.go('menu.user');
            }

        }

        self.updateUser = function (user)
        {
            var urlParameter = $stateParams.userId;

            if(urlParameter)
            {
                UserService.update(user)
                    .then(function ()
                    {
                        $state.go('menu.user');
                    })
                    .catch(function (e)
                    {

                    });
            }
        }

        self.loadNationalities = function()
        {
            self.nationalityList = UserService.getNationalites();
        }

        self.loadRoles = function()
        {
            self.roleList = UserService.getRoles();
        }

        self.loadStatus = function()
        {
            UserService.getStatus()
                .then(function (data)
                {
                    self.statusList = data;
                })
                .catch(function (e)
                {
                    console.log('Error al obtener los estados');
                });
        }
    }
})();