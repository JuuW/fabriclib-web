(function() {
	
	
    $(document).ready(function() {
    	
//    	$("#barcode").JsBarcode("PLN-HIN-S14-D-03013",{displayValue: true});

        console.log("Let's start :" + new Date().getMilliseconds());

        $("#nav-user").click(function(e) {
            e.preventDefault();
            getNavPage("subpages/user.html");
            activeMenu("nav-user");
        });
        $("#nav-fabric").click(function(e) {
            e.preventDefault();
            getNavPage("subpages/fabric.html");
            activeMenu("nav-fabric");
        });
    });

    function getNavPage(pageUrl) {
        $("#upper").html("");
        $("#middle").html("");
        $.ajax({
            type : "get",
            url : pageUrl,
            cache : false,
            success : function(data) {
                $("#upper").html(data);
            },
            error : function() {
                $("#upper").html("error");
            }
        });
    }

    function activeMenu(menu) {
        $(".main-menu li.active").removeClass("active");
        $(".main-menu #" + menu).addClass("active");
    }
})();
