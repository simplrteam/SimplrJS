(function() {
	
	function createTimeKey(key) {
		return key;
	};
	
	function createDataKey(key) {
		return key + "_data";
	};
	
	function createTimeValue(key, freshness) {
		return key + "|" + (new Date().getTime()+freshness);
	};
	
	Simplr.Cache = {
		
		mExpire : function(key) {
			localStorage.removeItem(createTimeKey(key));
            localStorage.removeItem(createDataKey(key));
            return localStorage.getItem(createDataKey(key));
		},
		
		mGet : function(options) {
			var options = $.extend({ key : "", identifier : ""}, options);
			if(options.key != "") {
				var timeData = localStorage.getItem(createTimeKey(options.key));
				if(timeData != null) {
					var timeParts = timeData.split("|");
					if(timeParts.length == 2) {
						if(timeParts[0] == options.identifier) {
							return (new Date().getTime() <= (parseInt(timeParts[1], 10))) ? localStorage.getItem(createDataKey(options.key)) : Simplr.Cache.mExpire(options.key);
						}
					}
				}
			}
			return null;
		},
		
		mSet : function(options) {
			var options = $.extend({ key : "", identifier : "", data : "", freshness : 600000 }, options);
			if(options.key != "") {
				localStorage.setItem(createTimeKey(options.key), createTimeValue(options.identifier, options.freshness));
				localStorage.setItem(createDataKey(options.key), options.data);
				return Simplr.Cache.mGet({ key : options.key, identifier : options.identifier });
			}
			return null;
		}
			
	};
	
})();