Simplr.Conversion = {
	// We use json2.js to do the actual conversion.
	mObjectToJSONString : function(value, replacer, space) {
		return JSON.stringify(value, replacer, space);
	},
	mJSONStringToObject : function(text, reviver) {
		return JSON.parse(text, reviver);
	}
};
		
	