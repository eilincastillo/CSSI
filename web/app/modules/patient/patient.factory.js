(function ()
{
    'use strict';

    angular.module('cssi.factories.patient').factory('PatientFactory', ['$q', '$resource', 'CSSIAPI', 'RESOURCE', 'AuthService', PatientFactory]);

    function PatientFactory($q, $resource, CSSIAPI, RESOURCE, AuthService)
    {
        var url = CSSIAPI.URL + RESOURCE.PATIENT + ':patientId';
        var auth = AuthService.getToken();
        var request = $resource(url, { patientId: '@id' },
            {
                'save': {method: 'POST', headers: { 'Authorization' : auth }},
                'get': { method: 'GET', headers: { 'Authorization' : auth }},
                'query':  {method:'GET', isArray:true, headers: { 'Authorization' : auth }},
                'update': {method: 'PUT', headers: { 'Authorization' : auth }}
            },{
                stripTrailingSlashes: false
            });

        var factory =
            {
                getAll: getAllPatients,
                get: getPatient,
                update: updatePatient,
                add: addPatient,
                getNationalities: getNationalities,
                getScholarship: getScholarship,
                getGender: getGender,
                getEmployeeState: getEmployeeState,
                getsavingCapacityOptions: getsavingCapacityOptions
            };

        return factory;

        function getAllPatients()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.query(null,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(e)
                {
                    defered.reject();
                });

            return promise;
        }

        function getPatient(patientId)
        {

            var defered = $q.defer();
            var promise = defered.promise;

            request.get({patientId: patientId},
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });

            return promise;
        }

        function getNationalities()
        {
            var nationalityList = [];

            nationalityList.push({ id: 'V', name: 'Venezolano'});
            nationalityList.push({ id: 'E', name:'Extranjero'});

            return nationalityList;
        }



        function getScholarship()
        {
            var scholarshipList = [];

            scholarshipList.push({ id: 1, name: 'Ninguno'});
            scholarshipList.push({ id: 2, name: 'Primaria'});
            scholarshipList.push({ id: 3, name: 'Bachillerato'});
            scholarshipList.push({ id: 4, name: 'Técnico'});
            scholarshipList.push({ id: 5, name: 'Universitario'});


            return scholarshipList;
        }


        function getGender()
        {
            var genderList = [];

            genderList.push({ id: 1, name: 'Femenino'});
            genderList.push({ id: 2, name: 'Masculino'});

            return genderList;
        }

        function getEmployeeState()
        {
            var employeeStateList = [];

            employeeStateList.push({ id: 1, name: 'Empleado'});
            employeeStateList.push({ id: 2, name: 'Desempleado'});

            return employeeStateList;
        }

        function getsavingCapacityOptions()
        {
            var savingCapacityList = [];

            savingCapacityList.push({ id: true, name: 'Sí'});
            savingCapacityList.push({ id: false, name: 'No'});

            return savingCapacityList;
        }

        function updatePatient(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.update({patientId: patient.id }, patient,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });

            return promise;
        }

        function addPatient(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            request.save(patient,
                function success(data)
                {
                    defered.resolve(data);
                },
                function error(err)
                {
                    defered.reject();
                });

            return promise;
        }




    }

})();