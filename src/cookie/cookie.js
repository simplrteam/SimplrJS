Simplr.Cookie = {
	
	mExpire : function(options) {
        return Simplr.Cookie.mSet($.extend({ name : "", expireDays : -1}, options));
    },
	
	mGet : function(options) {
		var opts = $.extend({ name : "" }, options);
		if( document.cookie.length > 0 && !Simplr.Util.mEmpty(opts.name)) {
			var r = document.cookie.match( '(^|;) ?' + opts.name + '=([^;]*)(;|$)');
			if(r) {
			    return decodeURIComponent(r[2]);
			}
		}
		return null;
	},
	
	mSet : function(options) {
		var opts = $.extend({ name : "", value : "", expireDays : null, path : "/", domain : null, secure : false }, options);
		if(opts.name != "") {
			var cookieString = opts.name + "=" + encodeURIComponent(opts.value);
			if(!Simplr.Util.mEmpty(opts.expireDays)) {
				var expirationDate = new Date();
				expirationDate.setTime(expirationDate.getTime() + (opts.expireDays * 86400000));
				cookieString += "; expires=" + expirationDate.toUTCString();
			}
			cookieString += !Simplr.Util.mEmpty(opts.path) ? "; path=" + opts.path : "";
			cookieString += !Simplr.Util.mEmpty(opts.domain) ? "; domain=" + opts.domain : "";
			cookieString += opts.secure ? "; secure" : "";
			document.cookie = cookieString;
			return Simplr.Cookie.mGet({ name : opts.name });
		}
		return null;
	}
	
};