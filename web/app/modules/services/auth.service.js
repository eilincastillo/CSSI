(function ()
{
    'use strict';

    angular.module('cssi.services.auth').service('AuthService', ['$q', '$http', '$rootScope', AuthService]);

    function AuthService($q, $http, $rootScope)
    {
        $rootScope.token;

        this.createToken = requestToken;


        function requestToken(user)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            $http( {
                method: 'POST',
                url: GNOAPI.URL + RESOURCE.SESSION,
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