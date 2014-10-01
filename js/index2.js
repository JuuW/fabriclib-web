$(document).ready(function() {
	$('#example').dataTable({
		"paging" : false,
		"ordering" : true,
		"info" : false,
		"columnDefs" : [ {
			"targets" : [ 2 ],
			"visible" : false,
			"searchable" : false
		}, {
			"targets" : [ 3 ],
			"visible" : false
		} ],
		"language" : {
			"lengthMenu" : "Display _MENU_ records per page",
			"zeroRecords" : "Nothing found - sorry",
			"info" : "Showing page _PAGE_ of _PAGES_",
			"infoEmpty" : "No records available",
			"infoFiltered" : "(filtered from _MAX_ total records)"
		}
	});
});