 (function() {

        function checkFormField($form) {
            var error = false;
            var hangerNo = $form.find("input[name='hangerNo']"),
                    content = $form.find("input[name='content']");
            if(!hangerNo.val()) {
                hangerNo.addClass("error");
                error = true;
            }else {
                hangerNo.removeClass("error");
            }
            if(!content.val()) {
                content.addClass("error");
                error = true;
            }else {
                content.removeClass("error");
            }
            return error;
        }
        
        function doSuccess(dataStr) {
        	var data = JSON.parse(dataStr);
        	console.log(dataStr);
        	console.log(data);
        		for (var i = 0; i < data.length; i++) {
        			var item = data[i];
        		var $div = $("<div></div>");
        		console.log(item);
				if(item.msgType == "S"){
					$($div).css("background-color","rgba(0,255,0,.5)");
				}else{
					$($div).css("background-color","rgba(255,0,0,.5)");
				}
				$($div).html(i+" : "+item.msg);
				$("#footer").append($div);
			}
        }

        $( "#addFabricForm" ).submit(function( event ) {

            // Stop form from submitting normally
            event.preventDefault();

            // Get some values from elements on the page:
            var $form = $( this ),
                    postData = $form.serializeArray(),
                    formURL = $form.attr( "action" );

            if (!checkFormField($form)) {
                $("#fabric_table_msg").html("");
                $("#footer").html("");

                var data = new FormData($(this)[0]);
                $("add_fabric").attr("disabled", true); 
                $.ajax({
                    type: "post",
                    url: formURL,
                    cache: false,
                    data: data,
                    contentType: false,
                    processData :false,
                    // dataType:'json',
                    success: function(dataStr) {
                    	doSuccess(dataStr) ;
                    	$("#add_fabric").removeAttr("disabled");
                    },
                    error: function() {
                        $("#footer").html("error");
                        $("#add_fabric").removeAttr("disabled");
                    }
                });
                
                
                
                
            } else {
                $("#fabric_table_msg").html("<div><span class='empty_message'>Please check input data</span></div>");
            }
        });
    })();