(function($) {
	
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
	
	var data = {
		codes : {
			eEmpty : "$[label] is empty.",
			eMissingValidator : "Missing Validator"
		},
		codeResultsTemplate : { 
			success : [], 
			error : []
		},
		defaultCodeMessage : "$[label] is UNDEFINED",
		ruleResultsTemplate : { 
			valid : true, 
			successCodes : [], 
			errorCodes : []
		},
		validators : {
			missingvalidator : function(value) { 
				return $.extend(true, {}, Simplr.Core.Validation.mGetRuleResultsTemplate(), { valid : false, errorCodes : [ "eMissingValidator" ] }); 
			},
			notempty : function(value) {
				var results = $.extend(true, {}, Simplr.Core.Validation.mGetRuleResultsTemplate());
				if( typeof value != "undefined" && value != null ) {
					if( typeof value == "string" ) { results.valid = !($.trim(value) == ""); }
					else if( $.isArray(value) ) { results.valid = !(value.length == 0); }
					else if( typeof value == "object" ) { results.valid = !$.isEmptyObject(value); }
				}
				if(!results.valid) { results.errorCodes.push("eEmpty"); }
				return results;
			}
		},
		validationResultsTemplate : { 
			data : "", 
			valid : true, 
			codes : {}
		}
	};
	
	
	Simplr.Core.Validation = {
		mAddCodes : function(obj) {
			$.extend(data.codes, obj);
		},
		mAddValidators : function(obj) {
			$.extend(data.validators, obj);
		},
		mData : function() {
			return data;
		},
		mGetCodeMessage : function(code, label) {
			if( data.codes[code] != undefined ) {
				return replaceTokens({ label : label }, data.codes[code]);
			}
			return replaceTokens({ label : code }, data.defaultCodeMessage);
		},
		mGetRuleResultsTemplate : function() {
			return $.extend(true, {}, data.ruleResultsTemplate);
		},
		mValidate : function(dataObject) {
			var results = $.extend(true, {}, data.validationResultsTemplate, { data : $.extend(true, {}, dataObject)});
			for(var key in results.data) {
				// Check the Rules for this data
				var entry = results.data[key];
				results.codes[key] = $.extend(true, {}, data.codeResultsTemplate);
				for(var i = 0, iL = entry.rules.length; i < iL; i++) {
					var rule = entry.rules[i];
					var tmpValidationData = $.extend(true, {}, data.ruleResultsTemplate);
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
	
})(jQuery);