(function ()
{
    'use strict';

    angular.module('cssi.services.patient').service('PatientService', ['$q', 'PlaceService', 'PatientFactory', PatientService]);

    function PatientService($q, PlaceService, PatientFactory)
    {
        this.getAll = getAll;
        this.get = get;
        this.getGender = getGender;
        this.getEmployee = getEmployeeState;
        this.getScholarship = getScholarship;
        this.getState = getState;
        this.getDistricts = getDistricts;
        this.getNationalities = getNationalities;
        this.add = add;
        this.update = update;

        function getAll()
        {
            var defered = $q.defer();
            var promise = defered.promise;


            PatientFactory.getAll()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function get(patientId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            PatientFactory.get(patientId)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
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

        function getState()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            PlaceService.getStates()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function (error)
                {
                    defered.reject();
                });

            return promise;
        }

        function getDistricts(placeId)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            PlaceService.getDistricts(placeId)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function (error)
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

        function add(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedPatient =
                {
                    
                    name: patient.firstName,
                    secondName: patient.secondName,
                    lastname: patient.firstLastname,
                    secondLastname: patient.secondLastname,
                    historyNumber: 'n',
                    registrationDate: new Date().toISOString(),
                    nationality: patient.nationality.id,
                    document: patient.document,
                    gender: patient.gender.id,
                    birthdate: patient.birthday.toISOString().split('T')[0],
                    familyDynamics: '',
                    scholarship: patient.scholarship.name,
                    scholarshipDetail: patient.scholarshipSpecialty,
                    job: true,
                    occupation: patient.occupation,
                    employmentInstitution: patient.institution,
                    idPlace: patient.address.district.id,
                    placeDetail: patient.address.detail
                };


            PatientFactory.add(addedPatient)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function update(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var updatedPatient =
                {
                    name: patient.name,
                    lastname: patient.lastname,
                    historyNumber: patient.specialty.id,
                    registrationDate: '',
                    accompanied: '',
                    document: '',
                    gender: '',
                    birthdate: '',
                    familyDynamics: '',
                    homeVisit: '',
                    job: '',
                    job_detail: '',
                    idPlace: ''
                };

            PatientFactory.update(updatedPatient)
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;
        }
    }
})();