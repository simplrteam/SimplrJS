Simplr.Util = {
	mEmpty : function(thing) {
		return Simplr.Core.Util.mEmpty(thing);
	},
	mEqual : function(things) {
		return Simplr.Core.Util.mEqual(things);
	},
	mGetUrlParameter : function(name) {
		return Simplr.Core.Util.mGetUrlParameter(name);
	},
	mHasLocalStorage : function() {
		return Simplr.Core.Util.mHasLocalStorage();
	},
	mTruncateString : function(options) {
		var opts = $.extend({ string : "", size : 5, postfix : "", smart : true }, options);
		if(opts.string.length > opts.size) {
			var truncateIndex = opts.size - opts.postfix.length - 1;
			var defaultIndex = truncateIndex+1;
			if(opts.smart) {
				while((opts.string.charAt(truncateIndex) != " ") && (truncateIndex > 0)) {
					truncateIndex--;
				}
			}
			return opts.string.substring(0, (truncateIndex == 0 ? defaultIndex : (truncateIndex+1))) + opts.postfix;
		}
		return opts.string;
	}	
};
	