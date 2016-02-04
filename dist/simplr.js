
(function() {

    // Base Object
    window.simplr = {};
    
    // We are going to do storage on this
    // so we'll create a dataStorage bucket
    simplr.dataStorage = {};
    
	(function() {
	
	// use this as the key to set the expiry
	function _createExpiryKey(key) {
		return key + "_time";
	};

	// use this as the key to set that actual data
	function _createDataKey(key) {
		return key + "_data";
	};
	
	// use this to create the expiry information
	function _createExpiryValue(identifier, freshness) {
		return identifier + "|" + (new Date().getTime()+freshness);
	};
	
	simplr.cache = {
		
		// set an item in the cache
		// uses localStorage
		set : function(opts) {
			// set our options
			var options = {
				key : (opts && opts.key) || "",
				identifier : (opts && opts.identifier) || "",
				data : (opts && opts.data) || "",
				freshness : (opts && opts.freshness) || 31550000000 // default to 1 year
			};
			// key need to set the item
			if(options.key != "") {
				localStorage.setItem(_createExpiryKey(options.key), _createExpiryValue(options.identifier, options.freshness));
				localStorage.setItem(_createDataKey(options.key), options.data);
				return simplr.cache.get({ key : options.key, identifier : options.identifier });
			}
			return null;
		},
		
		// get an item
		// fetches the item from localStorage
		get : function(opts) {
			var options = {
				key : (opts && opts.key) || "",
				identifier : (opts && opts.identifier) || ""
			};
			// key is need to get the item
			if(options.key != "") {
				var expiryData = localStorage.getItem(_createExpiryKey(options.key));
				if(expiryData != null) {
					var expiryParts = expiryData.split("|");
					if(expiryParts.length == 2) {
						if(expiryParts[0] == options.identifier) {
							return (new Date().getTime() <= (parseInt(expiryParts[1], 10))) ? localStorage.getItem(_createDataKey(options.key)) : simplr.cache.expire(options.key);
						}
					}
				}
			}
			return null;
		},	
		
		// expire an item
		// removes item from localStorage
		expire : function(key) {
			localStorage.removeItem(_createExpiryKey(key));
            localStorage.removeItem(_createDataKey(key));
            return localStorage.getItem(_createDataKey(key));
		}

	};
	
})();(function() {
	
	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.view = {
		views : {}
	};
	
	simplr.view = {
		
		// add views	
		add : function(list) {
			for(var key in list) {
				// add this view
				simplr.dataStorage.view.views[key] = {
					html : list[key].html || function(data) { return ""; },
					callback : list[key].callback || function(selector, data) {}
				};
			}
		},
		
		// render view
		render : function(opts) {
			var options = {
				name : (opts && opts.name) || "",
				data : (opts && opts.data) || {},
				selector : (opts && opts.selector) || ""
			};
			// in order to render we need to have a name and selector
			if(options.name && options.selector) {
				if(typeof options.selector == "string") {
					// add the html data to the area from selector
					document.querySelector(options.selector).innerHTML = simplr.dataStorage.view.views[options.name].html(options.data);
				} else {
					// add the html data to the area from dom object
					options.selector.innerHTML = simplr.dataStorage.view.views[options.name].html(options.data);
				}
				// call the callback function from that view
				simplr.dataStorage.view.views[options.name].callback(options.selector, options.data);
			}
		}

	};
	
})();(function() {

	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.command = {
		crud : {
			"view" : true, 
			"new" : true, 
			"update" : true, 
			"delete" : true
		},
		commands : {}
	};
	
	// command functionality
	simplr.command = {
	
		// add a command to the system
		add : function(commands) {
			for(var name in commands) {
				var tmp = {
					route : (commands[name] && commands[name].route) || [],
					callback : (commands[name] && commands[name].callback) || function() {}
				};
				var key = tmp.route.join("_");
				if(key) {
					simplr.dataStorage.command.commands[key] = tmp.callback;
				}
			}
		},
		
		// execute a command
		execute : function(command) {
			// routing first
			var routing = { 
				route : [], 
				url : command, 
				resources : {}, 
				action : "", 
				parameters : {} 
			};
			
			// remove hash
			if(routing.url.charAt(0) == "#") {
				routing.url = routing.url.substring(1);
			}
			
			// remove bang
			if(routing.url.charAt(0) == "!") {
				routing.url = routing.url.substring(1);
			}
			
			var urlArray = routing.url.split("?");
			urlArray[0] = decodeURI(urlArray[0]);
			
			// get the crud action
			urlArray[0] = urlArray[0].split("/");
			routing.action = urlArray[0][urlArray[0].length-1];
			routing.action = simplr.dataStorage.command.crud[routing.action] ? routing.action : "view";
			
			// get resources
			var isResource = true;
			var res = "";
			for(var x = 0, xL = urlArray[0].length-1; x < xL; x++)
			{
				if(urlArray[0][x] != "")
				{
					if( isResource )
					{ 
						res = urlArray[0][x];
						routing.route.push(res);
						routing.resources[res] = ""; 
					}
					else
					{ routing.resources[res] = urlArray[0][x]; }
					isResource = !isResource;
				}
			}
			
			// get parameters
			if( urlArray[1] )
			{ 
				var kvArr = urlArray[1].split("&");
				for(var i = 0, iL = kvArr.length; i < iL; i++) {
					var keyValue = kvArr[i].split("=");
					routing.parameters[keyValue[0]] = (decodeURIComponent(keyValue[1]).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')).trim();
				}
			}
			
			// we put the action at the end of the route
			routing.route.push(routing.action);
			
			// now we execute this route
			var key = routing.route.join("_");
			if(simplr.dataStorage.command.commands[key]) {
				simplr.dataStorage.command.commands[key](routing);
			}
		}
			
	}
	
	// we run commands through the hash change event
	window.addEventListener("hashchange", function() {
		simplr.command.execute(window.location.hash);
	}, false);
	
})();(function() {
	
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
	
})();(function() {
	
	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.form = {
		classes : {
			simplr : "_simplr",
			formEntry : "formEntry",
			formError : "formError",
			fieldError : "errorField",
			textError : "errorText",
			textInformation : "informationText"
		},
		defaultRules : [ "notempty" ],
		defaultLabel : "_LABEL_",
		rules : {},
		labels : {},
		codes : {},
		validators : {}
    };
	
	// helpers
	function _transformValues(values) {
		var validationAndRenderValues = {};
		for(var key in values) {
			var label = simplr.dataStorage.form.labels[key] ? simplr.dataStorage.form.labels[key] : simplr.dataStorage.form.defaultLabel;
			var validationObject = { value : values[key], label : label, rules : [] };
			// Add Validators as needed
			for(var i = 0; i < simplr.dataStorage.form.defaultRules.length; i++) {
				validationObject.rules.push(simplr.dataStorage.form.defaultRules[i]);
			}
			if(typeof simplr.dataStorage.form.rules[key] == "function") {
				simplr.dataStorage.form.rules[key](validationObject.rules);
			}
			// Return the Transformed Data
			validationAndRenderValues[key] = validationObject;
		}
		return validationAndRenderValues;
	};
	
	function _mergeValidationResults(key, rule, newData, existingData) {
        existingData.codes[key].success = existingData.codes[key].success.concat( newData.successCodes );
        existingData.codes[key].error = existingData.codes[key].error.concat( newData.errorCodes );
        if( !newData.valid ) { existingData.valid = false; }
    };
	
	function _validate(dataObject) {
		var results = {
			data : dataObject || "",
			valid : true,
			codes : {}
		};
		for(var key in results.data) {
            // Check the Rules for this data
            var entry = results.data[key];
            results.codes[key] = {
            	success : [], 
                error : []
            }
            for(var i = 0; i < entry.rules.length; i++) {
                var rule = entry.rules[i];
                var tmpValidationData = {
                	valid : true,
                	successCodes : [],
                	errorCodes : []
                };
                if(simplr.dataStorage.form.validators[rule]) { 
                    tmpValidationData = simplr.dataStorage.form.validators[rule](entry.value); 
                } else { 
                    tmpValidationData = simplr.dataStorage.form.validators["missingvalidator"](entry.value); 
                }
                _mergeValidationResults(key, rule, tmpValidationData, results);
            }
            // cleanup Data
            if( results.codes[key].error.length == 0 && results.codes[key].success.length == 0 ) { 
                delete results.codes[key]; 
            }
        }
		return results;
    };
    
    function _findFormEntry(el) {
    	if(el === document) {
    		// we didn't find it
    		return null;
    	} else if((" " + el.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(" " + simplr.dataStorage.form.classes.formEntry + " ") != -1) {
    		// found it
    		return el;
    	} else {
    		// go to parent el
    		return _findFormEntry(el.parentNode);
    	}
    };
    
    function _replaceTokens(keys, message) {
        var results = message;
        for(var token in keys) {
            results = results.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
        }
        return unescape(results);
    };
    
    function _getCodeMessage(code, label) {
    	if(simplr.dataStorage.form.codes[code]) {
    		return _replaceTokens({ label : label }, simplr.dataStorage.form.codes[code]);
    	}
    	return _replaceTokens({ label : code }, "$[label] is UNDEFINED");
    };
    
    function _render(selector, obj) {
		var classes = simplr.dataStorage.form.classes;
		var formEl;
		if(selector && (typeof selector == "string")) {
			formEl = document.querySelector(selector);
		} else {
			formEl = selector;
		}
			
		// reset the form, cleanup any extra classes added from validation
		var errorEls = formEl.querySelectorAll("."+classes.formError + "." + classes.simplr + ", ."+classes.fieldError + "." + classes.simplr);
		for(var i = 0; i < errorEls.length; i++){
			errorEls[i].className = errorEls[i].className.replace(classes.formError, "").replace(classes.fieldError, "").replace(classes.simplr, "");
		}
		var textEls = formEl.querySelectorAll("."+classes.textInformation + "." + classes.simplr + ", ." + classes.textError + "." + classes.simplr);
		for(var i = textEls.length-1; i >= 0; i--) {
			textEls[i].parentNode.removeChild(textEls[i]);
			textEls[i].className = textEls[i].className.replace(classes.simplr, "");
		}
		
		// create the messages
		for(var key in obj.codes) {
			var msgObject = obj.codes[key];
			var msgArray = [ msgObject.error, msgObject.success ];
			var html = "";
			for(var i = 0; i < 2; i++) {
				// Only showing 1 message at a time.
				if(msgArray[i].length > 0) {
					html += '<p class="' + (( i == 0) ? classes.textError : classes.textInformation) + ' ' + classes.simplr + '">' + _getCodeMessage(msgArray[i][0], obj.data[key].label) + '</p>';
				}
			}
			// now add the message
			var inputEl = formEl.querySelector("[name='" + key + "']");
			if(inputEl) {
				inputEl.className += " " + classes.fieldError + " " + classes.simplr;
				var entryEl = _findFormEntry(inputEl);
				if(entryEl) {
					entryEl.className += " " + classes.formError + " " + classes.simplr;
					entryEl.innerHTML += html;
				}
			}
		}
	};
	
	// feature
	simplr.form = {
		// add a label associations
		addLabelAssociation : function(opts) {
			for(var key in opts) {
				simplr.dataStorage.form.labels[key] = opts[key];
			}
		},
		// add validation associations
		addValidationAssociation : function(opts) {
			for(var key in opts) {
				simplr.dataStorage.form.rules[key] = opts[key];
			}
		},
		// add a validation
		addValidation : function(opts) {
			for(var key in opts) {
				simplr.dataStorage.form.validators[key] = opts[key];
			}
		},
		// add codes
		addCode : function(opts) {
			for(var key in opts) {
				simplr.dataStorage.form.codes[key] = opts[key];
			}
		},
		// get values
		getValues : function(formSelector) {
			var values = {};
			var elements;
			if(formSelector && (typeof formSelector == "string")) {
				elements = document.querySelector(formSelector).querySelectorAll("input, select, textarea");
			} else {
				elements = formSelector.querySelectorAll("input, select, textarea");
			}
			
			// iterate through all the form elements
			for(var i = 0; i < elements.length; i++) {
				var thisElement = elements[i];
				if((thisElement.type == "button") || (thisElement.type == "reset") || (thisElement.type == "submit") || ((thisElement.type == "radio") && !thisElement.checked)) {
					// excluded from data
				} else if(thisElement.type == "checkbox") {
					// if its a checkbox
					values[thisElement.name] = thisElement.checked ? (thisElement.value == "on" ? true : thisElement.value.trim()) : false;
				} else {
					// handle all other types
					values[thisElement.name] = thisElement.value;
					if((thisElement.type != "password") && (thisElement.type != "file")) {
						// we trim results
						values[thisElement.name] = values[thisElement.name].trim();
						// we update the value
						thisElement.value = values[thisElement.name];
					}
				}
			}
			return values;
		},
		// validate and render
		validate : function(formSelector, formData) {
			var validationData = _transformValues(formData);
			var validatedData = _validate(validationData);
			_render(formSelector, validatedData);
			return validatedData.valid;	
		}
	};

})();(function() {

	// helper function for equal
	function _equal(thing1, thing2) {
		if(typeof thing1 == typeof thing2) {
	    	if(typeof thing1 != "object") { // its a simple object
	            return thing1 == thing2;
	        } else {
	           if(thing1 && (thing1.length !== undefined)) {
	        	   if(thing1.length == thing2.length) {
	                   for(var i = 0, iL = thing1.length; i < iL; i++) {
	                        if(!_equal(thing1[i], thing2[i])) { 
	                            return false;
	                        }
	                    } 
	                    return true;
	                }             
	           } else {
	               // compare key values in each object
	               for(var key in thing1) {
	                    if(!_equal(thing1[key], thing2[key])) { 
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
	
	// Add Codes
	simplr.form.addCode({ 
		eMissingValidator : "Missing Validator",
		eAlphaNumeric : "$[label] is not alphanumeric.",
		eAmericanExpress : "$[label] is not a valid AMERICAN EXPRESS number.",
		eDinersClub : "$[label] is not a valid DINERS CLUB number.",
		eDiscover : "$[label] is not a valid DISCOVER number.",
		eEmail : "$[label] is not an email address.",
		eEqual : "$[label] does not match.",
		eMastercard : "$[label] is not a valid MASTERCARD number.",
		eEmpty : "$[label] is empty.",
		eNumber : "$[label] is not a number.",
		ePhoneNumber : "$[label] is not a valid Phone Number.",
		ePostalCode : "$[label] is not a Postal Code.",
		eVisa : "$[label] is not a valid VISA number."
	});
	
	// Add Validators
	simplr.form.addValidation({
		
		// missing validator
		missingvalidator : function(value) { 
	    	return { 
	            valid : false, 
	            successCodes : [], 
	            errorCodes : ["eMissingValidator"]
	        };
	    },
	    // alphnumeric
		alphanumeric : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^\w*$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eAlphaNumeric");
			}
			return results;
		},
		// american express
		americanexpress : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^3(4|7)\d{2}-?\d{6}-?\d{5}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eAmericanExpress");
			}
			return results;
		},
		// diners club
		dinersclub : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^3[0,6,8]\d{12}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eDinersClub");
			}
			return results;
		},
		// discover card
		discover : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^6011-?\d{4}-?\d{4}-?\d{4}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eDiscover");
			}
			return results;
		},
		// email
		email : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eEmail");
			}
			return results;
		},
		// equal
		equal : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			
			if(value && (typeof value == "object") && (value.length !== undefined)) {
				for(var i = 0; i < value.length; i++) {
					if(!_equal(value[0], value[i])) {
						results.valid = false;
						results.errorCodes.push("eEqual");
						break;
					}
				}
			}
			return results;
		},
		// mastercard
		mastercard : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eMastercard");
			}
			return results;
		},
		// not empty
		notempty : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			// check for empty
			if(!value) {
				results.valid = false;
			} else {
				if(typeof value == "string") {
					results.valid = value.trim() != "";
				} else if(value.length !== undefined) {
					results.valid = value.length != 0;
				}
			}
			if(!results.valid) {
				results.errorCodes.push("eEmpty");
			}
			return results;
		},
		// number
		number : function(value) {
			var results = {
		    		valid : true,
		    		successCodes : [],
		    		errorCodes : []
		    	};
			if(!(!isNaN(parseFloat(value)) && isFinite(value))) {
				results.valid = false;
				results.errorCodes.push("eNumber");
			}
			return results;
		},
		// phone number
		phonenumber : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^\d{10}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("ePhoneNumber");
			}
			return results;
		},
		// postal code
		postalcode : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^\d{5}([\-]?\d{4})?$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("ePostalCode");
			}
			return results;
		},
		// visa
		visa : function(value) {
			var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
			if(!(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/.test(value))) {
				results.valid = false;
				results.errorCodes.push("eVisa");
			}
			return results;
		}
	});

})();
})();