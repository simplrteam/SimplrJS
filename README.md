[ v4.0.0 ] IN-PROGESS SimplrJS
=============

IMPORTANT VERSION IS A WORK IN-PROGRESS.  PLEASE SEE BRANCHES FOR PREVIOUS VERSIONS.

Description
-----------

SimplrJS is a JavaScript library to simplify the creation of simple, flexable, one-page dynamic websites through the use of:

- simple caching using localStorage
- view based rendering
- resource driven url design for commands
- html templates

- form design and validation by pattern


Installation and Requirments
-----------

jQuery is required for underlying javascript support.
SimplrJS uses jQuery, but is not written as a plugin.

Change Log
------------

v4.0.0

	Features:
		- New release. See functionality.
		- NOT COMPATABLE WITH PREVIOUS VERSIONS
		
	Bug Fixes:
		- NONE, new release.
		
	Refactor:
		- NONE, new release.
			
	Other
		- NONE, new release.
		

Functionality
---------------
*	simplr.cache.*
	+	simplr.cache.expire()
	+	simplr.cache.get()
	+	simplr.cache.set()
*	simplr.view.*
	+	simplr.view.add()
	+	simplr.view.render()
*	simplr.command.*
	+	simplr.command.add()
	+	simplr.command.execute()
*	simplr.template.*
	+	simplr.template.build()
*	simplr.form.*
	+	simplr.form.addCode()
	+	simplr.form.addValidation()
	+	simplr.form.addLabelAssociation()
	+	simplr.form.addValidationAssociation()
	+	simplr.form.getValues()
	+	simplr.form.validate()
	
	
	+	Simplr.Form.mAddLabelAssociation()
	+	Simplr.Form.mAddValidationAssociation()
	+	Simplr.Form.mGetValues()
	+	Simplr.Form.mValidateValuesAndRender()



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

Find version 3.0.0 on the 3.0.0 Branch.
For version 3.0.0 see [Documentation for 3.0.0](https://github.com/simplrteam/SimplrJS/tree/master/archive/samples)

For version 4.0.0, in-progress.