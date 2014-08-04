(function() {
	
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
	
	var FormData = {
		Classes : {
			FormEntry : "formEntry",
			FormError : "formError",
			FieldError : "errorField",
			TextError : "errorText",
			TextInformation : "informationText"
		},
		DefaultRules : [ "notempty" ],
		DefaultLabel : "_LABEL_",
		Rules : { },
		Labels : { }
	};
	
	Simplr.Form = {
	    mAddLabelAssociation : function(obj) {
			$.extend(FormData.Labels, obj);
		},
		mAddValidationAssociation : function(obj) {
			$.extend(FormData.Rules, obj);
		},
		mGetValues : function(selector) {
			var values = {};
			$("input, select, textarea", selector).each(function() {
				var thisEl = $(this);
				if(thisEl.is("[type='button']") || thisEl.is("[type='reset']") || thisEl.is("[type='submit']") || (thisEl.is("[type='radio']") && !thisEl.is(":checked"))) {
					// Excluded	
				} else if( thisEl.is("[type='checkbox']") ) {
					values[$(this).attr("name")] = $(this).is(":checked") ? ( $(this).val() != "on" ? $(this).val() : true ) : false;
				} else {
					values[$(this).attr("name")] = $(this).val();
					if(!thisEl.is("[type='password']")) {
						// trim the value
						values[$(this).attr("name")] = values[$(this).attr("name")].trim();
						// update the display
						$(this).val(values[$(this).attr("name")]);
					}
				}
			});
			return values;
		},
		mValidateValuesAndRender : function(selector, values) {
			var validationData = transformValues(values);
			var validatedData = Simplr.Validation.mValidate(validationData);
			render(selector, validatedData);
			return validatedData.valid;
		}
	};

})();