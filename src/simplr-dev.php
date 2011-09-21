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

	window.Simplr = {
		Config : {
			Data : {
				ConsoleActive : false
			},
			mToggleConsole : function(on) {
				$("#_simplr_core_console").remove();
				Simplr.Config.Data.ConsoleActive = false;
				if(on) {
					try {
						if( typeof window.console != "undefined" && typeof window.console.group != "undefined") {
							$(function() {
								var consoleHTML = '<p id="_simplr_core_console" style="margin: 0; text-align: center; position: fixed; top: 0; width: 100%; left: 0; border-bottom: 1px solid #000; color: #fff; font-weight: bold; background-color: #f00; padding: 5px; font-size: 11px; opacity: .75;">[console]: Console Messaging Active</p>';
								$("body").append(consoleHTML);
								$("#_simplr_core_console").mouseover(function() { $(this).slideUp(); }).mouseout(function() { $(this).delay(3000).slideDown(); });
							});
							Simplr.Config.Data.ConsoleActive = true;
						}
					} catch(e) {}
				}
				return Simplr.Config.Data.ConsoleActive;
			}
		}
	};

	// Browser
	Simplr.Browser = {};
	<?php
		include("browser/browser.js");
	?>
	
	// Cache
	Simplr.Cache = {};
	<?php
		include("cache/cache.js");
	?>

	// Controller
	Simplr.Controller = {};
	<?php
		include("controller/jquery.ba-hashchange.js");
		include("controller/controller.js");
	?>
	
	// Converison
	Simplr.Conversion = {};
	<?php
		include("conversion/json2.js");
		include("conversion/conversion.js");
	?>
	
	// Cookie
	Simplr.Cookie = {};
	<?php
		include("cookie/cookie.js");
	?>

	// Core
	Simplr.Core = {};
	<?php
		include("core/core.console.js"); 
		include("core/core.util.js");
		include("core/core.ui.js");
		include("core/core.validation.js");
		include("core/defaultCodesAndValidators.js");
	?>
	
	// Form
	Simplr.Form = {};
	<?php
		include("form/form.js");
	?>
	
	// Layout
	Simplr.Layout = {};
	<?php
		include("layout/innerxhtml.js");
		include("layout/layout.js");
	?>
	
	// Trigger
	Simplr.Trigger = {};
	<?php
		include("trigger/trigger.js");
	?>
	
	// Ui
	Simplr.Ui = {
		Widget : {}
	};
	<?php
		include("ui/ui.layer.js");
		include("ui/ui.newBrowserWindow.js");
		include("ui/ui.widget.oTrackableScrollingElement.js");
	?>

	// Util
	Simplr.Util = {};
	<?php
		include("util/util.js");
	?>
	
	// Validation
	Simplr.Validation = {};
	<?php
		include("validation/validation.js");
	?>

	// View
	Simplr.View = {};
	<?php
		include("view/view.js");
	?>

})(jQuery);