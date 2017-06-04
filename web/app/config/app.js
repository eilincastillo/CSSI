'use strict';

angular.module('cssi', [])
    .run(function ($rootScope)
    {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams)
        {
            console.log(toState.name);
            console.log(event);
            console.log(fromState.name);
        });
    });