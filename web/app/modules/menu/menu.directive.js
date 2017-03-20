(function () {

    'use strict';

    angular.module('cssi.directives.menu').directive('menuBar', menuBar);

    function menuBar()
    {
        var directive = {
            restrict: 'E',
            templateUrl: '../../views/menu/menu.html',
            controller: 'MenuCtrl as ctrl'
        }

        return directive;
    }

})();