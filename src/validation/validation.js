(function($) {

	$.extend(true, simplr, {
		validation : {
			mAddCodes : function(obj) {
				CORE.validation.mAddCodes(obj);
			},
			mGetCodes : function() {
				return CORE.validation.mGetCodes();
			},
			
			mAddValidators : function(obj) {
				CORE.validation.mAddValidators(obj);
			},
			mGetValidators : function() {
				return CORE.validation.mGetValidators();
			},
		
			mGetRuleResultsTemplate : function() {
				return CORE.validation.mGetRuleResultsTemplate();
			},
			
			mGetCodeMessage : function(code, label) {
				return CORE.validation.mGetCodeMessage(code, label);
			},
			mValidate : function(obj) {
				return CORE.validation.mValidate(obj);
			}
		}
	});

})(jQuery);
