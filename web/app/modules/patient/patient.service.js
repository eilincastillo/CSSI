(function ()
{
    'use strict';

    angular.module('cssi.services.patient').service('PatientService', ['$q', 'PatientFactory', PatientService]);

    function PatientService($q, PatientFactory)
    {
        this.getAll = getAll;
        this.get = get;
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

        function add(patient)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedPatient =
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


            DoctorFactory.add(addedPatient)
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