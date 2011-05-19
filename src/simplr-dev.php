<?php
	// Set the proper response header 
	header('Content-type: text/javascript'); 
?>

(function($) {

	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
	};

	var CORE = {
		config : {
			console : false
		}
	};

	<?php 
		include("CORE/CORE.console.js"); 
		include("CORE/CORE.util.js");
		include("CORE/CORE.ui.js");
		include("CORE/CORE.validation.js");
	?>
	var simplr = window.simplr = {
		config : {
			mToggleConsole : function(on) {
				$("#_simplr_core_console").remove();
				CORE.config.console = false;
				if(on) {
					try {
						if( typeof window.console != "undefined" && typeof window.console.group != "undefined") {
							$(function() {
								var consoleHTML = '<p id="_simplr_core_console" style="margin: 0; text-align: center; position: fixed; top: 0; width: 100%; left: 0; border-bottom: 1px solid #000; color: #fff; font-weight: bold; background-color: #f00; padding: 5px; font-size: 11px; opacity: .75;">[console]: Console Messaging Active</p>';
								$("body").append(consoleHTML);
								$("#_simplr_core_console").mouseover(function() { $(this).slideUp(); }).mouseout(function() { $(this).delay(3000).slideDown(); });
							});
							CORE.config.console = true;
						}
					} catch(e) {}
				}
				return CORE.config.console;
			}
		}
	};
	
	<?php 
		
		// browser 
		include("browser/browser.js");

		// cache
		include("cache/cache.js");
		
		// cookie
		include("cookie/cookie.js");
		
		// controller
		include("controller/jquery.ba-hashchange.js");
		include("controller/controller.js");
		
		// conversion
		include("conversion/json2.js");
		include("conversion/conversion.js");
		
		// form
		include("form/form.js");
		include("form/defaultCodesAndValidators.js");
		
		// layout
		include("layout/innerxhtml.js");
		include("layout/layout.js");
		
		// tracker
		include("trigger/trigger.js");
		
		// ui
		include("ui/ui.layer.js");
		include("ui/ui.newBrowserWindow.js");
		include("ui/ui.widget.oTrackableScrollingElement.js");
		
		// util
		include("util/util.js");
		
		// validation
		include("validation/validation.js");
		include("validation/defaultCodesAndValidators.js");
		
		// view
		include("view/view.js");
	?>

})(jQuery);