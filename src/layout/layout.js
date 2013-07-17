(function() {
	
	function convertTokenToString(value) {
		if(typeof value == "object") {
			return Simplr.Layout.mAssembleLayout(value);
		}
		return value;
	};
	
	function replaceTokens(keys, string) {
	    if(string !== undefined) {
	        $.extend(keys, LayoutData.GlobalTokens);
	        for(var token in keys) {
                string = string.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
            }
	    }
	    return unescape(string);
	};
	
	var LayoutData = {
		Components : {}	,
		GlobalTokens : {}
	};
	
	Simplr.Layout = {
	    mAddComponent : function(key, component) {
	        LayoutData.Components[key] = $.trim(component.replace(/\n/g,"").replace(/\s{1,}/g," "));
            return true;
	    },
	    mGetComponent : function(key) {
	       // if not loaded, fetch it
	       if(LayoutData.Components[key] === undefined) {
	            var el = $("script#layout-" + key + "[type='text/x-simplr-layout-component']");
	            if(el.size() == 1) {
	               Simplr.Layout.mAddComponent(key, el.text());
	            }
	       }
	       // return what's found
	       return LayoutData.Components[key];
	    },
	    
	    mAddGlobalToken : function(token, value) {
	       LayoutData.GlobalTokens[token] = value;  
	    },
	    
		mAssembleLayout : function(config) {
			var finalResults = "";
			if(config) {
				if(config.component && config.tokens) {
					var tokenCollections = $.isArray(config.tokens) ? config.tokens : [ config.tokens ];
					for(var i = 0, iL = tokenCollections.length; i < iL; i++) {
						var tmpTokens = {};
						for(var tKey in tokenCollections[i]) {
							tmpTokens[tKey] = convertTokenToString(tokenCollections[i][tKey]);
						}
						finalResults += replaceTokens(tmpTokens, Simplr.Layout.mGetComponent(config.component));
					}
				}
			}
			return finalResults;
		},
		
		mData : function() {
			return LayoutData;
		}
		
	};
	
})();