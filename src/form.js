(function() {
	
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

})();