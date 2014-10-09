(function() {
	var fabric_table = $('#searchFabricRes').dataTable({
		"data" : [],
		"columns" : [ {
			"class" : 'details-control',
			"orderable" : false,
			"data" : null,
			"defaultContent" : '<a>Detail</>',
				title : "Detail"
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
		"scrollX" : true,
	});

	function loadTableDate(dataStr) {
		var data = JSON.parse(dataStr);
		fabric_table.fnClearTable();
		if (data && data.length) {
			fabric_table.fnAddData(data, true);
		}
		addClick();
	}

	function addClick() {

		$('#searchFabricRes tbody').on('click', "td.details-control",
				function() {
					var sTitle;
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
		var htmlStr = 			
			"<tr class='fabric_extend'>" +
				"<td colspan='"+columnNum+"'>" 
				 	+ "<div class='container-fluid'>"
				 		+ "<div id='"+fabricExtid+"'  class='barcodearea col-sm-4 container-fluid'>"
				 		+"<table  class='barcode_extend'>"
				 			+ "<tr><td>Hanger No. </td><td>"+hangerNo_+"</td></tr>" 
				 			+ "<tr><td>Content  </td><td>"+content_+"</td></tr>" 
				 			+ "<tr><td>Width  </td><td>"+width_+"</td></tr>" 
				 			+ "<tr><td>Finishing  </td><td>"+fanishing_+"</td></tr>" 
				 			+ "</table>"
				 			+ "<img id='"+barcodeid+"'></br>"+
				 			"</div>"
				 		+ "<div id='"+fabricImgFrameid+"' class='fabric_img_area col-sm-4 container-fluid'>"
				 			+ "<img id='"+fabricImgid+"' src=''>" 
				 		+ "</div>" 
				 	+ "</div>"
				+ "</td>" 
			+ "</tr>";
        
		tr.after(htmlStr);
		var thisTr = $(tr).next();
		
		
		$("#"+barcodeid).JsBarcode(hangerNo_,{displayValue: false});
		$("#"+fabricImgid).attr("src","./img/fabric_" + id_ + ".jpg");
		$("#"+fabricImgid).attr("onerror","this.src='./img/fabric_fabric_notexist.jpg");
		
		$("#"+fabricImgFrameid).css("height",$("#"+fabricExtid).css("height"));

	}

	$("#searchFabricForm").submit(function(event) {
		event.preventDefault();
		var $form = $(this);
		var postData = $form.serializeArray();
		var formURL = $form.attr("action");

		$("#footer").html("");
		$.ajax({
			type : "post",
			url : formURL,
			cache : false,
			data : postData,
			success : function(data) {
				loadTableDate(data);
			},
			error : function() {
				$("#footer").html("error");
			}
		});
	});
})();