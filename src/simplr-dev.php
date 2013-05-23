<?php
	// Set the proper response header
	header('Content-type: text/javascript'); 
?>

(function() {

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
		include("layout/innerxhtml.js");
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