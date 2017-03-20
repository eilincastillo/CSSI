'use strict';

angular.module('cssi.routes').config( function ($stateProvider, $urlRouterProvider)
{
    $stateProvider
        .state( 'login', {
            url: '/',
            templateUrl: '../app/views/login/login.html',
            controller: 'LoginCtrl as ctrl'
        })
        .state('doctor', {
            url: '/doctores/listado',
            templateUrl: '../app/views/doctor/list/doctor-list.html',
            controller: 'DoctorCtrl as ctrl'
        })
        .state('doctor-add', {
            url: '/doctores/agregar',
            templateUrl: '../app/views/doctor/add/doctor-add.html',
            controller: 'DoctorCtrl as ctrl'
        })
        .state('patient', {
            url: '/pacientes/listado',
            templateUrl: '../app/views/patient/list/patient-list.html',
            controller: 'PatientCtrl as ctrl'
        })
        .state('patient-add', {
            url: '/pacientes/agregar',
            templateUrl: '../app/views/patient/add/patient-add.html',
            controller: 'PatientCtrl as ctrl'
        })
        .state('user', {
            url: '/usuarios/listado',
            templateUrl: '../app/views/user/list/user-list.html',
            controller: 'UserCtrl as ctrl'
        })
        .state('user-add', {
            url: '/usuarios/agregar',
            templateUrl: '../app/views/user/add/user-add.html',
            controller: 'UserCtrl as ctrl'
        })
        .state('report', {
            url: '/reportes',
            templateUrl: '../app/views/report/report.html',
            controller: 'ReportCtrl as ctrl'

        });

    $urlRouterProvider.otherwise('/');
});