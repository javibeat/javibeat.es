$(function(){
        $('#send').click(function(e){
            //Stop form submission & check the validation
            e.preventDefault();
            
            // Variable declaration
            var error = false;
            var name = $('#name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var message = $('#message').val();
            
            if(email.length == 0 || email.indexOf('@') == '-1'){
                var error = true;
                $('#email').parent().addClass('has-error has-feedback');
            }else{
                $('#email').parent().removeClass('has-error has-feedback');
            }
            if(name == ''){
                var error = true;
                $('#name').parent().addClass('has-error has-feedback');
            }else{
                $('#name').parent().removeClass('has-error has-feedback');
            }
            if(message == ''){
                var error = true;
                $('#message').parent().addClass('has-error has-feedback');
            }else{
                $('#message').parent().removeClass('has-error has-feedback');
            }
            
            // If there is no validation error, next to process the mail function
            if(error == false){
               // Disable submit button just after the form processed 1st time successfully.
                $('#send').attr({'disabled' : 'true', 'value' : 'Sending' });
                /* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
                $.post("php/email.php", $("#form").serialize(),function(result){
                    if(result == 'sent'){
                        //If the email is sent successfully, remove the submit button
                        $('#send').attr({'disabled' : 'true', 'value' : 'Thank you!' });
                    } else {
                        $('#send').removeAttr('disabled').attr('value', 'Send');
                    }
                });
            }
        });    
    });
