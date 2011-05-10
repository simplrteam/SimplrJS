(function($) {
	
	function renderMessages(data) {
		if( $.isArray(data.message) ) {
			console.group(data.group);
			for(var i = 0, iL = data.message.length; i < iL; i++) {
				var newMessageData = $.extend(CORE.console.mGetMessageTemplate(), data.message[i]);
				renderMessages(newMessageData);
			}
			console.groupEnd();
		} else {
			console.group(data.message);
			console.log(data.data);
			console.groupEnd();
		}
	};
	
	$.extend(true, CORE, {
		console : {
			
			mGetMessageTemplate : function() {
				return { group : "", message : "", data : "" };
			},
	
			mMessage : function(options) {
				if(CORE.config.console) {
					var messageData = $.extend(CORE.console.mGetMessageTemplate(), options);
					renderMessages(messageData);
				}
			}
			
		}
		
	});
	
})(jQuery);