<?php
	// Set the proper response header
	header('Content-type: text/javascript'); 
?>

(function() {

    // Internal Notification Render
    function _notifier(on, id, message) {
        $(function() {
            var messageId = "#SimplrNotify_" + id;
            if(on) {
                if($("#SimplrNotify").size() == 0) {
                    var containerHTML = '<div id="SimplrNotify" style="position: fixed; z-index: 100000; top: 0; left: 0; width: 100%; box-shadow: 0 0 5px #000; text-transform: none; font-family: Arial; text-align: center; font-size: 16px; font-weight: normal; color: #000; background: #ccc none; line-height: 1.25; padding: 0; margin: 0; border: 0;"><!-- --></div>';
                    $("body").prepend(containerHTML);
                }
                if($(messageId).size() == 0) {
                    var messageHTML =   '<p id="' + messageId.replace("#", "") + '" style="margin: 10px 0; padding: 0;">' + message + '</p>';
                    $("div#SimplrNotify").append(messageHTML);                    
                }
            } else {
                $(messageId).remove();
                if($("#SimplrNotify").is(":empty")) {
                    $("#SimplrNotify").remove();
                }
            }
        });
    }    
    
    // Base Object
    window.Simplr = {};

	<?php
	
		// Cache
		include("cache/cache.js");
		
		// Controller
		include("controller/controller.js");
	
		// Cookie	
		include("cookie/cookie.js");
	
        // Console
        include("console/console.js");
    	
		// Form
		include("form/form.js");
		
		// Layout
		include("layout/layout.js");
		
		// Trigger
		include("trigger/trigger.js");
		
		// Util
		include("util/util.js");
		
		// Validation
		include("validation/validation.js");
        include("validation/defaultCodesAndValidators.js");
		
		// View
		include("view/view.js");
		
	?>

})();