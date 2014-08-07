(function() {

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
	    // not empty
	    notempty : function(value) {
	    	var results = {
	    		valid : true,
	    		successCodes : [],
	    		errorCodes : []
	    	};
	        if(value.trim() == "") {
	    		results.valid = false;
	    		results.errorCodes.push("eEmpty");
	    	}
	    	return results;
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
				results.errorcodes.push("eEmail");
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
			if(value && (value.length !== undefined)) {
				for(var i = 0; i < value.length; i++) {
					if(!_equal([value[0], value[i]])) {
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