(function()
{

    'use strict';

    angular.module('cssi.services.validate').service('ValidateService', ['RuleService', 'MessageService', ValidateService]);

    function ValidateService(RuleService, MessageService)
    {

        this.validateSelection = validateNotEmptySelection;
        this.validateNotEmpty = validateNotEmpty;
        this.validateText = validateTextField;
        this.validateNumber = validateNumericField;
        this.validatePhone = validatePhoneField;
        this.validatePassword = validatePasswordField;
        this.comparePassword = comparePasswordField;
        this.requiredFields = requiredFields;


        function validateNotEmptySelection(selectInput)
        {
            var result = false;

            if(RuleService.isEmptyOption(selectInput.value))
            {
                result = true;
                MessageService.success(selectInput);
            }
            else
            {
                MessageService.error(selectInput, 'Es necesario seleccionar una opción');
            }

            return result;
        }

        
        function validateNotEmpty(input)
        {
            var result = false;

            if(RuleService.isEmpty(input.value))
            {
                result = true;
                MessageService.success(input);
            }
            else
            {
                MessageService.error(input, 'El campo @ es obligatorio');
            }

            return result;
        }

        function validateTextField(input)
        {
            var result = false;

            if(RuleService.isValidText(input.value))
            {
                result = true;
                MessageService.success(input);
            }
            else
            {
                MessageService.error(input, 'El campo @ sólo permite texto');
            }

            return result;
        }

        function validatePhoneField(input)
        {
            var result = false;

            if(RuleService.isValidPhone(input.value))
            {
                result = true;
                MessageService.success(input);
            }
            else
            {
                MessageService.error(input, 'El campo @ debe contener un teléfono válido');
            }

            return result;
        }


        function validatePasswordField(input)
        {
            var result = false;

            if(RuleService.isValidPassword(input.value))
            {
                result = true;
                MessageService.success(input);
            }
            else
            {
                MessageService.error(input, 'El campo @ no es válido (sólo acepta los carácteres _ y . )');
            }

            return result;
        }


        function comparePasswordField(passInput, retypeInput)
        {
            var result = false;

            if(RuleService.comparePassword(passInput.value, retypeInput.value))
            {
                result = true;
                MessageService.success(retypeInput);
            }
            else
            {
                MessageService.error(retypeInput, 'El campo @ no coincide con la contraseña seleccionada');
            }

            return result;
        }

        function validateNumericField(input)
        {
            var result = false;

            if(RuleService.isValidNumber(input.value))
            {
                result = true;
                MessageService.success(input);
            }
            else
            {
                MessageService.error(input, 'El campo @ sólo permite números');
            }

            return result;
        }


        function requiredFields(entity)
        {
            var result = false;

            if(RuleService.requiredFields(entity))
            {
                result = true;
            }
            else
            {
                MessageService.addMessage('Debe llenar los campos requeridos');
                MessageService.show();
            }

            return result;
        }

    }




})();