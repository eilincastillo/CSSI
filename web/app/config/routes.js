'use strict';

angular.module('cssi.routes').config( function ($stateProvider, $urlRouterProvider)
{
    $stateProvider
        .state('menu', {
            url: '/menu',
            abstract: true,
            templateUrl: '../app/views/menu/menu.html'
        })
        .state( 'menu.login', {
            url: '/',
            templateUrl: '../app/views/login/login.html',
            controller: 'LoginCtrl as ctrl'
        })
        .state('menu.doctor', {
            url: '/doctores/listado',
            templateUrl: '../app/views/doctor/list/doctor-list.html',
            controller: 'DoctorCtrl as ctrl'
        })
        .state('menu.doctor-add', {
            url: '/doctores/agregar',
            templateUrl: '../app/views/doctor/add/doctor-add.html',
            controller: 'DoctorCtrl as ctrl'
        })
        .state('menu.patient', {
            url: '/pacientes/listado',
            templateUrl: '../app/views/patient/list/patient-list.html',
            controller: 'PatientCtrl as ctrl'
        })
        .state('menu.patient-add', {
            url: '/pacientes/agregar',
            templateUrl: '../app/views/patient/add/patient-add.html',
            controller: 'PatientCtrl as ctrl'
        })
        .state('menu.user', {
            url: '/usuarios/listado',
            templateUrl: '../app/views/user/list/user-list.html',
            controller: 'UserCtrl as ctrl'
        })
        .state('menu.user-add', {
            url: '/usuarios/agregar',
            templateUrl: '../app/views/user/add/user-add.html',
            controller: 'UserCtrl as ctrl'
        })
        .state('menu.report', {
            url: '/reportes',
            templateUrl: '../app/views/report/report.html',
            controller: 'ReportCtrl as ctrl'

        })
        .state('menu.specialty', {
            url: '/especialidades/listado',
            templateUrl: '../app/views/specialty/list/specialty-list.html',
            controller: 'SpecialtyCtrl as ctrl'
        })
        .state('menu.specialty-add', {
            url: '/especialidades/agregar',
            templateUrl: '../app/views/specialty/add/specialty-add.html',
            controller: 'SpecialtyCtrl as ctrl'
        })
        .state('menu.specialty-update', {
            url: '/especialidades/actualizar/:specialtyId',
            templateUrl: '../app/views/specialty/update/specialty-update.html',
            controller: 'SpecialtyCtrl as ctrl'
        });

    $urlRouterProvider.otherwise('/');
});