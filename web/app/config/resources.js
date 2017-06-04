'use strict';

angular.module('cssi.resources')
    .constant("CSSIAPI",
    {
        URL: "http://localhost/cssi/web",
        ENV: "development",
        HEADER: {'Content-Type': 'application/json'}
    })
    .constant("AUTH", "Bearer ")
    .constant("RESOURCE",
    {
        DOCTOR: "/api/doctor/",
        PATIENT: "/api/patient/",
        APPOINTMENT: "/api/appointment/",
        STATUS: "/api/status/",
        SPECIALTY: "/api/specialty/",
        USER: "/api/user/",
        PLACE: "/api/place/",
        LOGIN: "/api/login_check/"
    });