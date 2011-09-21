(function() {
	
	function convertTokenToString(value) {
		if(typeof value == "object") {
			return Simplr.Layout.mAssembleLayout(value);
		}
		return value;
	};
	
	function loadLayoutComponent(component) {
		while( $(".layout-component", component).size() > 0 ) {
			loadLayoutComponent($(".layout-component:eq(0)", component));
		}
		var componentToLoad = {};
		componentToLoad[component.attr("id").split("-")[1]] = innerXHTML(component.get(0));
		Simplr.Layout.mAddComponents(componentToLoad);
		component.remove();
	};
	
	function getComponent(key) {
		if(typeof LayoutData.Components[key] == "undefined") {
			var layoutEl = $("#layout-"+key);
			if( layoutEl.size() > 0 ) {
				loadLayoutComponent($("#layout-"+key));
			} else {
				LayoutData.Components[key] = null;
			}
		}
		return LayoutData.Components[key];
	};
	
	var LayoutData = {
		Components : {}	,
		GlobalTokens : {}
	};
	
	Simplr.Layout = {
		mAddComponents : function(obj) {
			for(var key in obj) {
				LayoutData.Components[key] = $.trim(obj[key].replace(/\n/g,"").replace(/\s{1,}/g," "));
			}
		},
		
		mAddGlobalTokens : function(globalTokens) {
			$.extend(LayoutData.GlobalTokens, globalTokens);
		},
		
		mAssembleLayout : function(config) {
			var finalResults = "";
			if( config ) {
				if( config.component && config.tokens) {
					var tokenCollections = $.isArray(config.tokens) ? config.tokens : [ config.tokens ];
					for(var i = 0, iL = tokenCollections.length; i < iL; i++) {
						var tmpTokens = {};
						for(var tKey in tokenCollections[i]) {
							tmpTokens[tKey] = convertTokenToString(tokenCollections[i][tKey]);
						}
						finalResults += Simplr.Layout.mReplaceTokens(tmpTokens, Simplr.Layout.mGetComponent(config.component));
					}
				}
			}
			return finalResults;
		},
		
		mData : function() {
			return LayoutData;
		},
		
		mGetComponent : function(key) {
			return getComponent(key);
		},
		
		mReplaceTokens : function(keys, string) {
			if(string != null) {
				$.extend(keys, LayoutData.GlobalTokens);
				for(var token in keys) {
					string = string.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
				}
			}
			return unescape(string);
		}
	};
	
})();