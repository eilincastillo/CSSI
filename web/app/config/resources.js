'use strict';

angular.module('cssi.resources')
    .constant("CSSIAPI",
    {
        URL: "http://localhost/cssi/web",
        ENV: "development"
    })
    .constant("RESOURCE",
    {
        DOCTOR: "/api/doctor/",
        PATIENT: "/api/patient/",
        APPOINTMENT: "/api/appointment/",
        STATUS: "/api/status/",
        SPECIALTY: "/api/specialty"
    });