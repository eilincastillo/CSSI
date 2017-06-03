(function()
{
    'use strict';

    angular.module('cssi.services.validate').service('MessageService', [MessageService]);

    function MessageService()
    {
        let messages;

        this.addMessage = addErrorMessage;
        this.show = displayErrorMessages;
        this.error = inputErrorState;
        this.success = inputSuccessState;
        this.size = size;

        init();

        function init()
        {
            messages = new Array();
        }

        function size()
        {
            return messages.length;
        }

        function addErrorMessage(message)
        {
            if(messages.length > 0)
            {
                messages.forEach(function(val)
                {
                    if(message != val)
                        messages.push(message);
                });
            }
            else
            {
                messages.push(message);
            }
        }

        function displayErrorMessages()
        {
            let alert = document.getElementById('global-message');


            if(alert)
            {
                clearErrorMessages();

                messages.forEach(function(message)
                {
                    let messageNode = document.createElement('p');
                    let messageContent = document.createTextNode(message);

                    messageNode.appendChild(messageContent);
                    alert.appendChild(messageNode);
                });

                messages = [];

            }


        }

        function clearErrorMessages()
        {
            let alert = document.getElementById('global-message');

            if(alert && alert.children.length > 0)
            {
                for(let i = 0; i < alert.children.length; i++)
                {
                    alert.children[i].remove();
                }
            }
        }

        function displayErrorMessage(input, message)
        {
            var alert = document.getElementById(input.dataset.field);

            if(alert)
            {
                var re = /[@]/;

                if(message.match(re) != null)
                    message = message.replace(re, input.name);

                alert.innerText = message;
            }
        }


        function inputErrorState(input, errorMessage)
        {
            input.classList.add('error');
            input.classList.remove('success');
            displayErrorMessage(input, errorMessage);
        }

        function inputSuccessState(input)
        {
            input.classList.add('success');
            input.classList.remove('error');
            displayErrorMessage(input, '');
        }
        


    }

})();