(function() {

    function notify(on) {
        $("#_SimplrNotify").remove();
        if(on) {
            $(function() {
                var html =  '<div id="_SimplrNotify" style="position: fixed; top: 0; left: 0; width: 100%; box-shadow: 0 0 5px #000; text-transform: uppercase; font-family: Arial; text-align: center; font-size: 16px; font-weight: normal; color: #000; background: #ccc none; line-height: 1.25; padding: 0; margin: 0; border: 0;">' +
                                '<p style="margin: 10px 0; padding: 0;">!-- Simplr Console Messaging is Active --!</p>' +
                            '</div>';
                $("body").prepend(html);
            });
        }
    };

    var isActive = false;

    Simplr.Console = {
        mToggle : function(on) {
            isActive = (typeof window.console != "undefined") && (typeof window.console.group != "undefined") && on;
            notify(isActive);
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