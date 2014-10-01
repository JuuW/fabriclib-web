//         $.post("action/Search", $("#form1").serialize(),
//         function(data) {
//         $("#result").html(data);
//         }, "xml");

//         $.post("action/Search", {
//         username : $("#username").val(),
//         password : $("#password").val(),
//         lines : $("#lines").val()
//         },
//        
//         function(data) {
//        
//         alert("Data Loaded: " + data);
//         $("#result").html(data);
//        
//         });


//        var jqxhr = $.post("action/Search", $("#form1").serialize())
//            .done(function(data) {
//                $("#result").html(data);
//            })
//            .fail(function() {
//                alert("error");
//            })
//            .always(function() {
//                alert("finished");
//            });
//        jqxhr.always(function() {
//            alert("second finished");
//        });
    //	$.post("action/Search", )
//    	var jqxhr = $.post( "action/Search",$("#form1").serialize(), function() {
//    		
//    		  alert( "success" );
//    		})
//    		  .done(function() {
//    		    alert( "second success" );
//    		  })
//    		  .fail(function() {
//    		    alert( "error" );
//    		  })
//    		  .always(function() {
//    		    alert( "finished" );
//    		});
//    		 
//    		// Perform other work here ...
//    		 
//    		// Set another completion function for the request above
//    		jqxhr.always(function() {
//    		  alert( "second finished" );
//    		});


