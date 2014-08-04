[ v4.0.0 ] IN-PROGESS SimplrJS
=============

IMPORTANT VERSION IS A WORK IN-PROGRESS.  PLEASE SEE BRANCHES FOR PREVIOUS VERSIONS.

Description
-----------

SimplrJS is a JavaScript library to simplify the creation of simple, flexable, one-page dynamic websites through the use of:

- resource driven url design patterns
- view based rendering
- html templates
- form design and validation by pattern
- simple caching using localStorage

Installation and Requirments
-----------

jQuery is required for underlying javascript support.
SimplrJS uses jQuery, but is not written as a plugin.

Change Log
------------

v4.0.0

	Features:
		- New release. See functionality.
		
	Bug Fixes:
		- NONE, new release.
		
	Refactor:
		- NONE, new release.
			
	Other
		- Updated to jquery 2.1.0
		

Functionality
---------------
*	simplr.cache.*
	+	simplr.cache.expire()
	+	simplr.cache.get()
	+	simplr.cache.set()
*	simplr.view.*
	+	simplr.view.add()
	+	simplr.view.render()





*	Simplr.Controller.*
	+	Simplr.Controller.mAddBases()
	+	Simplr.Controller.mAddCommands()
	+	Simplr.Controller.mData()
	+	Simplr.Controller.mExecute()
	+	Simplr.Controller.mRoute()
	+	Simplr.Controller.mRouteAndExecute()


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


Usage
-----
see [SimplrJS Documentation](http://simplrjs.com/docs/)
