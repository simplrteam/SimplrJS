(function() {
	
	var cClass = "_simplr_centerLayer";
	var kcClass = "_simplr_keepCenterLayer";
	
	function addLayer(opts) {
		var layer = $("#"+opts.id);
		if(layer.size() == 0) { // layer doesn't exist
			$("body").append('<div id="' + opts.id + '" style="position: absolute;"></div>');
		} else { // layer exists
			layer.removeClass(cClass).removeClass(kcClass);
			$(opts.closeSelector).unbind("click.simplr.layer.destroy." + opts.id);
		}
		
		var jqThisLayer = $("#" + opts.id);
		var centered = !(opts.xPos != null && opts.yPos != null);
		
		if( !centered ) {
			jqThisLayer.css("left", opts.xPos+"px").css("top", opts.yPos+"px"); 
		} else {
			if( opts.keepCentered ) { 
				jqThisLayer.addClass(kcClass); 
			}
			Simplr.Ui.Layer.mCenter(opts.id);
		}
		
		jqThisLayer.html(opts.defaultContent);
		if(centered) {
			Simplr.Ui.Layer.mCenter(opts.id);
		}
		
		$(opts.closeSelector).bind("click.simplr.layer.destroy." + opts.id, function(evt) {
			evt.preventDefault();
			Simplr.Ui.Layer.mDestroy({ id : opts.id, closeSelector : opts.closeSelector });
		});
	};
	
	Simplr.Ui.Layer = {
		mCenter : function(id) {
			if(!Simplr.Core.Util.mEmpty(id)) {
				var jqThisLayer = $("#" + id);
				var lWidth = jqThisLayer.width();
				var lHeight = jqThisLayer.height();
				var screenInfo = Simplr.Core.Ui.mWindowInfo();
				
				/* Get Left Offset */
				var left = 0;
				left = (( screenInfo.dimensions[0] - lWidth ) / 2);
				left = ( left < 0 ) ? 20 : left;
				left += screenInfo.offsets[0];
				
				/* Get Top Offset */
				var top = 0;
				top = (( screenInfo.dimensions[1] - lHeight ) / 2);
				top = ( top < 0 ) ? 20 : top;
				top += screenInfo.offsets[1];
				
				/* if layer Can't be centered on Screen */
				if( ( lWidth > screenInfo.dimensions[0] ) || ( lHeight > screenInfo.dimensions[1] ) ) { 
					/* Should this layer stay centered? */
					if( jqThisLayer.hasClass(kcClass) )	{ 
						jqThisLayer.removeClass(kcClass).addClass(cClass); 
					}
				}
				
				jqThisLayer.css("top",top+"px").css("left", left+"px");
			}
		},
		mCreate : function(options) {
			var opts = $.extend({
				ajax : null,
				callback : null,
				closeSelector : "#_simplr_layerClose",
				defaultContent : "",
				id : "_simplr_layer",
				isOverlay : false,
				keepCentered : false,
				xPos : null,
				yPos : null
			}, options);
			
			if( opts.isOverlay ) { 
				opts.id = opts.id == "_simplr_layer" ? "_simplr_overlay" : opts.id;
				opts.closeSelector = opts.closeSelector == "#_simplr_layerClose" ? "#_simplr_overlayClose" : opts.closeSelector;
				opts.xPos = 0;
				opts.yPos = 0;
			}
			
			addLayer(opts);
			
			if(opts.ajax != null) { 
				var previousCallback = opts.ajax.success;
				opts.ajax.success = function(data, textStatus) {
					opts.defaultContent = data;
					addLayer(opts);
					if( $.isFunction(previousCallback) ) { 
						previousCallback(data, textStatus); 
					}
				};
				$.ajax(opts.ajax); 
			} else {
				if( $.isFunction(opts.callback) ) { 
					opts.callback(); 
				}
			}
			
			if(opts.isOverlay) { 
				$("#" + opts.id).css({ "position" : "fixed", "width" : "100%", "height" : "100%" }); 
			}
		},
		mDestroy : function(options) {
			var opts = $.extend({ id : "_simplr_layer", closeSelector : "#_simplr_layerClose" }, options);
			if(!Simplr.Core.Util.mEmpty(opts.id)) {
				$("#"+opts.id).remove();
				$(opts.closeSelector).unbind("click.simplr.ui.layer.destroy." + opts.id);
			}
		}
	};
	
	/* this managers the layers during window scroll or resize. */
	$(function() {
		$(window).bind("resize.simplr.ui.layer", function() {
			$("." + kcClass +","+ "." +cClass).each(function(i, layer) {
				$(layer).addClass( kcClass ).removeClass( cClass );
				Simplr.Ui.Layer.mCenter($(layer).attr("id"));
			});
		}).bind("scroll.simplr.ui.layer", function() {
			$("." + kcClass).each(function(i, layer) { 
				Simplr.Ui.Layer.mCenter($(layer).attr("id")); 
			});
		});
	});

})();