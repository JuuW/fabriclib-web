$(document).ready(function(){

	        function checkFormField($form) {
	            var error = false;
	            var username = $form.find("input[name='username']"),
	                password = $form.find("input[name='password']");
	            if(!trim(username.val())) {
	            	username.addClass("error");
	                error = true;
	            }else {
	            	username.removeClass("error");
	            }
	            if(!password.val()) {
	            	password.addClass("error");
	                error = true;
	            }else {
	            	password.removeClass("error");
	            }
	            return error;
	        }

	        $( "#login_form" ).submit(function( event ) {

	            event.preventDefault();

	            var $form = $( this ),
	                    postData = $form.serializeArray(),
	                    formURL = $form.attr( "action" );

	            if (!checkFormField($form)) {
	            	$("#login_msg").html("&nbsp");
	                $.ajax({
	                    type: "post",
	                    url: formURL,
	                    cache: false,
	                    data: postData,
	                    success: function(data) {
//	                    	alert(data);
	                    	var data = JSON.parse(data);
	                    	if(data.username){
//	                    		 window.open("./index.html"); // open a pop-up window
	                             window.location = "./index.html";
	                    	}else{
	                    		$("#login_msg").html("username is not exist or not match with password!");
	                    	}
//	                        $("#login_msg").html(data);
	                    },
	                    error: function() {
	                        $("#login_msg").html("error");
	                    }
	                });
	            } else {
	                $("#login_msg").html("<div><span class='empty_message'>Please check input data</span></div>");
	            }


	        });


	    });

function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
	} 
	function ltrim(str){ 
	return str.replace(/(^\s*)/g,""); 
	} 
	function rtrim(str){ 
	return str.replace(/(\s*$)/g,""); 
	} 