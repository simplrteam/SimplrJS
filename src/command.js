(function() {

	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.command = {
		crud : {
			"view" : true, 
			"new" : true, 
			"update" : true, 
			"delete" : true
		},
		commands : {}
	};
	
	// command functionality
	simplr.command = {
	
		// add a command to the system
		add : function(commands) {
			for(var name in commands) {
				var tmp = {
					route : (commands[name] && commands[name].route) || [],
					callback : (commands[name] && commands[name].callback) || function() {}
				};
				var key = tmp.route.join("_");
				if(key) {
					simplr.dataStorage.command.commands[key] = tmp.callback;
				}
			}
		},
		
		// execute a command
		execute : function(command) {
			// routing first
			var routing = { 
				route : [], 
				url : command, 
				resources : {}, 
				action : "", 
				parameters : {} 
			};
			
			// remove hash
			if(routing.url.charAt(0) == "#") {
				routing.url = routing.url.substring(1);
			}
			
			// remove bang
			if(routing.url.charAt(0) == "!") {
				routing.url = routing.url.substring(1);
			}
			
			var urlArray = routing.url.split("?");
			urlArray[0] = decodeURI(urlArray[0]);
			
			// get the crud action
			urlArray[0] = urlArray[0].split("/");
			routing.action = urlArray[0][urlArray[0].length-1];
			routing.action = simplr.dataStorage.command.crud[routing.action] ? routing.action : "view";
			
			// get resources
			var isResource = true;
			var res = "";
			for(var x = 0, xL = urlArray[0].length-1; x < xL; x++)
			{
				if(urlArray[0][x] != "")
				{
					if( isResource )
					{ 
						res = urlArray[0][x];
						routing.route.push(res);
						routing.resources[res] = ""; 
					}
					else
					{ routing.resources[res] = urlArray[0][x]; }
					isResource = !isResource;
				}
			}
			
			// get parameters
			if( urlArray[1] )
			{ 
				var kvArr = urlArray[1].split("&");
				for(var i = 0, iL = kvArr.length; i < iL; i++) {
					var keyValue = kvArr[i].split("=");
					routing.parameters[keyValue[0]] = (decodeURIComponent(keyValue[1]).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')).trim();
				}
			}
			
			// we put the action at the end of the route
			routing.route.push(routing.action);
			
			// now we execute this route
			var key = routing.route.join("_");
			if(simplr.dataStorage.command.commands[key]) {
				simplr.dataStorage.command.commands[key](routing);
			}
		}
			
	}
	
	// we run commands through the hash change event
	window.addEventListener("hashchange", function() {
		simplr.command.execute(window.location.hash);
	}, false);
	
})();