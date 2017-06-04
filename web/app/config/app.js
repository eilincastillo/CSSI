'use strict';

angular.module('cssi', []).run(config);


function config($rootScope)
{
    $rootScope.storage = sessionStorage;
}