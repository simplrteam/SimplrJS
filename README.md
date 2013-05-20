[v3.0.0 Beta] SimplrJS
=============

Description
-----------

SimplrJS ( Simplr ) is javascript platform for developing flexable, dynamic, ajaxy web applications with a stressing MVC and resource driven url design patterns.

Requirments
-----------


Installation & Requirments
-----------

jQuery is required for underlying javascript support.  SimplrJS is NOT a jQuery plugin, but instead leverages jQuery as needed for DOM manipulation.
Just include this javascript library with jQuery and start coding away!

Change Log
------------

v3.0.0

	Features:
		- 
		
	Bug Fixes:
		- 
		
	Refactor:
		- [UPDATED] Simplr.Cache.* now always returns null or data for all operations.  NULL can be used to check if soemthing doesn't exist or has expired.
		- [UPDATED] Simplr.Cookie.* now always returns null or data for all operations. NULL can be used to check if soemthing doesn't exist or has expired. 
		- [REMOVED] Simplr.Conversion.* has been removed. Use JSON.parse() and JSON.stringify() native methods.
		- [REMOVED] Simplr.Browser.* has been removed.  The current browser / device landscape makes this outdated.
		
	Other
		- Updated to jquery 2.0.0
		

Functionality
---------------
*	Simplr.Cache.*
	+	Simplr.Cache.mExpire()
	+	Simplr.Cache.mGet()
	+	Simplr.Cache.mSet()
*	Simplr.Controller.*
	+	Simplr.Controller.mAddBases()
	+	Simplr.Controller.mAddCommands()
	+	Simplr.Controller.mData()
	+	Simplr.Controller.mExecute()
	+	Simplr.Controller.mRoute()
	+	Simplr.Controller.mRouteAndExecute()
*	Simplr.Cookie.*
	+	Simplr.Cookie.mGet()
	+	Simplr.Cookie.mSet()
	+	Simplr.Cookie.mExpire()
*	Simplr.Core.*
	+	Simplr.Core.Console.*
		-	Simplr.Core.Console.mGetMessageTemplate()
		-	Simplr.Core.Console.mMessage()
	+	Simplr.Core.Ui.*
		-	Simplr.Core.Ui.mElementInfo()
		-	Simplr.Core.Ui.mWindowInfo()
	+	Simplr.Core.Ui.Widget.*
		-	Simplr.Core.Ui.Widget.mGenerateWidgetID()
	+	Simplr.Core.Util.*
		-	Simplr.Core.Util.mEmpty()
		-	Simplr.Core.Util.mEqual()
		-	Simplr.Core.Util.mGetUrlParameter()
		-	Simplr.Core.Util.mHasLocalStorage()
	+	Simplr.Core.Validation.*
		-	Simplr.Core.Validation.mAddCodes()
		-	Simplr.Core.Validation.mAddValidators()
		-	Simplr.Core.validation.mData()
		-	Simplr.Core.Validation.mGetCodeMessage()
		-	Simplr.Core.Validation.mGetRuleResultsTemplate()
		-	Simplr.Core.Validation.mValidate()
*	Simplr.Form.*
	+	Simplr.Form.mAddValidators()
	+	Simplr.Form.mGetValidators()
	+	Simplr.Form.mAddCodes()
	+	Simplr.Form.mGetCodes()
	+	Simplr.Form.mAddLabelAssociation()
	+	Simplr.Form.mAddValidationAssociation()
	+	Simplr.Form.mGetValues()
	+	Simplr.Form.mValidateValuesAndRender()
*	Simplr.Layout.*
	+	Simplr.Layout.mAddComponents()
	+	Simplr.Layout.mAssembleLayout()
	+	Simplr.Layout.mData()
	+	Simplr.Layout.mGetComponent()
	+	Simplr.Layout.mAddGlobalTokens()
	+	Simplr.Layout.mReplaceTokens()
*	Simplr.Trigger.*
	+	Simplr.Trigger.mAddServices()
	+	Simplr.Trigger.mSetEnvironment()
	+	Simplr.Trigger.mData()
	+	Simplr.Trigger.mOnPage()
	+	Simplr.Trigger.mOnEvent()
	+	Simplr.Trigger.mOnTransaction()
*	Simplr.Ui.*
	+	Simplr.Ui.Layer.*
		-	Simplr.Ui.Layer.mCenter()
		-	Simplr.Ui.Layer.mCreate()
		-	Simplr.Ui.Layer.mDestroy()
	+	Simplr.Ui.mNewBrowserWindow()
	+	Simplr.Ui.Widget.*
		-	Simplr.Ui.Widget.oTrackableScrollingElement()
			1.	this.reset()
			2.	this.destroy()
*	Simplr.Util.*
	+	Simplr.Util.mEmpty()
	+	Simplr.Util.mEqual()
	+	Simplr.Util.mGetUrlParameter()
	+	Simplr.Util.mHasLocalStorage()
	+	Simplr.Util.mTruncateString()
*	Simplr.Validation.*
	+	Simplr.Validation.mAddCodes()
	+	Simplr.Validation.mGetCodes()
	+	Simplr.Validation.mAddValidators()
	+	Simplr.Validation.mGetValidators()
	+	Simplr.Validation.mGetRuleResultsTemplate()
	+	Simplr.Validation.mGetCodeMessage()
	+	Simplr.Validation.mValidate()
*	Simplr.View.*
	+	Simplr.View.mAddViews()
	+	Simplr.View.mData()
	+	Simplr.View.mRender()

Usage
-----
see [SimplrJS Documentation](http://simplrjs.com/docs/)
