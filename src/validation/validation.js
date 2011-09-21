Simplr.Validation = {
	mAddCodes : function(obj) {
		Simplr.Core.Validation.mAddCodes(obj);
	},
	mGetCodes : function() {
		return Simplr.Core.Validation.mData().codes;
	},
	mAddValidators : function(obj) {
		Simplr.Core.Validation.mAddValidators(obj);
	},
	mGetValidators : function() {
		return Simplr.Core.Validation.mData().validators;
	},
	mGetRuleResultsTemplate : function() {
		return Simplr.Core.Validation.mGetRuleResultsTemplate();
	},
	mGetCodeMessage : function(code, label) {
		return Simplr.Core.Validation.mGetCodeMessage(code, label);
	},
	mValidate : function(obj) {
		return Simplr.Core.Validation.mValidate(obj);
	}
};