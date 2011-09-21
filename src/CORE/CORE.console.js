(function() {
	
	function renderMessages(data) {
		if( $.isArray(data.message) ) {
			console.group(data.group);
			for(var i = 0, iL = data.message.length; i < iL; i++) {
				var newMessageData = $.extend(Simplr.Core.Console.mGetMessageTemplate(), data.message[i]);
				renderMessages(newMessageData);
			}
			console.groupEnd();
		} else {
			console.group(data.message);
			console.log(data.data);
			console.groupEnd();
		}
	};
	
	Simplr.Core.Console = {
			
		mGetMessageTemplate : function() {
			return { group : "", message : "", data : "" };
		},

		mMessage : function(options) {
			if(Simplr.Config.Data.ConsoleActive) {
				var messageData = $.extend(Simplr.Core.Console.mGetMessageTemplate(), options);
				renderMessages(messageData);
			}
		}
		
	};
	
})();