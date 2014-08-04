(function() {
	
	// use this as the key to set the expiry
	function _createExpiryKey(key) {
		return key + "_time";
	};

	// use this as the key to set that actual data
	function _createDataKey(key) {
		return key + "_data";
	};
	
	// use this to create the expiry information
	function _createExpiryValue(identifier, freshness) {
		return identifier + "|" + (new Date().getTime()+freshness);
	};
	
	simplr.cache = {
		
		// set an item in the cache
		// uses localStorage
		set : function(opts) {
			// set our options
			var options = {
				key : (opts && opts.key) || "",
				identifier : (opts && opts.identifier) || "",
				data : (opts && opts.data) || "",
				freshness : (opts && opts.freshness) || 31550000000 // default to 1 year
			};
			// key need to set the item
			if(options.key != "") {
				localStorage.setItem(_createExpiryKey(options.key), _createExpiryValue(options.identifier, options.freshness));
				localStorage.setItem(_createDataKey(options.key), options.data);
				return simplr.cache.get({ key : options.key, identifier : options.identifier });
			}
			return null;
		},
		
		// get an item
		// fetches the item from localStorage
		get : function(opts) {
			var options = {
				key : (opts && opts.key) || "",
				identifier : (opts && opts.identifier) || ""
			};
			// key is need to get the item
			if(options.key != "") {
				var expiryData = localStorage.getItem(_createExpiryKey(options.key));
				if(expiryData != null) {
					var expiryParts = expiryData.split("|");
					if(expiryParts.length == 2) {
						if(expiryParts[0] == options.identifier) {
							return (new Date().getTime() <= (parseInt(expiryParts[1], 10))) ? localStorage.getItem(_createDataKey(options.key)) : simplr.cache.expire(options.key);
						}
					}
				}
			}
			return null;
		},	
		
		// expire an item
		// removes item from localStorage
		expire : function(key) {
			localStorage.removeItem(_createExpiryKey(key));
            localStorage.removeItem(_createDataKey(key));
            return localStorage.getItem(_createDataKey(key));
		}

	};
	
})();