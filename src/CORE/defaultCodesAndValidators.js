/* Add Codes */
CORE.validation.mAddCodes({ 
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

/* Add Validators */
CORE.validation.mAddValidators({
	/* Missing Validator */
	missingvalidator : function(value) { 
		return $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : false, errorCodes : [ "eMissingValidator" ] }); 
	},
	
	alphanumeric : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^\w*$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eAlphaNumeric"); }
		return results;
	},
	americanexpress : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^3(4|7)\d{2}-?\d{6}-?\d{5}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eAmericanExpress"); }
		return results;
	},
	dinersclub : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^3[0,6,8]\d{12}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eDinersClub"); }
		return results;
	},
	discover : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^6011-?\d{4}-?\d{4}-?\d{4}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eDiscover"); }
		return results;
	},
	email : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eEmail"); }
		return results;
	},
	equal : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate());
		if( $.isArray(value) ) { 
			for(var i = 0, iL = value.length; i < iL; i++) {
				if(!CORE.util.mEqual([value[0], value[i]])) {
					results.valid = false; 
					i = iL;
				}
			}
		}
		if( !results.valid ) { results.errorCodes.push("eEqual"); }
		return results;
	},
	mastercard : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eMastercard"); }
		return results;
	},
	notempty : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate());
		if( typeof value != "undefined" && value != null ) {
			if( typeof value == "string" ) { results.valid = !($.trim(value) == ""); }
			else if( $.isArray(value) ) { results.valid = !(value.length == 0); }
			else if( typeof value == "object" ) { results.valid = !$.isEmptyObject(value); }
		}
		if(!results.valid) { results.errorCodes.push("eEmpty"); }
		return results;
	},
	number : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : ( !isNaN(parseFloat(value)) && isFinite(value) ) });
		if( !results.valid ) { results.errorCodes.push("eNumber"); }
		return results;
	},
	phonenumber : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^\d{10}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("ePhoneNumber"); }
		return results;
	},
	postalcode : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^\d{5}([\-]?\d{4})?$/.test(value) });
		if( !results.valid ) { 
			results.errorCodes.push("ePostalCode") 
		}
		return results;	
	},
	visa : function(value) {
		var results = $.extend(true, {}, CORE.validation.mGetRuleResultsTemplate(), { valid : /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/.test(value) });
		if( !results.valid ) { results.errorCodes.push("eVisa"); }
		return results;
	}
});