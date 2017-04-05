/**
 * @description: Servicio encargado de las validaciones de formularios en el sistema
 */

(function(){

    'use strict';

    angular.module('cssi.services.validate').service('ValidateService', ['LoggerService', ValidateService]);

    function ValidateService(LoggerService)
    {

        this.login = validateLogin;
        this.register = validateRegister;
        this.recover = validateRecoverPassword;
        this.changeEmail = validateChangeEmail;
        this.changePassword = validateChangePassword;

        this.isValidEmail = isValidEmail;


        /**
         * @description: Valida el formulario de login
         * @param: {user} credenciales del usuario, clave y usuario
         * @return: booleano, true si los datos son correctos, false en caso contrario
         */
        function validateLogin( user )
        {
            LoggerService.debug( 'Entrando al metodo validateLogin:validate.service' );

            var result = false;

            if( requiredAttributes(user.username, user.password)
                && isValidPassword(user.password)&& isValidEmail(user.username, true))
            {
                LoggerService.info('Validaciones del login correctas');
                result = true;
            }
            else
            {
                LoggerService.warning('Ha ocurrido un error al validar los datos introducidos');
            }

            LoggerService.debug( 'Entrando al metodo validateLogin:validate.service con resultado: ' + result );

            return result;
        }


        /**
         * @description: Valida el formulario de registro
         * @param: {user} contiene informacion del usuario (usuario, correo, documento, clave)
         * @return: booleano, true si los datos son correctos, false en caso contrario
         */
        function validateRegister( user )
        {
            LoggerService.debug( 'Entrando al metodo validateRegister:validate.service' );

            var result = false;

            if( requiredAttributes(user.username, user.idnumber, user.password, user.confirmpassword)
                && isValidNumber(user.idnumber)
                && isValidEmail(user.username, true)
                && isValidPassword(user.password)
                && comparePassword(user.password, user.confirmpassword))
            {
                LoggerService.info('Validaciones del registro correctas');
                result = true;
            }
            else
            {
                LoggerService.warning('Ha ocurrido un error al validar los datos introducidos');
            }

            LoggerService.debug( 'Entrando al metodo validateRegister:validate.service con resultado: ' + result );

            return result;
        }


        /**
         * @description: Valida el formulario para recuperacion de contrasena
         * @param: {email} correo electronico del usuario
         * @return: booleano, true si es correcto, false en caso contrario
         */
        function validateRecoverPassword( email )
        {
            LoggerService.debug( 'Entrando al metodo validateRecoverPassword:validate.service' );

            var result = false;

            if( requiredAttributes( email )
                && isValidEmail( email, true ))
            {
                LoggerService.info('Validaciones de recuperar clave correctas');
                result = true;
            }
            else
            {
                LoggerService.warning('Ha ocurrido un error al validar los datos introducidos');
            }

            LoggerService.debug( 'Entrando al metodo validateRecoverPassword:validate.service con resultado: ' + result );

            return result;
        }


        /**
         * @description: Valida el formulario para cambiar datos del usuario
         * @param: {user} contiene informacion del usuario (clave, confirmacion y id)
         * @return: booleano, true si los datos son correctos, false en caso contrario
         */
        function validateChangePassword( user )
        {
            LoggerService.debug( 'Entrando al metodo validateChangePassword:validate.service' );

            var result = false;

            if(requiredAttributes(user.idnumber, user.password, user.confirmpassword)
                && comparePassword(user.password, user.confirmpassword)
                && isValidPassword (user.password))
            {
                LoggerService.info('Validaciones de cambio de clave correctas');
                result = true;
            }
            else
            {
                LoggerService.warning('Ha ocurrido un error al validar los datos introducidos');
            }

            LoggerService.debug( 'Entrando al metodo validateChangePassword:validate.service con resultado: ' + result );

            return result;
        }


        /**
         * @description: Valida el formulario para cambiar el correo del usuario
         * @param: {user} contiene informacion del usuario (correo y id)
         * @return: booleano, true si los datos son correctos, false en caso contrario
         */
        function validateChangeEmail( user )
        {
            LoggerService.debug( 'Entrando al metodo validateChangeEmail:validate.service' );

            var result = false;

            if(requiredAttributes(user.idnumber, user.email)
                && isValidEmail(user.email, true))
            {
                LoggerService.info('Validaciones de cambio de correo correctas');
                result = true;
            }
            else
            {
                LoggerService.warning('Ha ocurrido un error al validar los datos introducidos');
            }

            LoggerService.debug( 'Entrando al metodo validateChangeEmail:validate.service con resultado: ' + result );

            return result;
        }


        /**
         * @private
         * @description: Valida si el campo posee un correo valido
         * @param: {email} direccion de correo electronico del usuario
         * @return: booleano, true si es correcto, false en caso contrario
         */
        function isValidEmail( email, turnMessage )
        {
            LoggerService.debug( 'Entrando al metodo isValidEmail:validate.service' );

            var pattern = /^(([^<>(){}\[\]\\.,;:'*/$%&\s@"]+(\.[^<>(){}\[\]\\.,;:'*/$%&\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var re = new RegExp( pattern );
            var m = re.exec( email );
            var result = false;

            if ( m == null)
            {
                if(turnMessage)
                    MessageService.addMessage( $filter('translate')('messageserror-invalidemail'), true);

                LoggerService.warning('El correo introducido no posee un formato valido');
            }
            else
            {
                LoggerService.info('Email con formato valido');
                result = true;
            }

            LoggerService.debug( 'Entrando al metodo isValidEmail:validate.service con resultado: ' + result );

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
            LoggerService.debug( 'Entrando al metodo isValidPassword:validate.service' );

            var pattern = /^[a-z0-9_.!]{6,30}$/i;
            var re = new RegExp( pattern );
            var m = re.exec( password );
            var result = false;

            if ( m == null )
            {
                LoggerService.warning('La clave introducida no posee un formato valido');
            }
            else
            {
                LoggerService.info('Clave con formato valido');
                result = true;
            }

            LoggerService.debug( 'Entrando al metodo isValidPassword:validate.service con resultado: ' + result );


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
            LoggerService.debug( 'Entrando al metodo isValidText:validate.service' );

            var pattern = /^[a-zA-Z ]{3,15}$/;
            var re = new RegExp( pattern );
            var m = re.exec( text );
            var result = false;

            if( m == null )
            {
                LoggerService.warning('El texto introducido solo puede tener caracteres alfabeticos');
            }
            else
            {
                LoggerService.info('Texto valido');
                result = true;
            }

            LoggerService.debug( 'Entrando al metodo isValidText:validate.service con resultado: ' + result );

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
            LoggerService.debug( 'Entrando al metodo isValidNumber:validate.service' );

            var result = false;

            if( isNaN( number ) )
            {
                LoggerService.warning('El texto introducido solo puede tener caracteres numericos');
            }
            else
            {
                LoggerService.info('Valor numerico valido');
                result = true;
            }

            LoggerService.debug( 'Entrando al metodo isValidNumber:validate.service con resultado: ' + result );

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
            LoggerService.debug( 'Entrando al metodo requiredAttributes:validate.service' );

            var result = true;

            for(var i = 0; i < arguments.length; i++)
            {
                if(arguments[i] === undefined || arguments[i] === null)
                {
                    LoggerService.warning('El campo ' + arguments[i] + ' es requerido');
                    result = false;
                }
            }

            if(!result )
                console.log('bien');

            LoggerService.debug( 'Entrando al metodo requiredAttributes:validate.service con resultado: ' + result );

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
            LoggerService.debug( 'Entrando al metodo comparePassword:validate.service' );

            var result = false;

            if(password !== retypePassword )
            {
                LoggerService.warning('Las claves no coinciden');
            }
            else
            {
                result = true;
                LoggerService.info('Comparacion de clave correcta');
            }

            LoggerService.debug( 'Entrando al metodo comparePassword:validate.service con resultado: ' + result );

            return result;
        }




    }

})();
