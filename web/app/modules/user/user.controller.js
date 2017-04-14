(function () 
{
    'use strict';
    
    angular.module('cssi.controllers.user').controller('UserCtrl', ['$state', '$stateParams', 'StatusService', 'UserService', UserCtrl]);
    
    function UserCtrl($state, $stateParams, StatusService, UserService)
    {
        var self = this;
        self.userList = self.statusList = self.roleList = [];
        self.user = {};
        self.userId;


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
            UserService.add(user)
                .then(function (data)
                {
                    $state.go('menu.user');
                })
                .catch(function (e)
                {

                });
        }

        self.getParameter = function (updateView)
        {

            if(updateView)
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

                    StatusService.getAll()
                        .then(function (data)
                        {
                            self.statusList = data;
                        })
                        .catch(function (e)
                        {

                        });

                    self.roleList = UserService.getRoles();
                }
                else
                {
                    $state.go('menu.user');
                }
            }

        }

        self.updateUser = function (user)
        {
            var urlParameter = $stateParams.doctorId;

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
            else
            {
                $state.go('menu.user');
            }
        }
    }
})();