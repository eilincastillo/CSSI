/**
 * @description: Servicio encargado del manejo de logs de la aplicacion
 */
(function()
{
    'use strict';

    angular.module('cssi.services.logger').service('LoggerService', ['CSSIAPI', LoggerService]);

    function LoggerService(CSSIAPI)
    {
        var isDebug = (CSSIAPI.ENV === 'development' || CSSIAPI.ENV === 'localhost')? true : false;

        this.debug = debug;
        this.error = error;
        this.warning = warning;
        this.info = info;


        function error( message )
        {
            if ( isDebug )
            {
                console.error('\t \t \t' + message );
            }
        }

        function warning( message )
        {
            if ( isDebug )
            {
                console.warn('\t \t' + message );
            }
        }

        function info( message )
        {
            if ( isDebug )
            {
                console.info('\t' + message );
            }
        }

        function debug( message )
        {
            if ( isDebug )
            {
                console.debug( '< ' + message  + ' />');
            }
        }



    }


})();