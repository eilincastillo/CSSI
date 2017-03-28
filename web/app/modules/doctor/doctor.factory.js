(function ()
{
    'use strict';

    angular.module('cssi.factories.doctor').factory('DoctorFactory', ['$resource', 'CSSIAPI', 'RESOURCE', DoctorFactory])

    function DoctorFactory($resource, CSSIAPI, RESOURCE)
    {
        var url = CSSIAPI.URL + RESOURCE.DOCTOR;
        var request = $resource(url, { },
            {
                update: {method: 'PUT'}
            },{
                stripTrailingSlashes: false
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
            request.query(null,
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
