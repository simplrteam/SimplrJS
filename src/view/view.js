(function() {
	
	var ViewData = {
		Views : {}
	};
	
	Simplr.View = {
		mAddViews : function(obj) {
			for(var key in obj) {
				var newView = $.extend(true, {}, { 
					html : function(data) { return ""; }, 
					callback : function(selector, data) {} 
				}, obj[key]);
				ViewData.Views[key] = newView;
			}
		},
		
		mData : function() {
			return ViewData;
		},
		
		mRender : function(options) {
			var tmp = $.extend({ name : "", data: "", selector : ""}, options);
			$(tmp.selector).html(ViewData.Views[tmp.name].html(tmp.data));
			ViewData.Views[tmp.name].callback(tmp.selector, tmp.data);
		}
	};
	
})();