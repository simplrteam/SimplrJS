(function() {

    function equal(thing1, thing2) {
        if(typeof thing1 == typeof thing2) {
            if(typeof thing1 != "object") { // check if its a simplr type
                return thing1 == thing2;
            } else {
               if($.isArray(thing1)) {
                   if(thing1.length == thing2.length) {
                       for(var i = 0, iL = thing1.length; i < iL; i++) {
                            if(!equal(thing1[i], thing2[i])) { 
                                return false;
                            }
                        } 
                        return true;
                    }             
               } else {
                   // compare key values in each object
                   for(var key in thing1) {
                        if(!equal(thing1[key], thing2[key])) { 
                            return false;
                        }
                    }
                    // make sure have the same amount of keys
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
            }
        }
        return false;
    };

    Simplr.Util = {
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
    		if($.isArray(things)) {
    		    var valid = true;
                for(var i = 0, iL = things.length; i < iL; i++) {
                    if(!equal(things[0], things[i])) {
                        valid = false;
                        i = iL;
                    }
                }
                return valid;
            }
    		return true;
    	},
    	mGetUrlParameter : function(name) {
    	    var string = location.search;
            if(string != "") {
                string = string.substring(1).split("&");
                var parameters = {};
                for(var i = 0, iL = string.length; i < iL; i++) {
                    var keyValue = string[i].split("=");
                    parameters[keyValue[0]] = $.trim(decodeURIComponent(keyValue[1]).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'));
                }
                if(Simplr.Util.mEmpty(name)) {
                    return parameters;
                } else if(typeof parameters[name] != "undefined") {
                    return parameters[name];
                }
            }
            return null;
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
	
})();