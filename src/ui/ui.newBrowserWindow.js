Simplr.Ui.mNewBrowserWindow = function(options) {
	var opts = $.extend({ url : "", width : 500, height: 500, name : "_simplr_newBrowserWindow"}, options);
	if(!Simplr.Core.Util.mEmpty(opts.url)) {
		var features = "width=" + opts.width + ",height=" + opts.height;
		var url = opts.url;
		var name = opts.name;
		delete opts.url; delete opts.width; delete opts.height; delete opts.name;
		
		for(var key in opts) {
			features += "," + key + "=" + opts[key];
		}
		
		var newWindow = window.open(url, name, features);
		if( newWindow != null) { 
			newWindow.focus(); 
		}
	}
};
