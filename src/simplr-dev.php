<?php
	// Set the proper response header
	header('Content-type: text/javascript'); 
?>

(function() {

    // Base Object
    window.simplr = {};
    
    // We are going to do storage on this
    // so we'll create a dataStorage bucket
    simplr.dataStorage = {};
    
	<?php
	
		// cache
		include("cache.js");
		
		// View
		include("view.js");
		
		
		
	
		// Cache
		//include("cache/cache.js");
		
		// Controller
		//include("controller/controller.js");
	
		// Cookie	
		//include("cookie/cookie.js");
	
        // Console
        //include("console/console.js");
    	
		// Form
		//include("form/form.js");
		
		// Layout
		//include("layout/layout.js");
		
		// Trigger
		//include("trigger/trigger.js");
		
		// Util
		//include("util/util.js");
		
		// Validation
		//include("validation/validation.js");
        //include("validation/defaultCodesAndValidators.js");
		
		
		
	?>

})();