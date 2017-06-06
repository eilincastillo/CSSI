(function ()
{
    'use strict';

    angular.module('cssi.services.patient').service('PatientService', ['$q', 'PlaceService','PatientFactory', 'ValidateService',  PatientService]);

    function PatientService($q, PlaceService, PatientFactory, ValidateService)
    {
        var storage = sessionStorage;

        this.getAll = getAll;
        this.get = get;
        this.getGender = getGender;
        this.getEmployee = getEmployeeState;
        this.getScholarship = getScholarship;
        this.getState = getState;
        this.getDistricts = getDistricts;
        this.getNationalities = getNationalities;
        this.getsavingCapacityOptions = getsavingCapacityOptions;
        this.add = add;
        this.update = update;
        this.validate = validate;

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

        function validate(step)
        {
            var result = false;
            switch(step)
            {
                case 1:
                    result = validateFirstStep();
                    break;
                case 2:
                    result = validateSecondStep();
                    break;
                case 3:
                    result = validateThirdStep();
                    break;
                case 4:
                    result = validatePatient();
                    break;
            }

            return result;
        }

        function validateFirstStep()
        {
            var result = false;

            var historyNumberInput = document.getElementById('historyNumber');
            var firstNameInput = document.getElementById('firstName');
            var secondNameInput = document.getElementById('secondName');
            var firstLastnameInput = document.getElementById('firstLastname');
            var secondLastnameInput = document.getElementById('secondLastname');
            var documentInput = document.getElementById('document');
            var birthdayInput = document.getElementById('birthday');
            var nationalitySelectInput = document.getElementById('nationalityList');
            var genderSelectInput = document.getElementById('genderList');


            if(ValidateService.validateNotEmpty(historyNumber)
                && ValidateService.validateNotEmpty(firstNameInput)
                && ValidateService.validateNotEmpty(firstLastnameInput)
                && ValidateService.validateNotEmpty(documentInput)
                && ValidateService.validateNotEmpty(birthdayInput)
                && ValidateService.validateSelection(nationalitySelectInput)
                && ValidateService.validateSelection(genderSelectInput)
                && ValidateService.validateText(firstNameInput)
                && ValidateService.validateText(secondNameInput)
                && ValidateService.validateText(firstLastnameInput)
                && ValidateService.validateText(secondLastnameInput)
                && ValidateService.validateNumber(documentInput))
            {
                storage.setItem('historyNumber', historyNumberInput.value);
                storage.setItem('document', documentInput.value);
                storage.setItem('firstName', firstNameInput.value);
                storage.setItem('secondName', secondNameInput.value);
                storage.setItem('firstLastname', firstLastnameInput.value);
                storage.setItem('secondLastname', secondLastnameInput.value);
                storage.setItem('birthdate', new Date (birthdayInput.value).toISOString().split('T')[0] );
                storage.setItem('nationality', nationalitySelectInput.value);
                storage.setItem('gender', genderSelectInput.value);

                result = true;
            }

            return result;
        }

        function validateSecondStep()
        {
            var result = false;

            var addressDetailInput = document.getElementById('addressDetail');
            var phonenumberInput = document.getElementById('phonenumber');
            var stateSelectInput = document.getElementById('stateList');
            var districtSelectInput = document.getElementById('districtList');


            if(ValidateService.validateNotEmpty(addressDetailInput)
                && ValidateService.validateNotEmpty(phonenumberInput)
                && ValidateService.validateText(addressDetailInput)
                && ValidateService.validateNumber(phonenumberInput)
                && ValidateService.validateNumber(phonenumberInput)
                && ValidateService.validateSelection(stateSelectInput)
                && ValidateService.validateSelection(districtSelectInput))
            {
                storage.setItem('placeDetail', addressDetailInput.value);
                storage.setItem('phoneNumber', phonenumberInput.value);
                storage.setItem('idPlace', districtSelectInput.value);

                result = true;
            }

            return result;
        }

        function validateThirdStep()
        {
            var result = false;

            var scholarshipSpecialtyInput = document.getElementById('scholarshipSpecialty');
            var scholarshipSelectInput = document.getElementById('scholarshipList');
            var employeeSelectInput = document.getElementById('employeeList');
            var enabledOccupationInput = document.getElementById('enabledOccupation');
            var institutionInput = document.getElementById('institution');

            if( ValidateService.validateSelection(scholarshipSelectInput)
                && ValidateService.validateSelection(employeeSelectInput)
                && ValidateService.validateText(scholarshipSpecialtyInput)
                && ValidateService.validateText(enabledOccupationInput)
                && ValidateService.validateText(institutionInput)
                && ValidateService.validateText(institutionInput))
            {
                storage.setItem('scholarship', scholarshipSelectInput.value);
                storage.setItem('scholarshipDetail', scholarshipSpecialtyInput.value);
                storage.setItem('job', employeeSelectInput.value);
                storage.setItem('occupation', enabledOccupationInput.value);
                storage.setItem('employmentInstitution', institutionInput.value);


                result = true;
            }
            return result;
        }

        function validatePatient()
        {
            var result = false;

            var incomeInput = document.getElementById('income');
            var expensesInput = document.getElementById('expenses');
            var savingCapacityListSelectInput = document.getElementById('savingCapacityList');
            var familyDynamicsInput = document.getElementById('familyDynamics');

            if(ValidateService.validateNotEmpty(incomeInput)
                && ValidateService.validateNotEmpty(expensesInput)
                && ValidateService.validateNotEmpty(familyDynamicsInput)
                && ValidateService.validateNumber(incomeInput)
                && ValidateService.validateNumber(expensesInput)
                && ValidateService.validateSelection(savingCapacityListSelectInput)
            && ValidateService.validateText(familyDynamicsInput))
            {
                storage.setItem('income', incomeInput.value);
                storage.setItem('expenses', expensesInput.value);
                storage.setItem('savingCapacity', savingCapacityListSelectInput.value);
                storage.setItem('familyDynamics', familyDynamicsInput.value);

                result = true;
            }
            return result;
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
                    
                    name: storage.getItem('name'),
                    secondName: storage.getItem('secondName'),
                    lastname: storage.getItem('lastname'),
                    secondLastname: storage.getItem('secondLastname'),
                    historyNumber: storage.getItem('historyNumber'),
                    nationality: storage.getItem('nationality'),
                    document: storage.getItem('document'),
                    gender: storage.getItem('gender'),
                    birthdate: storage.getItem('birthdate'),
                    familyDynamics: storage.getItem('familyDynamics'),
                    scholarship: storage.getItem('scholarship'),
                    scholarshipDetail: storage.getItem('scholarshipDetail'),
                    job: storage.getItem('job'),
                    occupation: storage.getItem('occupation'),
                    employmentInstitution: storage.getItem('employmentInstitution'),
                    idPlace: parseInt(storage.getItem('idPlace')),
                    placeDetail: storage.getItem('placeDetail'),
                    phoneNumber: storage.getItem('phoneNumber'),
                    income: storage.getItem('income'),
                    expenses: storage.getItem('expenses'),
                    savingCapacity: storage.getItem('savingCapacity')
                };


            PatientFactory.add(addedPatient)
                .then(function (data)
                {
                    storage.removeItem('name');
                    storage.removeItem('secondName');
                    storage.removeItem('lastname');
                    storage.removeItem('secondLastname');
                    storage.removeItem('historyNumber');
                    storage.removeItem('nationality');
                    storage.removeItem('document');
                    storage.removeItem('gender');
                    storage.removeItem('birthdate');
                    storage.removeItem('familyDynamics');
                    storage.removeItem('scholarship');
                    storage.removeItem('scholarshipDetail');
                    storage.removeItem('job');
                    storage.removeItem('occupation');
                    storage.removeItem('employmentInstitution');
                    storage.removeItem('idPlace');
                    storage.removeItem('placeDetail');
                    storage.removeItem('phoneNumber');
                    storage.removeItem('income');
                    storage.removeItem('expenses');
                    storage.removeItem('savingCapacity');

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
                    name: storage.getItem('name'),
                    secondName: storage.getItem('secondName'),
                    lastname: storage.getItem('lastname'),
                    secondLastname: storage.getItem('secondLastname'),
                    historyNumber: storage.getItem('historyNumber'),
                    nationality: storage.getItem('nationality'),
                    document: storage.getItem('document'),
                    gender: storage.getItem('gender'),
                    birthdate: storage.getItem('birthdate'),
                    familyDynamics: storage.getItem('familyDynamics'),
                    scholarship: storage.getItem('scholarship'),
                    scholarshipDetail: storage.getItem('scholarshipDetail'),
                    job: storage.getItem('job'),
                    occupation: storage.getItem('occupation'),
                    employmentInstitution: storage.getItem('employmentInstitution'),
                    idPlace: parseInt(storage.getItem('idPlace')),
                    placeDetail: storage.getItem('placeDetail'),
                    phoneNumber: storage.getItem('phoneNumber'),
                    income: storage.getItem('income'),
                    expenses: storage.getItem('expenses'),
                    savingCapacity: storage.getItem('savingCapacity')
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

        function getEmployeeState()
        {
            return PatientFactory.getEmployeeState();
        }

        function getGender()
        {
            return PatientFactory.getGender();
        }

        function getNationalities()
        {
            return PatientFactory.getNationalities()
        }

        function getScholarship()
        {
            return PatientFactory.getScholarship();
        }

        function getsavingCapacityOptions()
        {
            return PatientFactory.getsavingCapacityOptions();
        }

    }
})();