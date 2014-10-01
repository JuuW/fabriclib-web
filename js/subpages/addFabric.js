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
                $.ajax({
                    type: "post",
                    url: formURL,
                    cache: false,
                    data: postData,
                    // cache:false,
                    // dataType:'json',
                    success: function(data) {
                        $("#footer").html(data);
                    },
                    error: function() {
                        $("#footer").html("error");
                    }
                });
            } else {
                $("#fabric_table_msg").html("<div><span class='empty_message'>Please check input data</span></div>");
            }


        });

        function isEmpty(items) {
            var result = false;

            $(".required input").each(function(i, n) {
                if ($(n).val() == "") {
                    // $(n).after("<span class='empty_message'>can't be empty!</span>");
                    // $(n).css({
                    //     "background-color": "red"
                    // });
                    result = true;
                };
            });

            return result;

        }

        function addRequireStar(items) {

            for (var item in items) {
                $(item).after("*");
            }
        }
    })();