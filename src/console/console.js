Simplr.Console = {
    mMessage : function(options) {
		if(Simplr.Config.Data.ConsoleActive) {
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