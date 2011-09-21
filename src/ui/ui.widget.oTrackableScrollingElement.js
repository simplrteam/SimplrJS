(function() {
	
	Simplr.Ui.Widget.oTrackableScrollingElement = function(options) {
		return new trackableScrollingElement(options);
	};
	
	function trackableScrollingElement(options) {
		// user
		this.data = $.extend({
			animateSpeed : 200,
			containerSelector : "#_simplr_widget_trackableScrollingElement_container",
			elementSelector : "#_simplr_widget_trackableScrollingElement_element",
			offset : 10,
			refreshSpeed : 500,
			tolerance : 10
		}, options);
		
		// private
		this.data._PRIVATE = {
			evtString : "scroll.simplr.widget.trackableScrollingElement." + Simplr.Core.Ui.Widget.mGenerateWidgetID(),
			timeout : null,
			previousOffset : 0
		};
		
		// destroy
		this.destroy();
		
		// create this widget
		var thisWidget = this;
		$(window).bind(thisWidget.data._PRIVATE.evtString, function() {
			clearTimeout(thisWidget.data._PRIVATE.timeout);
			thisWidget.data._PRIVATE.timeout = setTimeout(function() {
				var parentEl = $(thisWidget.data.containerSelector).eq(0);
				var childEl = parentEl.children(thisWidget.data.elementSelector).eq(0);
				if( parentEl.is(":visible") && childEl.is(":visible") ) {
					/* Object Infos */
					var containerInfo = Simplr.Core.Ui.mElementInfo({ selector : parentEl });
					var mElementInfo = Simplr.Core.Ui.mElementInfo({ selector : childEl });
					var windowInfo = Simplr.Core.Ui.mWindowInfo();
					/* Figure Out How this thing is moving */
					var movingUP = ((windowInfo.offsets[1] - thisWidget.data._PRIVATE.previousOffset) < 0);
					thisWidget.data._PRIVATE.previousOffset = windowInfo.offsets[1];	
					var newMargin = null;
					var topToleranceRange = [ mElementInfo.offsets[1] - thisWidget.data.tolerance, mElementInfo.offsets[1] +  thisWidget.data.tolerance ];
					var bottomToleranceRange = [ mElementInfo.offsets[1] + mElementInfo.dimensions[1] - thisWidget.data.tolerance, mElementInfo.offsets[1] + mElementInfo.dimensions[1] + thisWidget.data.tolerance];
					/* Find new Margin */
					if((windowInfo.dimensions[1] > mElementInfo.dimensions[1]) && ((windowInfo.offsets[1] < topToleranceRange[0]) || (windowInfo.offsets[1] > topToleranceRange[1]))) {
						newMargin = windowInfo.offsets[1] - containerInfo.offsets[1] + thisWidget.data.offset;
					} else {
						if( movingUP && (windowInfo.offsets[1] < topToleranceRange[0])) {
							newMargin = windowInfo.offsets[1] - containerInfo.offsets[1] + thisWidget.data.offset;
						} else if((windowInfo.offsets[1] + mElementInfo.dimensions[1]) > bottomToleranceRange[1]) {
							newMargin = (windowInfo.offsets[1] - containerInfo.offsets[1] - (mElementInfo.dimensions[1] - windowInfo.dimensions[1]) - thisWidget.data.offset);
						}
					}
					/* Set this Margin */
					if(newMargin != null) {
						if(newMargin < 0 ) {
							newMargin = 0;
						} else if(newMargin > (containerInfo.dimensions[1] - mElementInfo.dimensions[1])) {
							newMargin = containerInfo.dimensions[1] - mElementInfo.dimensions[1];
						}
						childEl.stop().animate({ marginTop : newMargin }, thisWidget.data.animateSpeed);
					}
				} else {
					childEl.css("margin-top", 0);
				}
			}, thisWidget.data.refreshSpeed);
		});
	};
	
	trackableScrollingElement.prototype.reset = function() {
		$(this.data.elementSelector).eq(0).css("margin-top", 0);
	};
	
	trackableScrollingElement.prototype.destroy = function() {
		this.reset();
		$(window).unbind(this.data._PRIVATE.evtString);
	};

})();