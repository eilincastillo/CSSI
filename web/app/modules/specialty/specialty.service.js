(function ()
{
     'use strict';

     angular.module('cssi.services.specialty').service('SpecialtyService', ['$q', 'SpecialtyFactory', 'ValidateService', SpecialtyService]);

     function SpecialtyService($q, SpecialtyFactory, ValidateService)
     {
         this.getAll = getAll;
         this.get = get;
         this.add = add;
         this.update = update;
         this.validate = validate;

         function getAll()
         {
             var defered = $q.defer();
             var promise = defered.promise;


             SpecialtyFactory.getAll()
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

         function get(specialtyId)
         {
             var defered = $q.defer();
             var promise = defered.promise;


             SpecialtyFactory.get(specialtyId)
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

         function validate(specialty)
         {
             var result = false;

             var nameInput = document.getElementById('name');

             if(ValidateService.validateNotEmpty(nameInput)
                 && ValidateService.validateText(nameInput))
             {
                 result = true;
             }

             return result;
         }
         
         function add(specialtyName)
         {
             var defered = $q.defer();
             var promise = defered.promise;


             SpecialtyFactory.add(specialtyName)
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

         function update(specialtyId, specialtyName)
         {
             var defered = $q.defer();
             var promise = defered.promise;

             var specialty =
                 {
                     id: specialtyId,
                     name: specialtyName
                 }

             SpecialtyFactory.update(specialty)
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