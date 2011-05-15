(function($) {
	
	var mD = {
		userAgent : ""	
	};
	
	$.extend(simplr, {
		browser : {
			
			mAddressBarHeight : function() {
				var deviceID = Cu.mDevice();
				return (deviceID == "iPhone" || deviceID == "iPod" || deviceID == "iPad") ? 60 : 0;
			},
			
			mDevice : function() {
				if(mD.userAgent.match(/iPhone/i)) {
					return "iPhone";
				} else if(mD.userAgent.match(/iPod/i) ) {
					return "iPod";
				} else if(mD.userAgent.match(/iPad/i)) {
					return "iPad";
				} else if(mD.userAgent.match(/Android/i)) {
					return "Android";
				}
				return "other";
			},
	
			mLocalStorageCapable : function() {
				return CORE.util.mHasLocalStorage();
			},
			
			mSetUserAgent : function(uaString) {
				mD.userAgent = uaString;
			},
			
			mTouchCapable : function() {
				var deviceID = Cu.mDevice();
				return (deviceID == "iPhone") || (deviceID == "iPod") || (deviceID == "iPad") || (deviceID == "Android");
			}
			
		}
	});
	
	var Cu = simplr.browser;
	Cu.mSetUserAgent(navigator.userAgent);
	
})(jQuery);
