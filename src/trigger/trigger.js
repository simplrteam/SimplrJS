(function() {
	var TriggerData = {
		Env : "_simplr",
		Services : {}
	};
	
	function getServiceIDs() {
		var serviceIDs = [];
		for(var id in TriggerData.Services) {
			serviceIDs.push(id);
		}
		return serviceIDs;
	};
	
	function trigger(triggerObj) {
		var triggerOptions = { services : [], data : { envID : TriggerData.Env } };
		$.extend(true, triggerOptions, triggerObj.options);
		if(Simplr.Core.Util.mEmpty(triggerOptions.services)) { 
			triggerOptions.services = getServiceIDs(); 
		}
		
		var messages = $.extend(Simplr.Core.Console.mGetMessageTemplate(), {
			group : "simplr.trigger: " + TriggerData.Env + " environment",
			message : []
		});
		
		for(var i = 0, iL = triggerOptions.services.length; i < iL; i++) {
			var id = triggerOptions.services[i];
			if($.isFunction(TriggerData.Services[id][triggerObj.type]) && TriggerData.Services[id].data.environmentIDs[TriggerData.Env]) { 
				messages.message.push({
					message : "[" + id + "] " + triggerObj.type + " triggered.",
				    data : TriggerData.Services[id][triggerObj.type](triggerOptions.data)
				});
			}
		}
		
		if( messages.message.length > 0 ) {
			Simplr.Core.Console.mMessage(messages);
		}
	}
	
	Simplr.Trigger = {
		mAddServices : function( services ) {
			for(var serviceName in services) {
				TriggerData.Services[serviceName] = $.extend({
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
		
		mData : function() {
			return TriggerData;
		},

		mSetEnvironment : function( env ) {
			TriggerData.Env = env;
		},
		
		mOnPage : function( options ) {
			trigger({ type : "onPage", options : $.extend({}, options) });
		},
		
		mOnEvent : function( options ) {
			trigger({ type : "onEvent", options : $.extend({}, options) });
		},
		
		mOnTransaction : function( options ) {
			trigger({ type : "onTransaction", options : $.extend({}, options) });
		}
	};
	
	
})();