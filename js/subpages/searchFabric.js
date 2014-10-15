(function() {
	var fabric_table = $('#searchFabricRes').dataTable({
		"data" : [],
		"columns" : [ {
			"class" : 'details-control',
			"orderable" : false,
			"data" : null,
			"defaultContent" : '<a>More..</a>',
				title : "More.."
		}, {
			"data" : "id",
			title : "Id"
		}, {
			"data" : "hangerNo",
			title : "Hanger No.",
			"width": "15%"
		}, {
			"data" : "inputDate",
			title : "Input Date"
		}, {
			"data" : "cstructnWarp",
			title : "CstructnWarp"
		}, {
			"data" : "cstructnWeft",
			title : "CstructnWeft"
		}, {
			"data" : "yarnWarp",
			title : "YarnWarp"
		}, {
			"data" : "content",
			title : "Content",
				"width": "20%"
		}, {
			"data" : "status",
			title : "Status"
		}, {
			"data" : "weaving",
			title : "Weaving"
		}, {
			"data" : "finishing",
			title : "Finishing"
		}, {
			"data" : "width",
			title : "Width"
		}, {
			"data" : "weight",
			title : "Weight"
		}, {
			"data" : "article",
			title : "Article",
			"width": "15%"
		}, {
			"data" : "originalPrice",
			title : "Original Price"
		}, {
			"data" : "finalPrice",
			title : "Final Price"
		} ],
		// "scrollY" : 200,
		"scrollX" : true
	});

	function loadTableDate(dataStr) {
		var data = JSON.parse(dataStr);
		fabric_table.fnClearTable();
		if (data && data.length) {
			fabric_table.fnAddData(data, true);
		}
		moreOption();
	}

	function moreOption() {
		$('#searchFabricRes tbody').on('click', "td.details-control",
				function() {
					var tr = $(this).closest('tr');

					var nexttr = $(tr).next();

					if (nexttr.hasClass("fabric_extend")) {
						if (nexttr.css("display") == "none") {
							nexttr.css("display", "");
							$(tr).addClass("shown");
						} else {
							nexttr.css("display", "none");
							$(tr).removeClass("shown");
						}
					} else {
						addRow(tr, this);
						$(tr).addClass("shown");
					}

				});
	}
	function printBarcode(){
		 $(".printBarcode").click(function(e) {
	            var w = window.open('about:blank');
	            var html = $(e.target).closest("td").find(".barcodearea").html();
	            w.document.body.innerHTML = html;
	            w.print();
	        });
	}
	function deleteBarcode(){
		 $(".deleteBarcode").click(function(e) {
			 if(confirm("Are you sure you want to delete this Entry?")) {
				 var id_ = $(e.target).closest("td").find("#hangerId").attr("value");
				 $.ajax({
		                type : "post",
		                url : "./DeleteFabric.do",
		                cache : false,
		                data : {"hangerId":id_},
		                success : function(data) {
//		                	alert(data);
		                	if(data == "true"){   		
		                		$(e.target).closest("tr").prev().addClass('deleting');
		                		$(e.target).closest("tr").remove();
//		                	if ( $(this).hasClass('selected') ) {
//		                        $(this).removeClass('selected');
//		                    }
//		                    else {
//		                        table.$('tr.selected').removeClass('selected');
//		                        $(this).addClass('selected');
//		                    }
		                		fabric_table.api().row(".deleting").remove().draw( false );
		                	}else{
		                		alert("Deleting is failed!");
		                	}
		                },
		                error : function() {
		                	alert(data);
		                }
		            });
			 }
	        });
	}
	function modifyBarcode(){
		 $(".modifyBarcode").click(function(e) {
	          alert("modify");
	        });
	}
	function addPic(){
		$(".addImageForm").submit(function(event) {

            event.preventDefault();
            
           var path = $(event.target).children("#fabric_upload").val();
           if(path == ""){
        	   alert("Please select image path!");
        	   return true;
           }

            var $form = $(event.target);
            var postData = $form.serializeArray();
            var formURL = $form.attr( "action" );
                var data = new FormData($form[0]);
                $.ajax({
                    type: "post",
                    url: formURL,
                    cache: false,
                    data: data,
                    contentType: false,
                    processData :false,
                    success: function(dataStr) {
                    	var imgUrl = $(event.target).parent().prev().attr("src")+"?"+Math.random();
                    	$(event.target).parent().prev().attr("src",imgUrl);
                    },
                    error: function() {
                    	alert("error");
                    }
                });
        });
	}

	function addRow(tr, td) {
		var columnNum = $('#searchFabricRes thead th').length;

		var nTds = $("td", tr);
		var id_ = $(nTds[1]).text();
		var hangerNo_ = $(nTds[2]).text();
		var content_ = $(nTds[7]).text();
		var fanishing_ = $(nTds[10]).text();
		var width_ = $(nTds[11]).text();
		
		var barcodeid = "barcode_" + id_;
		var fabricImgid = "fabricImg_" + id_;
		var fabricExtid = "fabricExt_" + id_;
		var fabricImgFrameid = "fabricImgFrame_" + id_;
		var actionUrl = "./UpdateFabricPic.do";
		var htmlStr = 	
			"<tr class='fabric_extend'>"
				+ "<td colspan='"+columnNum+"'>" 
					+ "<div class='container-fluid'>"
						+ "<div  class='printBarcode clicklink'  fabricExtid = '"+fabricExtid+"' ><a>Print</a></div>"
						+ "<div  class='deleteBarcode clicklink' fabricExtid = '"+fabricExtid+"' ><a>Delete</a></div>"
						+ "<div  class='modifyBarcode clicklink' fabricExtid = '"+fabricExtid+"' ><a>Modify</a></div>"
					+ "</div>"
				 	+ "<div class='container-fluid'>"
				 			+ "<div class='barcodearea col-sm-4 container-fluid'>"
					 			+ "<div  id='"+fabricExtid+"'  >"
						 			+ "<table  class='barcode_extend'>"
						 				+ "<tr><td>Hanger No. </td><td>"+hangerNo_+"</td></tr>" 
						 				+ "<tr><td>Content  </td><td>"+content_+"</td></tr>" 
						 				+ "<tr><td>Width  </td><td>"+width_+"</td></tr>" 
						 				+ "<tr><td>Finishing  </td><td>"+fanishing_+"</td></tr>" 
						 				+ "<tr><td>&nbsp;</td></tr>" 
						 				+ "<tr><td>&nbsp;</td></tr>" 
						 			+ "</table>"
						 			+ "<img id='"+barcodeid+"'></br>"
					 			+ "</div>"
				 			+"</div>"
					 		+ "<div id='"+fabricImgFrameid+"' class='fabric_img_area col-sm-4 container-fluid'>"
					 			+ "<img id='"+fabricImgid+"' src=''>" 
					 			+ "<div>" 
						 			+ "<form class='addImageForm' action='"+actionUrl+"' enctype='multipart/form-data' method='post'>"
							 			+ "<input  type='hidden' id='hangerId' name='hangerId' value='"+id_+"'>"
							 			+ "<input   type='file' id='fabric_upload' name ='file'  ACCEPT='image/jpeg'>"
							 			+ "<button type='submit' class='btn btn-primary' id='add_fabric'>Add or Update Pic</button>"
						 			+ "</form>"
					 			+ "</div>"
					 		+ "</div>" 
				 	+ "</div>"
				+ "</td>" 
			+ "</tr>";
        
		tr.after(htmlStr);
		
		printBarcode();
		deleteBarcode();
		modifyBarcode();
        addPic();
        
		var thisTr = $(tr).next();
		
		
		$("#"+barcodeid).JsBarcode(hangerNo_,{displayValue: false});
		$("#"+fabricImgid).attr("src","./img/fabric_" + id_ + ".jpg");
		
		$("#"+fabricImgFrameid).css("height",$("#"+fabricExtid).css("height"));
	}

	$("#searchFabricForm").submit(function(event) {
		event.preventDefault();
		var $form = $(this);
		var postData = $form.serializeArray();
		var formURL = $form.attr("action");

		$("#footer").html("");
		$("#search_fabric").attr("disabled", true);
		
		$.ajax({
			type : "post",
			url : formURL,
			cache : false,
			data : postData,
			success : function(data) {
				loadTableDate(data);
				$("#search_fabric").removeAttr("disabled");
			},
			error : function() {
				$("#footer").html("error");
				$("#search_fabric").removeAttr("disabled");
			}
		});
	});
})();