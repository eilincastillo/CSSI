(function ()
{
    'use strict';

    angular.module('cssi.services.auth').service('AuthService', ['$q', '$http', '$rootScope', 'CSSIAPI', 'RESOURCE', AuthService]);

    function AuthService($q, $http, $rootScope, CSSIAPI, RESOURCE)
    {
        $rootScope.token;

        this.createToken = requestToken;


        function requestToken(user)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            $http( {
                method: 'POST',
                url: CSSIAPI.URL + RESOURCE.LOGIN,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {username: user.username, password: user.password}
            } )
            .then(function success ( response )
            {
                $rootScope.token = response.token;
                defered.resolve();
            },
            function error ( response )
            {

                defered.reject();
            })

            return promise;
        }



    }

})();