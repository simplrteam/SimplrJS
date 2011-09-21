(function() {

	function htmlEntities(string) {
		return string.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
	};
	
	var ControllerData = {
		CRUD : { 
			"view" : true, 
			"new" : true, 
			"update" : true, 
			"delete" : true 
		},
		Commands : {},
		Bases : {}
	};
	
	Simplr.Controller = {
		
		mAddBases : function(bases) {
			var collection = $.isArray(bases) ? bases : [ bases ];
			for(var i = 0, iL = collection.length; i < iL; i++) {
				ControllerData.Bases[collection[i]] = 1;
			}
		},
		
		mAddCommands : function(commands) {
			for(var name in commands) {
				var tmp = $.extend({ route : [], callback : function() {} }, commands[name]);
				var key = tmp.route.join("_");
				if( key != "" )
				{ ControllerData.Commands[key] = tmp.callback; }
			}
		},
		
		mData : function() {
			return ControllerData;
		},
		
		mExecute : function(data) {
			var key = data.route.join("_");
			try { ControllerData.Commands[key](data); } catch(e) { };
		},
		
		mRoute : function(url) {
			var ret = { route : [], url : url, base : "", resources : {}, action : "", parameters : {} };
			// remove hash
			if(ret.url[0] == "#") {
				ret.url = ret.url.substring(1);
			}
			// remove bang
			if(ret.url[0] == "!") {
				ret.url = ret.url.substring(1);
			}
			
			var urlArray = ret.url.split("?");
			
			/* 1. Find the base and remove if its there */
			var tmpURL = decodeURI(urlArray[0]);
			for(var base in ControllerData.Bases) {
				if( (urlArray[0] = urlArray[0].replace(base, "")) != tmpURL ) { 
					ret.base = base; ret.route.push(base); break;
				}
			}
			
			/* 2. Get CRUD Operation */
			urlArray[0] = urlArray[0].split("/");
			ret.action = urlArray[0][urlArray[0].length-1];
			ret.action = ControllerData.CRUD[ret.action] ? ret.action : "view";
			
			/* 3. Get the Resources */
			var isResource = true;
			var res = "";
			for(var x = 0, xL = urlArray[0].length-1; x < xL; x++)
			{
				if(urlArray[0][x] != "")
				{
					if( isResource )
					{ 
						res = urlArray[0][x];
						ret.route.push(res);
						ret.resources[res] = ""; 
					}
					else
					{ ret.resources[res] = urlArray[0][x]; }
					isResource = !isResource;
				}
			}
			
			/* 4. Get Parameters */
			if( urlArray[1] )
			{ 
				var kvArr = urlArray[1].split("&");
				for(var i = 0, iL = kvArr.length; i < iL; i++) {
					var keyValue = kvArr[i].split("=");
					ret.parameters[keyValue[0]] = $.trim(htmlEntities(decodeURIComponent(keyValue[1])));
				}
			}
			
			ret.route.push(ret.action);
			return ret;
		},
		
		mRouteAndExecute : function(hashURLPart) {
			Simplr.Controller.mExecute(Simplr.Controller.mRoute(hashURLPart));
		}
	};
	
	$(function() {
		$(window).hashchange(function() {
			var hash = window.location.href.split("#");
			if(hash.length < 2) {
				if(!Simplr.Core.Util.mEmpty(hash[1])) {
					Simplr.Controller.mRouteAndExecute(hash[1]);
				}
			}
		});
	});
	
})();