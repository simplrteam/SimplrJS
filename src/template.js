(function() {
	
	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.template = {
		templates : {}
	};
	
	// helper functions
	function _convertTokenToString(value) {
		if(typeof value == "object") {
			return simplr.template.build(value);
		}
		return value;
	};
	
	function _replaceTokens(keys, string) {
	    if(string !== undefined) {
	        for(var token in keys) {
                string = string.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
            }
	    }
	    return unescape(string);
	};
	
	function _getTemplate(key) {
		// if not loaded, fetch it
		if(!simplr.dataStorage.template.templates[key]) {
			var templateEl = document.getElementById("template-" + key);
			if(templateEl) {
				simplr.dataStorage.template.templates[key] = templateEl.textContent.replace(/\n/g,"").replace(/\s{1,}/g," ").trim();
			}
		}
		return simplr.dataStorage.template.templates[key];
	};
	
	// the feature
	simplr.template = {
		
		// build the html for a template
		build : function(opts) {
			var finalHTML = "";
			if(opts && opts.component && opts.tokens) {
				// we work with arrays of tokens, so we make sure this is an array
				var tokenArray = ((typeof opts.tokens == "object") && opts.tokens.length) ? opts.tokens : [opts.tokens];
				// we go through each tokenSet and recursivly build the token until the token is just a string
				for(var i = 0; i < tokenArray.length; i++) {
					var thisTokenSet = {};
					for(var token in tokenArray[i]) {
						thisTokenSet[token] = _convertTokenToString(tokenArray[i][token]);
					}
					// now this set is fully built so we add it to the finalHTML
					finalHTML += _replaceTokens(thisTokenSet, _getTemplate(opts.component));
				}
			}
			return finalHTML;
		}
	
	};
	
})();