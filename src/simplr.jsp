<%@ include file="/includes/include_jstl.jsp" %>

<%-- Set the Response Header --%>
<% response.setHeader("Content-Type","text/javascript"); %>

(function($) {

	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
	  var rest = this.slice((to || from) + 1 || this.length);
	  this.length = from < 0 ? this.length + from : from;
	  return this.push.apply(this, rest);
	};

	var CORE = {
		config : {
			console : false
		}
	};
	<jsp:include page="CORE/CORE.console.js" />
	<jsp:include page="CORE/CORE.util.js" />
	<jsp:include page="CORE/CORE.ui.js" />
	<jsp:include page="CORE/CORE.validation.js" />
	
	var simplr = window.simplr = {
		config : {
			mToggleConsole : function(on) {
				$("#_simplr_core_console").remove();
				CORE.config.console = false;
				if(on) {
					try {
						if( typeof window.console != "undefined" && typeof window.console.group != "undefined") {
							$(function() {
								var consoleBarEl = $('<p></p>').attr('id','_simplr_core_console').css({textAlign: 'center', position: 'fixed', top: '0', width: '100%', borderBottom: '1px solid #000', color: '#000', backgroundColor: '#f00', padding: '5px', fontSize: '11px', opacity:'0.75'}).text('[console]: Console Messaging Active');
								$("body").append(consoleBarEl);
								consoleBarEl.mouseover(function(){ $(this).slideUp(); })
								consoleBarEl.mouseout(function(){ $(this).delay(3000).slideDown(); });
							});
							CORE.config.console = true;
						}
					} catch(e) {}
				}
				return CORE.config.console;
			}
		}
	};
	
	<%-- browser --%>
	<jsp:include page="browser/browser.js" />
	
	<%-- cache --%>
	<jsp:include page="cache/cache.js" />
	
	<%-- cookie --%>
	<jsp:include page="cookie/cookie.js" />
	
	<%-- controller --%>
	<jsp:include page="controller/jquery.ba-hashchange.js" />
	<jsp:include page="controller/controller.js" />
	
	<%-- conversion --%>
	<jsp:include page="conversion/json2.js" />
	<jsp:include page="conversion/conversion.js" />
	
	<%-- form --%>
	<jsp:include page="form/form.js" />
	<jsp:include page="form/defaultCodesAndValidators.js" />
	
	<%-- layout --%>
	<jsp:include page="layout/innerxhtml.js" />
	<jsp:include page="layout/layout.js" />
	
	<%-- tracker --%>
	<jsp:include page="trigger/trigger.js" />
	
	<%-- ui --%>
	<jsp:include page="ui/ui.layer.js" />
	<jsp:include page="ui/ui.newBrowserWindow.js" />
	<jsp:include page="ui/ui.widget.oTrackableScrollingElement.js" />
	
	<%-- util --%>
	<jsp:include page="util/util.js" />
	
	<%-- validation --%>
	<jsp:include page="validation/validation.js" />
	<jsp:include page="validation/defaultCodesAndValidators.js" />
	
	<%-- view --%>
	<jsp:include page="view/view.js" />

})(jQuery);