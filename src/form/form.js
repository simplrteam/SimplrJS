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
					html += '<p class="' + (( i == 0) ? classes.TextError : classes.TextInformation) + ' ' + specClass + '">' + Simplr.Core.Validation.mGetCodeMessage(msgArray[i][0], obj.data[key].label) + '</p>';
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
			try { FormData.Rules[key](validationObject.rules); } catch(e) {}
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
		mAddValidators : function(obj) {
			Simplr.Core.Validation.mAddValidators(obj);
		},
		mGetValidators : function() {
			return Simplr.Core.Validation.mData().validators;
		},
		mAddCodes : function(obj) {
			Simplr.Core.Validation.mAddCodes(obj);
		},
		mGetCodes : function() {
			return Simplr.Core.Validation.mData().codes;
		},
		mAddLabelAssociation : function(obj) {
			$.extend(FormData.Labels, obj);
		},
		mAddValidationAssociation : function(obj) {
			$.extend(FormData.Rules, obj);
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
			var validatedData = Simplr.Core.Validation.mValidate(validationData);
			render(selector, validatedData);
			return validatedData.valid;
		}
	};

})();