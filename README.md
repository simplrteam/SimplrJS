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
		- [REMOVED] Simplr.Ui.* has been removed.  These UI widgets arent' generally used and are better off as specialty features.
		- [REMOVED] Simplr.Core.Ui.* has been removed.  These core features aren't used, or are just duuplicates of base jQuery functionality.
		- [REMOVED] Array.Prototype.remove by John Resig was removed. Use native Array.splice method instead of this method.
		- [REMOVED] Simplr.Core.Util.mHasLocalStorage was removed.  Use your own method to check for localStorage.
		- [REMOVED] Simplr.Util.mHasLocalStorage was removed.  Use your own method to check for localStorage.
			
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
	+	Simplr.Core.Util.*
		-	Simplr.Core.Util.mEmpty()
		-	Simplr.Core.Util.mEqual()
		-	Simplr.Core.Util.mGetUrlParameter()
		Simplr.Core.Validation.*
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
*	Simplr.Util.*
	+	Simplr.Util.mEmpty()
	+	Simplr.Util.mEqual()
	+	Simplr.Util.mGetUrlParameter()
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
