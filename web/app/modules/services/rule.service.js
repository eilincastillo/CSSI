/**
* @description: Servicio encargado de las validaciones de formularios en el sistema 
*/

(function()
{

    'use strict';

    angular.module('cssi.services.rule').service('RuleService', [RuleService]);

    function RuleService()
    {

        this.account = validateAccount;
        
        this.requiredFields = requiredAttributes;
        this.isValidPhone = isValidPhone;
        this.isValidEmail = isValidEmail;
        this.isValidUser = isValidUser;
        this.isValidPassword = isValidPassword;
        this.comparePassword = comparePassword;
        this.isValidLength = isValidLength;
        this.isValidText = isValidText;
        this.isEmpty = isEmpty;


        function isEmpty(value)
        {
            var result = false;

            if(requiredAttributes(value) && typeof value === "string" && value != '')
            {
                result = true;
            }

            return result;
        }


        function isValidPhone( phonenumber )
        {
            var pattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
            var re = new RegExp( pattern );
            var m = re.exec( phonenumber );
            var result = false;

            if ( m != null)
            {
                result = true;
            }

            return result;
        }


        /**
        * @description: Valida si el campo posee un correo valido
        * @param: {email} direccion de correo electronico del usuario 
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function isValidEmail( email )
        {
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var re = new RegExp( pattern );
            var m = re.exec( email );
            var result = false;

            if ( m != null)
            {
                result = true;
            }

            return result;
        }


        /**
        * @description: Valida si el campo posee un nombre de usuario valido
        * @param: {username} nombre de usuario  
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function isValidUser( username )
        {
            
            var pattern = /^[a-z0-9_-]+$/i;
            var re = new RegExp( pattern );
            var m = re.exec( username );
            var result = false;

            if ( m != null )
            {
                result = true;
            }

            return result;
        }


        /**
        * @private
        * @description: Valida si el alias del usuario tiene la longitud correcta 
        * @param: {username} nombre de usuario
        * @return: booleano, true si es correcto, false en caso contrario
        */
        function isValidLength( value )
        {

            var result = false;
            var length = username.length;

            if( length >= 6 && length <= 30)
            {
                result = true;
            }

            return result;

        }


        /**
        * @private
        * @description: Valida si el campo posee una clave aceptada
        * @param: {password} clave elegida por el usuario
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function isValidPassword( password )
        {
            var pattern = /^[a-z0-9_.]+$/i;
            var re = new RegExp( pattern );
            var m = re.exec( password );
            var result = false;

            if ( m != null )
            {
                result = true;
            }

            return result;
        }


        /**
        * @private
        * @description: Valida si el campo posee solamente texto
        * @param: {text} texto suministrado por el usuario
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function isValidText( text )
        {
            var pattern = /^[a-zA-Z ]{3,15}$/;
            var re = new RegExp( pattern );
            var m = re.exec( text );
            var result = false;

            if( m != null )
            {
                result = true;
            }

            return result;
        }


        /**
        * @private
        * @description: Valida si el campo posee solamente valor numerico
        * @param: {text} valor numerico suministrado por el usuario
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function isValidNumber( number )
        {
            var result = false;

            if( !isNaN( number ) )
            {
                result = true;
            }

            return result;
        }


        /**
        * @private
        * @description: Verifica que los campos no esten vacios
        * @param: {arguments} campos suministrado por el usuario
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function requiredAttributes()
        {
            var result = true;

            for(var i = 0; i < arguments.length; i++)
            {
                if(arguments[i] === undefined || arguments[i] === null)
                    result = false;
            }

            return result;
        }

        /**
        * @private
        * @description: Verifica que el password introducido sea igual a su confirmacion
        * @param: {password} clave elegida por el usuario
        * @param: {retypePassword} confirmacion de la clave del usuario
        * @return: booleano, true si es correcto, false en caso contrario 
        */
        function comparePassword(password, retypePassword)
        {
            var result = false;

            if(password === retypePassword )
            {
                result = true;
            }

            return result;
        }


    }

})();
