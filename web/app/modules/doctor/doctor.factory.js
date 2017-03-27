(function ()
{
    'use strict';

    angular.module('cssi.factories.doctor').factory('DoctorFactory', ['$resource', 'CSSIAPI', 'RESOURCE', DoctorFactory])

    function DoctorFactory($resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.DOCTOR + ':doctorId';
        var request = $resource(url, {},
            {
                update: {method: 'PUT'}
            });


        var factory =
        {
            getAll: getAllDoctors,
            get: getDoctor,
            update: updateDoctor,
            add: addDoctor
        };

        return factory;

        function getAllDoctors()
        {
            request.query({doctorId: null},
            function success(data)
            {
                console.log(data);
            },
            function error(e)
            {
                console.log(e);
            });

            return undefined;
        }

        function getDoctor(doctorId)
        {
            request.get({doctorId: doctorId},
                function success(data)
                {

                },
                function error(err)
                {

                });
            //TODO: tratar datos

            return data;
        }

        function updateDoctor()
        {

        }

        function addDoctor()
        {

        }
    }

})();
