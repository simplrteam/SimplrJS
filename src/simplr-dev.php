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
		
		// view
		include("view.js");
		
		// command
		include("command.js");
		
		// template
		include("template.js");
		
		// form
		include("form.js");
		include("form-defaultCodesAndValidators");
	?>

})();