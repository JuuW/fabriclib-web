(function() {
	// var moreHtml ="<li class='dropdown'>"
	// +"<a href='#' class='dropdown-toggle' data-toggle='dropdown'>More <span
	// class='caret'></span></a>"
	// +"<ul class='dropdown-menu' role='menu'>"
	// +"<li><a href='#'>Modify</a></li>"
	// +" <li><a href='#'>Delete</a></li>"
	// +"<li class='divider'></li>"
	// +"<li><a href='#'>Detail</a></li>"
	// +"</ul></li>";
	var fabric_table;
	var dataRec;
	 
	
	 $("#search_fabric").html(lang.Search);
	 $("#more_option").html(lang.MoreOptions);
	
    function initialTable(){
    	
    	var moreHtml = '<a>'+lang.More+'..</a>';
    	var showRecordNum = "<select><option value='5'>5</option><option value='10'>10</option><option value='20'>20</option></select>";

    	datatables_lang.sLengthMenu = lang.Display  + showRecordNum + lang.Records;
    	
    	fabric_table = $('#searchFabricRes').dataTable({
    		"data" : [],
    		"columns" : [ {
    			"class" : 'details-control noteditable',
    			"orderable" : false,
    			"data" : null,
    			"defaultContent" : moreHtml,
    			title : "More.."
    		}, {
    			"data" : "id",
    			title : "Id",
    			"class" : 'noteditable'
    		}, {
    			"data" : "hangerNo",
    			title : "Hanger No.",
    			"width" : "15%",
    			"class" : 'noteditable'
    		}, {
    			"data" : "inputDate",
    			title : "Input Date",
    			"width" : "15%",
    			"class" : 'noteditable'
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
    			"width" : "20%"
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
    			"width" : "15%"
    		}, {
    			"data" : "originalPrice",
    			title : "Original Price",
    			"width" : "10%"
    		}, {
    			"data" : "finalPrice",
    			title : "Final Price",
    			"width" : "10%"
    		} ],
    		// "scrollY" : 200,
    		"scrollX" : true,
//    		"bAutoWidth": false,
    		 "bLengthChange": true,
    		"iDisplayLength" : 5,
    		
    		 "oLanguage": datatables_lang
    		
//    		 "fnDrawCallback": function () {
//    	            $('#searchFabricRes tbody td').editable( '/ModifyFabric.do'
//    	            		,         		{ "callback": function( sValue, y ) {
////    	                    /* Redraw the table from the new data on the server */
//////    	                    oTable.fnDraw();
//    	                },
//    	                "height": "14px"
//    	            } );
//    	        }

    	});
    	
    }
	function loadTableDate(dataStr) {
		var data = JSON.parse(dataStr);
		if(fabric_table==null){
			initialTable();
		}
		fabric_table.fnClearTable();
		if (data && data.length) {
			fabric_table.fnAddData(data, true);
			dataRec = data;
		}
		moreOption();
		// modifyEvent();
		addEditable();
	}
	
	function addEditable(){
		fabric_table.$('td:not(.noteditable)').editable( './ModifyFabric.do', {
	        "callback": function( sValue, y ) {
	            var aPos = fabric_table.fnGetPosition( this );
	            console.log("C=");
	            console.log(aPos);
	            console.log(y);
	            console.log(sValue);
	            if(sValue=="false"){
	            	alert("update fail!");
	            }else{
	            	fabric_table.fnUpdate( sValue, aPos[0], aPos[1] );
	            }
	        },
	        "submitdata": function ( value, settings ) {
	        	var columnIndex = fabric_table.fnGetPosition( this )[2];
	        	var column = fabric_table.fnSettings().aoColumns[columnIndex].data;
	            return {
	                "fid": $(this.parentNode).children("td")[1].innerHTML,
//	                "fid": this.parentNode.getAttribute('role'),
	                "column": column
	            };
	        },
	        "height": "100%",
	        "width": "100%"
	    } );
	}
	// function modifyEvent() {
	// $('#searchFabricRes .editable').dblclick(function() {
	// var value = $(this).html();
	// var width = $(this).width();
	// var input = "<input style='width:" + width + "' name='"
	// "" + "' type='text' value='" + value + "' />";
	// $(this).html(input);
	// });
	// }
	function moreOption() {
		$('#searchFabricRes tbody').on('click', "td.details-control",
				function() {
					var tr = $(this).closest('tr');

					var nexttr = $(tr).next();

					if (nexttr.hasClass("fabric_extend")) {
						if (nexttr.css("display") == "none") {
							$(".fabric_extend").css("display", "none");
							nexttr.css("display", "");
							$(tr).addClass("shown");
						} else {
							nexttr.css("display", "none");
							$(tr).removeClass("shown");
						}
					} else {
						$(".fabric_extend").css("display", "none");
						addRow(tr, this);
						$(tr).addClass("shown");
						$(tr).removeClass("shown");
					}

				});
	}
	function printBarcode() {
		$(".printBarcode").click(function(e) {
			var w = window.open('about:blank');
			var html = $(e.target).closest("td").find(".barcodearea").html();
			w.document.body.innerHTML = html;
			w.print();
		});
	}
	function deleteBarcode() {
		$(".deleteBarcode")
				.click(
						function(e) {
							if (confirm(lang.DeleteConfirm)) {
								var id_ = $(e.target).closest("td").find(
										"#hangerId").attr("value");
								$.ajax({
									type : "post",
									url : "./DeleteFabric.do",
									cache : false,
									data : {
										"hangerId" : id_
									},
									success : function(data) {
										// alert(data);
										if (data == "true") {
											$(e.target).closest("tr").prev()
													.addClass('deleting');
											$(e.target).closest("tr").remove();
											// if ( $(this).hasClass('selected')
											// ) {
											// $(this).removeClass('selected');
											// }
											// else {
											// table.$('tr.selected').removeClass('selected');
											// $(this).addClass('selected');
											// }
											fabric_table.api().row(".deleting")
													.remove().draw(false);
										} else {
											alert(lang.DeleteFail);
										}
									},
									error : function() {
										alert(data);
									}
								});
							}
						});
	}
	function modifyBarcode() {

		$(".modifyBarcode").click(function(e) {

			$("#fabricModify").css("display", "");

			var tr = $(e.target).closest("tr").prev();
			var tds = tr.children("td");
			if ($(tr).hasClass('selected')) {
				$(tr).removeClass('selected');
			} else {
				fabric_table.$('tr.selected').removeClass('selected');
				$(tr).addClass('selected');
			}
			var columns = fabric_table.fnSettings().aoColumns; // you can find
			$("#cancel_fabric").attr("href", "index.html#" + $(tds[1]).html());
			//				
			for ( var i in columns) {
				setModifyForm(tds[i], columns[i].data);
			}
			// tr.addClass('editing');
			// taggleDisplayModify();
		});
	}
	function setModifyForm(td, columnName) {
		var input = $("#fabricModify #" + columnName);
		$(input).attr("value", $(td).html());
		console.log(columnName);
		if (columnName == "hangerNo" || columnName == "id") {
			$(input).attr("readonly", "readonly");
		}
	}

	// function cancelBarcode() {
	// $(".cancelBarcode").click(function(e) {
	// var tr = $(e.target).closest("tr").prev();
	// var tds = tr.children("td");
	// var id = $(tds[1]).html();
	// var columns = fabric_table.fnSettings().aoColumns;
	// var thisLine;
	//					
	// for ( var i in dataRec) {
	// var line = dataRec[i];
	// if(line.id == id){
	// thisLine = line;
	// break;
	// }
	// }
	//					
	// for (var i = 4; i < 16; i++) {
	// revertInputFormat(thisLine,tds[i], columns[i]);
	// }
	//					
	// tr.removeClass('editing');
	// taggleDisplayModify();
	// });
	// }
	// function submitBarcode() {
	// $(".submitBarcode").click(function(e) {
	//					
	// $.ajax({
	// type : "post",
	// url : "/ModifyFabric.do",
	// cache : false,
	// data : postData,
	// success : function(data) {
	// loadTableDate(data);
	// $("#search_fabric").removeAttr("disabled");
	// },
	// error : function() {
	// $("#footer").html("error");
	// $("#search_fabric").removeAttr("disabled");
	// }
	// });
	// taggleDisplayModify();
	// });
	// }

	// switch display of modify,cancel and submit/
	// function taggleDisplayModify() {
	//
	// if ($(".submitBarcode").css("display") == "none") {
	// $(".submitBarcode").css("display", "");
	// } else {
	// $(".submitBarcode").css("display", "none");
	// }
	// if ($(".modifyBarcode").css("display") == "none") {
	// $(".modifyBarcode").css("display", "");
	// } else {
	// $(".modifyBarcode").css("display", "none");
	// }
	// if ($(".cancelBarcode").css("display") == "none") {
	// $(".cancelBarcode").css("display", "");
	// } else {
	// $(".cancelBarcode").css("display", "none");
	// }
	// }

	// function setInputFormat(td, column) {
	// var value = $(td).html();
	// var input = "<input style='width:" + column.sWidth + "' name='"
	// + column.data + "' type='text' value='" + value + "' />";
	// $(td).html(input);
	// }
	// function revertInputFormat(thisLine,td, column) {
	// var value = thisLine[column.data];
	//						
	// // var value = $(td).html();
	// // var input = "<input style='width:" + column.sWidth + "' name='"
	// // + column.data + "' type='text' value='" + value + "' />";
	// $(td).html(value);
	// }

	function addPic() {
		$(".addImageForm")
				.submit(
						function(event) {

							event.preventDefault();

							var path = $(event.target).children(
									"#fabric_upload").val();
							if (path == "") {
								alert(lang.ImgPathAlert);
								return true;
							}

							var $form = $(event.target);
							var postData = $form.serializeArray();
							var formURL = $form.attr("action");
							var data = new FormData($form[0]);
							$.ajax({
								type : "post",
								url : formURL,
								cache : false,
								data : data,
								contentType : false,
								processData : false,
								success : function(dataStr) {
									var imgUrl = $(event.target).parent()
											.prev().attr("src")
											+ "?" + Math.random();
									$(event.target).parent().prev().attr("src",
											imgUrl);
								},
								error : function() {
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
		var htmlStr = "<tr class='fabric_extend'>" + "<td colspan='"
				+ columnNum
				+ "'>"
				+ "<a name="
				+ id_
				+ "></a>"
				+ "<div class='container-fluid'>"
				+ "<div  class='printBarcode clicklink'  fabricExtid = '"
				+ fabricExtid
				+ "' ><a>"+lang.Print+"</a></div>"
				+ "<div  class='deleteBarcode clicklink' fabricExtid = '"
				+ fabricExtid
				+ "' ><a>"+lang.Delete+"</a></div>"
				+ "<div  class='modifyBarcode clicklink' fabricExtid = '"
				+ fabricExtid
				+ "' ><a href='index.html#0'>"+lang.Modify+"</a></div>"
				+ "<div  class='submitBarcode clicklink' fabricExtid = '"
				+ fabricExtid
				+ "' ><a>Submit</a></div>"
				+ "<div  class='cancelBarcode clicklink' fabricExtid = '"
				+ fabricExtid
				+ "' ><a>Cancel</a></div>"
				+ "</div>"
				+ "<div class='container-fluid'>"
				+ "<div class='barcodearea col-sm-4 container-fluid'>"
				+ "<div  id='"
				+ fabricExtid
				+ "'  >"
				+ "<table  class='barcode_extend'>"
				+ "<tr><td>Hanger No. </td><td>"
				+ hangerNo_
				+ "</td></tr>"
				+ "<tr><td>Content  </td><td>"
				+ content_
				+ "</td></tr>"
				+ "<tr><td>Width  </td><td>"
				+ width_
				+ "</td></tr>"
				+ "<tr><td>Finishing  </td><td>"
				+ fanishing_
				+ "</td></tr>"
				+ "<tr><td>&nbsp;</td></tr>"
				+ "<tr><td>&nbsp;</td></tr>"
				+ "</table>"
				+ "<img id='"
				+ barcodeid
				+ "'></br>"
				+ "</div>"
				+ "</div>"
				+ "<div id='"
				+ fabricImgFrameid
				+ "' class='fabric_img_area col-sm-4 container-fluid'>"
				+ "<img id='"
				+ fabricImgid
				+ "' src=''>"
				+ "<div>"
				+ "<form class='addImageForm' action='"
				+ actionUrl
				+ "' enctype='multipart/form-data' method='post'>"
				+ "<input  type='hidden' id='hangerId' name='hangerId' value='"
				+ id_
				+ "'>"
				+ "<input type='file' id='fabric_upload' name ='file'  ACCEPT='image/jpeg'>"
				+ "<button type='submit' class='btn btn-primary' id='add_fabric'>"+lang.AddUpdatePic+"</button>"
				+ "</form>" + "</div>" + "</div>" + "</div>" + "</td>"
				+ "</tr>";

		tr.after(htmlStr);
		$(".modifyBarcode").css("display", "none");
		$(".submitBarcode").css("display", "none");
		$(".cancelBarcode").css("display", "none");
		printBarcode();
		deleteBarcode();
		modifyBarcode();
//		submitBarcode();
//		cancelBarcode();

		addPic();

		var thisTr = $(tr).next();

		$("#" + barcodeid).JsBarcode(hangerNo_, {
			displayValue : false
		});

		$("#" + fabricImgid).attr("src", "./img/fabric_" + id_ + ".jpg");

		// set image height
		var imgHeight = (document.getElementById(fabricExtid).offsetHeight * 0.8)
				+ "px";
		$("#" + fabricImgid).css("height", imgHeight);

		$("#" + fabricImgFrameid).css("height",
				$("#" + fabricExtid).css("height"));
	}

	$("#modifyFabricForm").submit(function(event) {
		event.preventDefault();
		var $form = $(this);
		var postData = $form.serializeArray();
		var formURL = $form.attr("action");
		$("#submit_fabric").attr("disabled", true);
		$.ajax({
			type : "post",
			url : formURL,
			cache : false,
			data : postData,
			success : function(data) {
				$("#submit_fabric").removeAttr("disabled");
				$("#footer").html(data);
				
			},
			error : function() {
				$("#footer").html("error");
				$("#submit_fabric").removeAttr("disabled");
			}
		});
	});
	$("#cancel_fabric").click(function(event) {
		$("#fabricModify").css("display", "none");
	});
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