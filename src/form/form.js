(function($) {
	
	function render(selector, obj) {
		var specClass = "_simplr";
		var theClasses = [
		  data.classes.textError, 
	      data.classes.textInformation, 
	      data.classes.formError, 
	      data.classes.fieldError, 
	      data.classes.formEntry
	    ];
		var theSelectors = [
			"." + theClasses[0],
			"." + theClasses[1],
			"." + theClasses[2],	 
			"." + theClasses[3],
			"." + theClasses[4]
	    ];
		
		/* Reset the Form */
		$(theSelectors[2] + "," + theSelectors[3], selector).filter("." + specClass).removeClass(theClasses[2]).removeClass(theClasses[3]);
		$(theSelectors[1] + "," + theSelectors[0], selector).filter("." + specClass).remove();
		
		/* Create the Messages */
		for(var key in obj.codes) {
			var msgObject = obj.codes[key];
			var html = "";
			$.each([ msgObject.error, msgObject.success ], function(i, type) {
				for(var j = 0, jL = type.length; j < jL; j++) {
					html += '<p class="' + theClasses[i] + ' ' + specClass + '">' + CORE.validation.mGetCodeMessage(type[j], obj.data[key].label) + '</p>';
					j = jL; // Only Display 1 Message
				}
				return false; // Only display 1 of each type
			});
			
			/* Now find the Form Entry to put the message html */
			$("[name='" + key + "']:first", selector).addClass(theClasses[3] + " " + specClass).closest(theSelectors[4]).addClass(theClasses[2] + " " + specClass).append(html);
		}
	};
	
	function transformValues(values) {
		var validationAndRenderValues = {};
		for(var key in values) {
			var label = data.labels[key] ? data.labels[key] : data.defaultLabel;
			var validationObject = { value : values[key], label : label, rules : [] };
			// Add Validators as needed
			for(var i = 0, iL = data.defaultRules.length; i < iL; i++) {
				validationObject.rules.push(data.defaultRules[i]);
			}
			try { data.rules[key](validationObject.rules); } catch(e) {}
			// Return the Transformed Data
			validationAndRenderValues[key] = validationObject;
		}
		return validationAndRenderValues;
	};
	
	var data = {
		classes : {
			formEntry : "formEntry",
			formError : "formError",
			fieldError : "errorField",
			textError : "errorText",
			textInformation : "informationText"
		},
		defaultRules : [ "notempty" ],
		defaultLabel : "_LABEL_",
		rules : { },
		labels : { }
	};
	
	$.extend(true, simplr, {
		form : {
			
			mAddValidators : function(obj) {
				CORE.validation.mAddValidators(obj);
			},
			mGetValidators : function() {
				return CORE.validation.mGetValidators();
			},
			
			mAddCodes : function(obj) {
				CORE.validation.mAddCodes(obj);
			},
			mGetCodes : function() {
				return CORE.validation.mGetCodes();
			},
			
			mAddLabelAssociation : function(obj) {
				$.extend(data.labels, obj);
			},
			mAddValidationAssociation : function(obj) {
				$.extend(data.rules, obj);
			},
			mGetValues : function(selector) {
				var values = {};
				$("input[type='checkbox']", selector).each(function() { 
					values[$(this).attr("name")] = $(this).is(":checked") ? ( $(this).val() != "on" ? $(this).val() : true ) : false;
				});
				$("input[type='text'], input[type='password'], input[type='hidden'], input[type='radio']:checked, select, textarea", selector).each(function() { 
					values[$(this).attr("name")] = $(this).val();
				});
				return values;
			},
			mValidateValuesAndRender : function(selector, values) {
				var validationData = transformValues(values);
				var validatedData = CORE.validation.mValidate(validationData);
				render(selector, validatedData);
				return validatedData.valid;
			}
			
		}
	});

})(jQuery);