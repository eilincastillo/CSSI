(function()
{

    'use strict';

    angular.module('cssi.services.validate').service('ValidateService', ['RuleService', 'MessageService', ValidateService]);

    function ValidateService(RuleService, MessageService)
    {

        this.validateSelection = validateNotEmptySelection;
        this.validateText = validateTextField;
        this.validateNumber = validateNumericField;
        this.requiredFields = requiredFields;


        function validateNotEmptySelection(selectInput)
        {
            if(RuleService.isEmpty(selectInput.value))
                MessageService.success(selectInput);
            else
                MessageService.error(selectInput, 'Please select a valid option');
        }

        function validateTextField(input)
        {
            if(RuleService.isValidText(input.value))
                MessageService.success(input);
            else
                MessageService.error(input, 'The field @ must be text');
        }


        function validateNumericField(input)
        {
            if(RuleService.isValidNumber(input.value))
                MessageService.success(input);
            else
                MessageService.error(input, 'The field @ must be a number');
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
                MessageService.show();
            }

            return result;
        }

    }




})();