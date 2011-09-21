(function() {
	
	var browserData = {
		UserAgent : ""
	};
	
	Simplr.Browser = {
	
		mAddressBarHeight : function() {
			var deviceID = Simplr.Browser.mDevice();
			return (deviceID == "iPhone" || deviceID == "iPod" || deviceID == "iPad") ? 60 : 0;
		},
		
		mDevice : function() {
			if(browserData.UserAgent.match(/iPhone/i)) {
				return "iPhone";
			} else if(browserData.UserAgent.match(/iPod/i) ) {
				return "iPod";
			} else if(browserData.UserAgent.match(/iPad/i)) {
				return "iPad";
			} else if(browserData.UserAgent.match(/Android/i)) {
				return "Android";
			}
			return "other";
		},

		mLocalStorageCapable : function() {
			return Simplr.Core.Util.mHasLocalStorage();
		},
		
		mSetUserAgent : function(uaString) {
			browserData.UserAgent = uaString;
		},
		
		mTouchCapable : function() {
			var deviceID = Simplr.Browser.mDevice();
			return (deviceID == "iPhone") || (deviceID == "iPod") || (deviceID == "iPad") || (deviceID == "Android");
		}
			
	};
	
	Simplr.Browser.mSetUserAgent(navigator.userAgent);
	
})();
