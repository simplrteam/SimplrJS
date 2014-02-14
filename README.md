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
		- Added samples folder with code samples.
		
	Bug Fixes:
		- 
		
	Refactor:
		- [ADDED] Simplr.Layout.mAddGlobalToken(token, value) has been added. Where "token" is the token to replace and "value" is the replacement value.
		- [ADDED] Simplr.Layout.mAddComponent(key, component) has been added. Where "key" is a text value and "component" is a text value that contains a html string.
		- [ADDED] Simplr.Console.mMessage was added. Replaces Simplr.Core.Console.mMessage
		- [ADDED] Simplr.Console.mToggle was added. Turns on / off the console.  Replaces the usage of Simplr.Config.mToggleConsole()
		- [ADDED/UPDATED] Simplr.Trigger.mOnLoad. Triggers are no longer loaded automatically.  You must call the Simplr.Trigger.mOnLoad() method to load the triggers.
		- [UPDATED] Email validation rule was updated to allow "+" in the email address. Google allows emails with a "+".
		- [UPDATED] Simplr.Cache.* now always returns null or data for all operations.  NULL can be used to check if soemthing doesn't exist or has expired.
		- [UPDATED] Simplr.Cookie.* now always returns null or data for all operations. NULL can be used to check if soemthing doesn't exist or has expired. 
		- [UPDATED] Simplr.Layout.*, every component requires its own script template block.  You cannot nest components inside other components anymore.
		- [UPDATED] Simplr.Form.mGetValues() now trims leading/trailing whitespace for all input types except password.  The inputs are updated with the trimmed value.
		- [REMOVED] Simplr.Layout.mAddGlobalTokens() has been removed.  Use Simplr.Layout.mAddGlobalToken().
		- [REMOVED] Simplr.Layout.mAddComponents() has been removed.  Use Simplr.Layout.mAddComponent().
		- [REMOVED] Simplr.Layout.mReplaceTokens has been removed.
		- [REMOVED] Simplr.Conversion.* has been removed. Use JSON.parse() and JSON.stringify() native methods.
		- [REMOVED] Simplr.Browser.* has been removed.  The current browser / device landscape makes this outdated.
		- [REMOVED] Simplr.Ui.* has been removed.  These UI widgets arent' generally used and are better off as specialty features.
		- [REMOVED] Simplr.Core.Ui.* has been removed.  These core features aren't used, or are just duuplicates of base jQuery functionality.
		- [REMOVED] Array.Prototype.remove by John Resig was removed. Use native Array.splice method instead of this method.
		- [REMOVED] Simplr.Core.Util.mHasLocalStorage was removed.  Use your own method to check for localStorage.
		- [REMOVED] Simplr.Util.mHasLocalStorage was removed.  Use your own method to check for localStorage.
		- [REMOVED] Simplr.Core.Console.* was removed. Use Simplr.Console.* instead.
		- [REMOVED] Simplr.Core.Util.* was removed.  Use Simplr.Util.* instead.
		- [REMOVED] Simplr.Core.Validation.* was removed.  Use Simplr.Validation.* instead.
		- [REMOVED] Simplr.Form.mAddValidators was removed. Use Simplr.Validation.mAddValiators()
		- [REMOVED] Simplr.Form.mGetValidators was removed. Use Simplr.Validation.mGetValidators() 
		- [REMOVED] Simplr.Form.mAddCodes was removed. Use Simplr.Validation.mAddCodes()
		- [REMOVED] Simplr.Form.mGetCodes was removed. Use Simplr.Validation.mGetCodes()
			
	Other
		- Updated to jquery 2.1.0
		

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
*	Simplr.Console.*
	+	Simplr.Console.mToggle()
	+	Simplr.Console.mMessage()
*	Simplr.Form.*
	+	Simplr.Form.mAddLabelAssociation()
	+	Simplr.Form.mAddValidationAssociation()
	+	Simplr.Form.mGetValues()
	+	Simplr.Form.mValidateValuesAndRender()
*	Simplr.Layout.*
	+	Simplr.Layout.mAddComponent()
	+	Simplr.Layout.mAssembleLayout()
	+	Simplr.Layout.mData()
	+	Simplr.Layout.mGetComponent()
	+	Simplr.Layout.mAddGlobalToken()
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
