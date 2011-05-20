(function($) {
	
	function render(selector, obj) {
		var specClass = "_simplr";
		var classes = data.classes;
		
		// Reset the Form
		$("."+classes.formError + "," + "."+classes.fieldError, selector).filter("." + specClass).removeClass(classes.formError).removeClass(classes.fieldError);
		$("."+classes.textInformation + "," + "."+classes.textError, selector).filter("." + specClass).remove();
		
		// Create the Messages
		for(var key in obj.codes) {
			var msgObject = obj.codes[key];
			var html = "";
			
			var msgArray = [ msgObject.error, msgObject.success ];
			for(var i = 0; i < 2; i++) {
				var type = msgArray[i];
				for(var j = 0, jL = type.length; j < jL; j++) {
					html += '<p class="' + (( i == 0) ? classes.textError : classes.textInformation) + ' ' + specClass + '">' + CORE.validation.mGetCodeMessage(type[j], obj.data[key].label) + '</p>';
					break; // Only Display 1 Message
				}
				break; // Only display 1 of each type
			}
			
			// Now find the Form Entry to put the message html
			$("[name='" + key + "']:first", selector).addClass(classes.fieldError + " " + specClass).closest("."+classes.formEntry).addClass(classes.formError + " " + specClass).append(html);
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