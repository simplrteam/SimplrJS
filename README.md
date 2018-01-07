# Disclaimer
This repository is left here for historical reasons only. It is in read-only mode and no further development will be done.
If you need anything, try contacting authors of the code.

&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;

[ v4.0.3 ] SimplrJS   
=============

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

Just include the simplr.min.js file on your page and you are ready to go.  

Supports Modern browsers.

Change Log
------------

v4.0.3
	
	Features:
		- NONE
		
	Bug Fixes:
		- Fixed bug in default email validator.  Loosend up basic rules for increated compatibility.  Now using /.+@.+/ regex.
	
	Refactor:
		- NONE
		
	Other:
		- NONE

v4.0.2
	
	Features:
		- NONE
		
	Bug Fixes:
		- Fixed bug in default validators. See: https://github.com/simplrteam/SimplrJS/pull/4 Credit to: @zachwick
	
	Refactor:
		- NONE
		
	Other:
		- NONE

v4.0.1
	
	Features:
		- NONE
		
	Bug Fixes:
		- Fixed bug in simplr.form.validate causing the form error class to be added to the wrong element.
	
	Refactor:
		- NONE
		
	Other:
		- NONE

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

Usage
-----

[Documentation / Samples here](https://github.com/simplrteam/SimplrJS/tree/master/samples/)

[Download the distribution version here](https://github.com/simplrteam/SimplrJS/tree/master/dist/simplr.min.js)
