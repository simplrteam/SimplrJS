(function($) {

	function htmlEntities(string) {
		return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
	};
	
	var mD = {
		crud : { 
			"view" : true, 
			"new" : true, 
			"update" : true, 
			"delete" : true 
		},
		commands : {},
		bases : {}
	};
	
	$.extend(simplr, {
		controller : {
			
			mAddBases : function(bases) {
				var collection = $.isArray(bases) ? bases : [ bases ];
				for(var i = 0, iL = collection.length; i < iL; i++) {
					mD.bases[collection[i]] = 1;
				}
			},
			
			mAddCommands : function(commands) {
				$.each(commands, function(name, command) {
					var tmp = $.extend({ route : [], callback : function() {} }, command);
					var key = tmp.route.join("_");
					if( key != "" )
					{ mD.commands[key] = tmp.callback; }
				});
			},
			
			mExecute : function(data) {
				var key = data.route.join("_");
				try { mD.commands[key](data); } catch(e) { };
			},
			
			mGetCommands : function() {
				return mD.commands;
			},
			
			mGetBases : function() {
				return mD.bases;
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
				var tmpURL = urlArray[0];
				$.each(mD.bases, function(base) {
					if( (urlArray[0] = urlArray[0].replace(base, "")) != tmpURL )
					{ ret.base = base; ret.route.push(base); return false; }
				});
				
				/* 2. Get CRUD Operation */
				urlArray[0] = urlArray[0].split("/");
				ret.action = urlArray[0][urlArray[0].length-1];
				ret.action = mD.crud[ret.action] ? ret.action : "view";
				
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
						ret.parameters[keyValue[0]] = $.trim(htmlEntities(keyValue[1]));
					}
				}
				
				ret.route.push(ret.action);
				return ret;
			},
			
			mRouteAndExecute : function(hashURLPart) {
				Cu.mExecute(Cu.mRoute(decodeURI(hashURLPart)));
			}
			
		}
	});	
	
	var Cu = simplr.controller;
	
	$(function() {
		$(window).hashchange(function() {
			if( window.location.hash != "" ) {
				Cu.mRouteAndExecute(window.location.hash);
			}
		});
	});
	
})(jQuery);