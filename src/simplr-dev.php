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

	<?php include("CORE/CORE.console.js"); ?>
	<?php include("CORE/CORE.util.js"); ?>
	<?php include("CORE/CORE.ui.js"); ?>
	<?php include("CORE/CORE.validation.js"); ?>

	var simplr = window.simplr = {
		config : {
			mToggleConsole : function(on) {
				$("#_simplr_core_console").remove();
				CORE.config.console = false;
				if(on) {
					try {
						if( typeof window.console != "undefined" && typeof window.console.group != "undefined") {
							$(function() {
								var consoleBarEl = $('<p></p>').attr('id','_simplr_core_console').css({textAlign: 'center', position: 'fixed', top: '0', width: '100%', borderBottom: '1px solid #000', color: '#000', backgroundColor: '#f00', padding: '5px', fontSize: '11px', opacity:'0.75'}).text('[console]: Console Messaging Active');
								$("body").append(consoleBarEl);
								consoleBarEl.mouseover(function(){ $(this).slideUp(); })
								consoleBarEl.mouseout(function(){ $(this).delay(3000).slideDown(); });
							});
							CORE.config.console = true;
						}
					} catch(e) {}
				}
				return CORE.config.console;
			}
		}
	};
	
	<?php #browser ?>
	<?php include("browser/browser.js"); ?>
	
	<?php #cache ?>
	<?php include("cache/cache.js"); ?>
	
	<?php #cookie ?>
	<?php include("cookie/cookie.js"); ?>
	
	<?php #controller ?>
	<?php include("controller/jquery.ba-hashchange.js"); ?>
	<?php include("controller/controller.js"); ?>
	
	<?php #conversion ?>
	<?php include("conversion/json2.js"); ?>
	<?php include("conversion/conversion.js"); ?>
	
	<?php #form ?>
	<?php include("form/form.js"); ?>
	<?php include("form/defaultCodesAndValidators.js"); ?>
	
	<?php #layout ?>
	<?php include("layout/innerxhtml.js"); ?>
	<?php include("layout/layout.js"); ?>
	
	<?php #tracker ?>
	<?php include("trigger/trigger.js"); ?>
	
	<?php #ui ?>
	<?php include("ui/ui.layer.js"); ?>
	<?php include("ui/ui.newBrowserWindow.js"); ?>
	<?php include("ui/ui.widget.oTrackableScrollingElement.js"); ?>
	
	<?php #util ?>
	<?php include("util/util.js"); ?>

	<?php #validation ?>
	<?php include("validation/validation.js"); ?>
	<?php include("validation/defaultCodesAndValidators.js"); ?>
	
	<?php #view ?>
	<?php include("view/view.js"); ?>

})(jQuery);