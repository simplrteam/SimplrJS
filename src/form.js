(function() {
	
	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.form = {
		classes : {
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
		codes : {
			eEmpty : "$[label] is empty.",
			eMissingValidator : "Missing Validator"
		},
		codeResultsTemplate : { 
            success : [], 
            error : []
        },
        defaultCodeMessage : "$[label] is UNDEFINED",
        validators : {}
    };
	
	
	/*
	// we actually run the validation engine seperatly
	function mergeValidationResults(key, rule, newData, existingData) {
        existingData.codes[key].success = existingData.codes[key].success.concat( newData.successCodes );
        existingData.codes[key].error = existingData.codes[key].error.concat( newData.errorCodes );
        if( !newData.valid ) { existingData.valid = false; }
    };
    
    function replaceTokens(keys, message) {
        var results = message;
        for(var token in keys) {
            results = results.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
        }
        return unescape(results);
    };
    
    Simplr.Validation = {
    	
    	mGetCodes : function() {
    		return data.codes;
    	},
    	mGetValidators : function() {
    		return data.validators;
    	},
    	mGetCodeMessage : function(code, label) {
            if( data.codes[code] != undefined ) {
                return replaceTokens({ label : label }, data.codes[code]);
            }
            return replaceTokens({ label : code }, data.defaultCodeMessage);
        },
        mValidate : function(dataObject) {
            var results = $.extend(true, {}, data.validationResultsTemplate, { data : $.extend(true, {}, dataObject)});
            for(var key in results.data) {
                // Check the Rules for this data
                var entry = results.data[key];
                results.codes[key] = $.extend(true, {}, data.codeResultsTemplate);
                for(var i = 0, iL = entry.rules.length; i < iL; i++) {
                    var rule = entry.rules[i];
                    var tmpValidationData = $.extend(true, {}, {
                    	valid : true,
    					successCodes : [],
    					errorCodes : []
                    });
                    if( data.validators[rule] ) { 
                        tmpValidationData = data.validators[rule](entry.value); 
                    } else { 
                        tmpValidationData = data.validators["missingvalidator"](entry.value); 
                    }
                    mergeValidationResults(key, rule, tmpValidationData, results);
                }
                // Cleanup Data
                if( results.codes[key].error.length == 0 && results.codes[key].success.length == 0 ) { 
                    delete results.codes[key]; 
                }
            }
            return results;
        }
    };
	*/
	
	// feature
	simplr.form = {
		// add a label associations
		addLabelAssociation : function(opts) {
			
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
					if(thisElement.type != "password") {
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
			
		}
	};
	
	/*
	function render(selector, obj) {
		var specClass = "_simplr";
		var classes = FormData.Classes;
		
		// Reset the Form
		$("."+classes.FormError + "," + "."+classes.FieldError, selector).filter("." + specClass).removeClass(classes.FormError).removeClass(classes.FieldError);
		$("."+classes.TextInformation + "," + "."+classes.TextError, selector).filter("." + specClass).remove();
		
		// Create the Messages
		for(var key in obj.codes) {
			var msgObject = obj.codes[key];
			var msgArray = [ msgObject.error, msgObject.success ];
			var html = "";
			for(var i = 0; i < 2; i++) {
				// Only showing 1 message at a time.
				if(msgArray[i].length > 0) {
					html += '<p class="' + (( i == 0) ? classes.TextError : classes.TextInformation) + ' ' + specClass + '">' + Simplr.Validation.mGetCodeMessage(msgArray[i][0], obj.data[key].label) + '</p>';
				}
			}
			
			// Now find the Form Entry to put the message html
			$("[name='" + key + "']:first", selector).addClass(classes.FieldError + " " + specClass).closest("."+classes.FormEntry).addClass(classes.FormError + " " + specClass).append(html);
		}
	};
	
	function transformValues(values) {
		var validationAndRenderValues = {};
		for(var key in values) {
			var label = FormData.Labels[key] ? FormData.Labels[key] : FormData.DefaultLabel;
			var validationObject = { value : values[key], label : label, rules : [] };
			// Add Validators as needed
			for(var i = 0, iL = FormData.DefaultRules.length; i < iL; i++) {
				validationObject.rules.push(FormData.DefaultRules[i]);
			}
			if($.isFunction(FormData.Rules[key])) {
			  FormData.Rules[key](validationObject.rules);
			}
			// Return the Transformed Data
			validationAndRenderValues[key] = validationObject;
		}
		return validationAndRenderValues;
	};
	
	
	
	Simplr.Form = {
	    mAddLabelAssociation : function(obj) {
			$.extend(FormData.Labels, obj);
		},
		mAddValidationAssociation : function(obj) {
			
		},
		mGetValues : function(selector) {
			
		},
		mValidateValuesAndRender : function(selector, values) {
			var validationData = transformValues(values);
			var validatedData = Simplr.Validation.mValidate(validationData);
			render(selector, validatedData);
			return validatedData.valid;
		}
	};
	*/

})();