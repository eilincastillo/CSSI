(function ()
{
    angular.module('cssi.controllers.login').controller('LoginCtrl', ['LoginService', LoginCtrl]);

    function LoginCtrl(LoginService)
    {
        var self = this;
        self.user = {}

        self.login = function (user)
        {
            LoginService.login(user)
                .then(function ()
                {

                })
                .catch(function ()
                {

                })
        }

    }
})();