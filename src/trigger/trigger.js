(function($) {
	var mD = {
		env : "_simplr",
		services : {}
	};
	
	function getServiceIDs() {
		var serviceIDs = [];
		for(var id in mD.services) {
			serviceIDs.push(id);
		}
		return serviceIDs;
	};
	
	function trigger(triggerObj) {
		var triggerOptions = { services : [], data : { envID : mD.env } };
		$.extend(true, triggerOptions, triggerObj.options);
		if(CORE.util.mEmpty(triggerOptions.services)) { 
			triggerOptions.services = getServiceIDs(); 
		}
		
		var messages = $.extend(CORE.console.mGetMessageTemplate(), {
			group : "simplr.trigger: " + mD.env + " environment",
			message : []
		});
		
		for(var i = 0, iL = triggerOptions.services.length; i < iL; i++) {
			var id = triggerOptions.services[i];
			if($.isFunction(mD.services[id][triggerObj.type]) && mD.services[id].data.environmentIDs[mD.env]) { 
				messages.message.push({
					message : "[" + id + "] " + triggerObj.type + " triggered.",
				    data : mD.services[id][triggerObj.type](triggerOptions.data)
				});
			}
		}
		
		if( messages.message.length > 0 ) {
			CORE.console.mMessage(messages);
		}
	}
	
	$.extend(simplr, {
		trigger : {
			mAddServices : function( services ) {
				for(var serviceName in services) {
					mD.services[serviceName] = $.extend({
						data : {
							environmentIDs : {}
						},
						onLoad : function() {},
						onPage : function() {},
						onEvent : function() {},
						onTransaction : function() {}
					}, services[serviceName]);
					trigger({ type : "onLoad", options : { services : [ serviceName ] } });
				}
			},
			
			mGetServices : function() {
				return mD.services;
			},

			mSetEnvironment : function( env ) {
				mD.env = env;
			},
			
			mOnPage : function( options ) {
				trigger({ type : "onPage", options : $.extend({},options) });
			},
			
			mOnEvent : function( options ) {
				trigger({ type : "onEvent", options : $.extend({},options) });
			},
			
			mOnTransaction : function( options ) {
				trigger({ type : "onTransaction", options : $.extend({},options) });
			}
		}
	});
	
})(jQuery);