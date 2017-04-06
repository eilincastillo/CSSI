'use strict';

angular.module('cssi', [
    'ui.router',
    'ngResource',
    'cssi.routes',
    'cssi.resources',
    'cssi.controllers.doctor',
    'cssi.controllers.login',
    'cssi.controllers.patient',
    'cssi.controllers.report',
    'cssi.controllers.user',
    'cssi.controllers.menu',
    'cssi.controllers.specialty',
    'cssi.services.doctor',
    'cssi.services.login',
    'cssi.services.patient',
    'cssi.services.report',
    'cssi.services.user',
    'cssi.services.specialty',
    'cssi.services.logger',
    'cssi.services.validate',
    'cssi.services.status',
    'cssi.factories.doctor',
    'cssi.factories.specialty'

]);