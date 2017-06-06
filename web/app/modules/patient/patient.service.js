(function ()
{
    'use strict';

    angular.module('cssi.services.patient').service('PatientService', ['$q', 'PlaceService','PatientFactory', 'ValidateService',  PatientService]);

    function PatientService($q, PlaceService, PatientFactory, ValidateService)
    {
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

            var firstNameInput = document.getElementById('firstName');
            var secondNameInput = document.getElementById('secondName');
            var firstLastnameInput = document.getElementById('firstLastname');
            var secondLastnameInput = document.getElementById('secondLastname');
            var documentInput = document.getElementById('document');
            var birthdayInput = document.getElementById('birthday');
            var nationalitySelectInput = document.getElementById('nationalityList');
            var genderSelectInput = document.getElementById('genderList');


            if(ValidateService.validateNotEmpty(firstNameInput)
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
                result = true;
            }

                // if (!ValidateService.validateText(secondNameInput))
                // {
                //     result=false;
                // }
                //
                // if (!ValidateService.validateText(secondLastnameInput))
                // {
                //     result=false;
                // }

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
                    
                    name: patient.firstName,
                    secondName: patient.secondName,
                    lastname: patient.firstLastname,
                    secondLastname: patient.secondLastname,
                    historyNumber: Math.floor(Math.random() * 10000000),
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