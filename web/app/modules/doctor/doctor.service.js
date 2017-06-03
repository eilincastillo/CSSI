(function () {

    'use strict';

    angular.module('cssi.services.doctor').service('DoctorService', ['$q', 'DoctorFactory', 'ValidateService', 'MessageService', DoctorService]);

    function DoctorService($q, DoctorFactory, ValidateService, MessageService)
    {
        this.getAll = getAll;
        this.get = get;
        this.add = add;
        this.update = update;
        this.validate = validateDoctor;
        this.validateField = validateField;
        this.validateSelection = validateSelection;


        function validateSelection(selectInput)
        {
            if(ValidateService.isEmpty(selectInput.value))
                MessageService.success(selectInput);
            else
                MessageService.error(selectInput);
        }

        function validateField(input)
        {
            switch(input.name)
            {
                case 'Name':
                case 'lastname':
                    validateTextField(input);
                    break;
            }
        }

        function validateTextField(input)
        {
            if(ValidateService.isValidText(input.value))
                MessageService.success(input);
            else
                MessageService.error(input);
        }

        function validateDoctor(doctor)
        {
            var result = false;

            if(ValidateService.requiredFields(doctor.name, doctor.lastname, doctor.specialty))
            {
                result = true;
            }
            else
            {
                MessageService.show();
            }

            return result;
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