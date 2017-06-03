(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['$q', 'DoctorFactory', 'ValidateService', DoctorService]);

    function DoctorService($q, DoctorFactory, ValidateService)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.update = update;
        this.validateSelection = validateSelection;
        this.validateField = validateField;
        this.validate = validate;

        function validateSelection(selectInput)
        {
            ValidateService.validateSelection(selectInput);
        }

        
        function validateField(input)
        {
            switch(input.name)
            {
                case 'Name':
                case 'Lastname':
                    ValidateService.validateText(input);
                    break;
            }
        }


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

            if(ValidateService.requiredFields(doctor))
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
    }

})();