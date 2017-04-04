(function ()
{
     'use strict';

     angular.module('cssi.services.specialty').service('SpecialtyService', ['$q', 'SpecialtyFactory', SpecialtyService]);

     function SpecialtyService($q, SpecialtyFactory)
     {
         this.getAll = getAll;
         this.get = get;
         this.add = add;
         this.update = update;

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

         function get()
         {
             var defered = $q.defer();
             var promise = defered.promise;


             SpecialtyFactory.get()
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


             SpecialtyFactory.update(specialtyId, specialtyName)
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