(function($) {
	
	var data = {};
	
	$.extend(true, simplr, {
		view : {
			mAddViews : function(obj) {
				for(var key in obj) {
					var newView = $.extend(true, {}, { 
						html : function(data) { return ""; }, 
						callback : function(selector, data) {} 
					}, obj[key]);
					data[key] = newView;
				}
			},
			mGetViews : function() {
				return data;
			},
			mRender : function(options) {
				var tmp = $.extend({ name : "", data: "", selector : ""}, options);
				$(tmp.selector).html(data[tmp.name].html(tmp.data));
				data[tmp.name].callback(tmp.selector, tmp.data);
			}
		}
	});
	
})(jQuery);