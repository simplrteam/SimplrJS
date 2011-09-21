(function() {
	
	var widgetIDs = {};
	
	Simplr.Core.Ui = {
		mElementInfo : function(options) {
			var opts = $.extend({ selector : "body" }, options);
			var jqThisElement = $(opts.selector).eq(0);
			var dimensions = [ jqThisElement.width(), jqThisElement.height() ];
			var offsets = jqThisElement.offset();
			offsets = [ offsets.left, offsets.top ];
			return { offsets : offsets, dimensions : dimensions };
		},
		mWindowInfo : function() {
			var screenInfo = {
				offsets : [0, 0],
				dimensions : [0, 0]
			};
			
			// Offsets
			if (typeof window.pageYOffset == 'number') { 
				// Netscape compliant
				screenInfo.offsets = [window.pageXOffset, window.pageYOffset];
			} else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) { 
				// DOM compliant
				screenInfo.offsets = [document.body.scrollLeft, document.body.scrollTop];
			} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
				// IE6 standards compliant mode
				screenInfo.offsets = [document.documentElement.scrollLeft, document.documentElement.scrollTop];
			}

			// Width and Height
			if( typeof window.innerWidth == 'number' ) {
				// NON IE
				screenInfo.dimensions = [window.innerWidth, window.innerHeight];
			} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
				// IE 6 plus in standards compliant mode
				screenInfo.dimensions = [document.documentElement.clientWidth, document.documentElement.clientHeight];
			}
			return screenInfo;
		},
		Widget : {
			mGenerateWidgetID : function() {
				var num = Math.floor(Math.random()*10000000);
				if(Simplr.Core.Util.mEmpty(widgetIDs[num])) {
					widgetIDs[num] = true;
					return num;
				} else {
					return Simplr.Core.Ui.Widget.mGenerateWidgetID();
				}
			}
		}
	}	
	
	
})();