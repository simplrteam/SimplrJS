(function() {
	
	// we need to store data for this feature
	// so we'll create the dataStorage for it
	simplr.dataStorage.view = {
		views : {}
	};
	
	simplr.view = {
		
		// add views	
		add : function(list) {
			for(var key in list) {
				// add this view
				simplr.dataStorage.view.views[key] = {
					html : list[key].html || function(data) { return ""; },
					callback : list[key].callback || function(selector, data) {}
				};
			}
		},
		
		// render view
		render : function(opts) {
			var options = {
				name : (opts && opts.name) || "",
				data : (opts && opts.data) || {},
				selector : (opts && opts.selector) || ""
			};
			// in order to render we need to have a name and selector
			if(options.name && options.selector) {
				// add the html data to the area from selector
				// TODO: replace this without jQuery
				$(options.selector).html(simplr.dataStorage.view.views[options.name].html(options.data));
				// call the callback function from that view
				simplr.dataStorage.view.views[options.name].callback(options.selector, options.data);
			}
		}
			
	};
	
})();