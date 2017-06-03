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
                MessageService.error(input, 'The field @ must be text');
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
                MessageService.error(input, 'The field @ must be a number');
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