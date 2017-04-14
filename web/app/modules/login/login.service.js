(function () {

    angular.module('cssi.services.login').service('LoginService', ['AuthService', LoginService]);

    function LoginService(AuthService)
    {
        this.login = login;
        
        function login(user)
        {
            AuthService.createToken(user)
                .then(function ()
                {
                    console.log('Valido');
                })
                .catch(function ()
                {
                    console.log('Invalido');
                });
        }
    }

})();