(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['$q', 'DoctorFactory', 'ValidateService', 'StatusService', 'SpecialtyService', DoctorService]);

    function DoctorService($q, DoctorFactory, ValidateService, StatusService, SpecialtyService)
    {
        this.getAll = getAll;
        this.getFullName = getFullName;
        this.get = get;
        this.add = add;
        this.update = update;
        this.validate = validate;
        this.getSpecialities = getSpecialities;
        this.getStatus = getStatus;


        
        function getAll()
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.getAll()
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

        function getFullName()
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.getAll()
                .then(function (data)
                {
                    var list = getDoctorsFullName(data);
                    defered.resolve(list);
                })
                .catch(function(e)
                {
                    defered.reject(e);
                });

            return promise;   
        }

        function getDoctorsFullName(data)
        {
            var doctorList = [];

            for(var i = 0; i < data.length; i++)
            {
                doctorList[i] = { id: data[i].id, name: data[i].lastname.concat(', ').concat(data[i].name).concat(' - ').concat(data[i].specialty.name) };
            }

            return doctorList;
        }

        function get(doctorId)
        {
            var defered = $q.defer();
            var promise = defered.promise;


            DoctorFactory.get(doctorId)
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

        function validate(doctor)
        {
            var result = false;

            var nameInput = document.getElementById('name');
            var lastnameInput = document.getElementById('lastname');
            var selectInput = document.getElementById('specialtyList');

            if(ValidateService.validateNotEmpty(nameInput)
                && ValidateService.validateNotEmpty(lastnameInput)
                && ValidateService.validateSelection(selectInput)
                && ValidateService.validateText(nameInput)
                && ValidateService.validateText(lastnameInput))
            {
                result = true;
            }    

            return result;
        }


        function add(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var addedDoctor =
                {
                    name: doctor.name,
                    lastname: doctor.lastname,
                    idSpecialty: doctor.specialty.id
                };

            DoctorFactory.add(addedDoctor)
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

        function update(doctor)
        {
            var defered = $q.defer();
            var promise = defered.promise;

            var updatedDoctor =
                {
                    id: doctor.id,
                    name: doctor.name,
                    lastname: doctor.lastname,
                    idSpecialty: doctor.specialty.id,
                    idStatus: doctor.status.id
                };

            DoctorFactory.update(updatedDoctor)
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

        function getSpecialities()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            SpecialtyService.getAll()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function (e)
                {
                    defered.reject(e);
                });

            return promise;
        }

        function getStatus()
        {
            var defered = $q.defer();
            var promise = defered.promise;

            StatusService.getAll()
                .then(function (data)
                {
                    defered.resolve(data);
                })
                .catch(function (e)
                {
                    defered.reject(e);
                });

            return promise;
        }
    }

})();