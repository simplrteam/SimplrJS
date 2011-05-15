(function($) {
	
	function convertTokenToString(value) {
		if(typeof value == "object") {
			return Cu.mAssembleLayout(value);
		}
		return value;
	};
	
	function loadLayoutComponent(component) {
		while( $(".layout-component", component).size() > 0 ) {
			loadLayoutComponent($(".layout-component:eq(0)", component));
		}
		var key = $(component).attr("id").split("-")[1];
		data.components[key] = $.trim(innerXHTML($(component).get(0)).replace(/\n/g,"").replace(/\s{1,}/g," "));
		$(component).remove();
	};
	
	function getComponent(key) {
		if(typeof data.components[key] == "undefined") {
			var layoutEl = $("#layout-"+key);
			if( layoutEl.size() > 0 ) {
				loadLayoutComponent($("#layout-"+key));
			} else {
				data.components[key] = null;
			}
		}
		return data.components[key];
	};
	
	var data = {
		components : {}	,
		globalTokens : {}
	};
	
	$.extend(simplr, {
		layout : {
			mAssembleLayout : function(config) {
				var finalResults = "";
				if( config ) {
					if( config.component && config.tokens) {
						var tokenCollections = $.isArray(config.tokens) ? config.tokens : [ config.tokens ];
						for(var i = 0, iL = tokenCollections.length; i < iL; i++) {
							var tmpTokens = {};
							$.each(tokenCollections[i], function(tKey, tValue) {
								tmpTokens[tKey] = convertTokenToString(tValue);
							});
							finalResults += Cu.mReplaceTokens(tmpTokens, Cu.mGetComponent(config.component));
						}
					}
				}
				return finalResults;
			},
			
			mGetComponent : function(key) {
				return getComponent(key);
			},
			
			mGetComponents : function() {
				return data.components;
			},
			
			mLoadComponents : function() {
				while( $(".layout-component").size() > 0 ) {
					loadLayoutComponent($(".layout-component:eq(0)"));
				}
			},
			
			mAddGlobalTokens : function(globalTokens) {
				$.extend(data.globalTokens, globalTokens);
			},
			
			mReplaceTokens : function(keys, string) {
				if(string != null) {
					$.extend(keys, data.globalTokens);
					$.each(keys, function(token, value) {
						string = string.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(value));
					});
				}
				return unescape(string);
			}
		}
	});
	
	var Cu = simplr.layout;
	
})(jQuery);