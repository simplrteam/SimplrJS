(function($) {
	
	var hasLocalStorage = typeof localStorage == "undefined" ? false : true;
	
	function htmlEntities(string) {
		return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
	};
	
	function equal(thing1, thing2) {
		if( typeof thing1 == typeof thing2 ) {
			if(typeof thing1 == "object") {
				if( $.isArray(thing1) ) {
					if( thing1.length == thing2.length ) {
						for(var i = 0, iL = thing1.length; i < iL; i++) {
							if( !equal(thing1[i], thing2[i]) ) { 
								return false; 
							}
						}
						return true;
					}
					return false;
				} else {
					var ret = true;
					for(var key in thing1) {
						if( !equal(thing1[key], thing2[key]) ) { 
							ret = false; return false; 
						}
					}
					if(ret) {
						var l1 = 0;
						var l2 = 0;
						for(var key in thing1) {
							l1++;
						}
						for(var key in thing2) {
							l2++;
						}
						return l1 == l2;
					}
					return false;
				}
			} 
			return thing1 == thing2; 
		}
		return false;
	};
	
	$.extend(true, CORE, {
		util : {
			mEmpty : function(thing) {
				var typeOfThing = typeof thing;
				if( typeOfThing != "undefined" && thing != null ) {
					if(typeOfThing == "object") {
						if($.isArray(thing)) {
							return thing.length == 0;
						}
						return $.isEmptyObject(thing);
					}
					return $.trim(thing) == "";				
				}
				return true;
			},
			mEqual : function(things) {
				if( !CORE.util.mEmpty(things) ) {
					if( $.isArray(things) ) {
						var valid = true;
						for(var i = 0, iL = things.length; i < iL; i++) {
							if( !equal(things[0], things[i]) ) {
								valid = false;
								i = iL;
							}
						}
						return valid;
					} 
					return true;
				}
				return true;
			},
			mGetUrlParameter : function(name) {
				var string = window.location.search;
				if(!CORE.util.mEmpty(string)) {
					var parameters = {};
					string = string.substring(1).split("&");
					for(var i = 0, iL = string.length; i < iL; i++) {
						var keyValue = string[i].split("=");
						parameters[keyValue[0]] = $.trim(htmlEntities(decodeURIComponent(keyValue[1])));
					}
					if(CORE.util.mEmpty(name)) {
						return parameters;
					} else {
						var value = parameters[name];
						return typeof value == "undefined" ? null : value;
					}
				} else { 
					return null;
				}
			},
			mHasLocalStorage : function() {
				return hasLocalStorage;
			}
		}
	});
	
})(jQuery);