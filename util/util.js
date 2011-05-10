$.extend(true, simplr, {
	util : {
		mEmpty : function(thing) {
			return CORE.util.mEmpty(thing);
		},
		mEqual : function(things) {
			return CORE.util.mEqual(things);
		},
		mGetUrlParameter : function(name) {
			return CORE.util.mGetUrlParameter(name);
		},
		mHasLocalStorage : function() {
			return CORE.util.mHasLocalStorage();
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
	}
});
	