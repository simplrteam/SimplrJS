(function() {

    var isActive = false;

    Simplr.Console = {
        mToggle : function(on) {
            isActive = (typeof window.console != "undefined") && (typeof window.console.group != "undefined") && on;
            _notifier(isActive, "Console", "!-- Console Messaging is Active --!");
        },
        mMessage : function(options) {
    		if(isActive) {
    			var messageData = $.extend({
                    group : "",
                    message : "",
                    data : ""
                }, options)
    			
    			if($.isArray(messageData.message)) {
    			    console.group(messageData.group);
    			    for(var i = 0, iL = messageData.message.length; i < iL; i++) {
                        Simplr.Console.mMessage(messageData.message[i]);
                    }
                    console.groupEnd();
    			} else {
    			    console.group(messageData.message);
                    console.log(messageData.data);
                    console.groupEnd();
    			}
    		}
    	}
    	
    };

})();