(function()
{
    'use strict';

    angular.module('cssi.services.message').service('MessageService', [MessageService]);

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
            let alert = document.getElementById('alert-danger');


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
            let alert = document.getElementById('alert-danger');

            if(alert && alert.children.length > 0)
            {
                for(let i = 0; i < alert.children.length; i++)
                {
                    alert.children[i].remove();
                }
            }
        }

        function displayErrorMessage(input)
        {
            var container = input.parentElement;

            if(container)
            {
                var messageNode = document.createElement('span');
                var messageContent = document.createTextNode('Error');

                messageNode.appendChild(messageContent);
                container.appendChild(messageNode);
            }


        }


        function inputErrorState(input)
        {
            input.classList.add('error');
            input.classList.remove('success');
            displayErrorMessage(input);
        }

        function inputSuccessState(input)
        {
            input.classList.add('success');
            input.classList.remove('error');
            clearErrorMessage();
        }
        


    }

})();