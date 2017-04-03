(function ()
{
     'use strict';

     angular.module('cssi.services.specialty').service('SpecialtyService', ['$q', 'SpecialtyFactory', SpecialtyService]);

     function SpecialtyService($q, SpecialtyFactory)
     {
         this.getAll = getAll;
         this.add = add;

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

     }


})();