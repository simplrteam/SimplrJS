Simplr.Cookie = {
	mGet : function(options) {
		var opts = $.extend({ name : "" }, options);
		if( document.cookie.length > 0 && !Simplr.Core.Util.mEmpty(opts.name)) {
			var r = document.cookie.match( '(^|;) ?' + opts.name + '=([^;]*)(;|$)');
			if(r) {
				return decodeURIComponent(r[2]);
			}
		}
		return null;
	},
	mSet : function(options) {
		var opts = $.extend({ name : "", value : "", expireDays : null, path : "/", domain : null, secure : false }, options);
		if( !Simplr.Core.Util.mEmpty(opts.name) ) {
			var cookieString = opts.name + "=" + encodeURIComponent(opts.value);
			if(!Simplr.Core.Util.mEmpty(opts.expireDays)) {
				var expirationDate = new Date();
				expirationDate.setTime(expirationDate.getTime() + (opts.expireDays * 86400000));
				cookieString += "; expires=" + expirationDate.toUTCString();
			}
			cookieString += !Simplr.Core.Util.mEmpty(opts.path) ? "; path=" + opts.path : "";
			cookieString += !Simplr.Core.Util.mEmpty(opts.domain) ? "; domain=" + opts.domain : "";
			cookieString += opts.secure ? "; secure" : "";
			document.cookie = cookieString;
			return true;
		}
		return false;
	},
	mExpire : function(options) {
		return Simplr.Cookie.mSet($.extend({ name : "", expireDays : -1}, options));
	}
};