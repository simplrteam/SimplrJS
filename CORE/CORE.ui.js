(function($) {
	
	var widgetIDs = {};
	
	$.extend(true, CORE, {
		ui : {
		
			mElementInfo : function(options) {
				var opts = $.extend({ selector : "body" }, options);
				var jqThisElement = $(opts.selector).eq(0);
				var dimensions = [ jqThisElement.width(), jqThisElement.height() ];
				var offsets = jqThisElement.offset();
				offsets = [ offsets.left, offsets.top ];
				return { offsets : offsets, dimensions : dimensions };
			},
			mWindowInfo : function() {
   				var screenInfo = {};
   				/* Find Offsets */
   				if( typeof( window.pageYOffset ) == 'number' ) {
					/*Netscape compliant*/
   					screenInfo.offsets = [ window.pageXOffset, window.pageYOffset ];
				} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
				    /*DOM compliant*/
					screenInfo.offsets = [ document.body.scrollLeft, document.body.scrollTop ];
				} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
				    /*IE6 standards compliant mode*/
					screenInfo.offsets = [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
				} else {
					screenInfo.offsets = [ 0, 0 ];
				}
   				/* ---------------- */
   				/* Get height / widths */
   				screenInfo.dimensions = [ $(window).width(), $(window).height() ];
   				return screenInfo;
   			},
   			
   			widget : {
   				mGenerateWidgetID : function() {
   					var num = Math.floor(Math.random()*10000000);
   					if(CORE.util.mEmpty(widgetIDs[num])) {
   						widgetIDs[num] = true;
   						return num;
   					} else {
   						return CORE.ui.widget.mGenerateWidgetID();
   					}
   				}
   			}
			
		}
	});
	
})(jQuery);