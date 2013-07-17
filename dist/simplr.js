// Simplr 3.0.0

(function() {

    // Internal Notification Render
    function _notifier(on, id, message) {
        $(function() {
            var messageId = "#SimplrNotify_" + id;
            if(on) {
                if($("#SimplrNotify").size() == 0) {
                    var containerHTML = '<div id="SimplrNotify" style="position: fixed; z-index: 100000; top: 0; left: 0; width: 100%; box-shadow: 0 0 5px #000; text-transform: none; font-family: Arial; text-align: center; font-size: 16px; font-weight: normal; color: #000; background: #ccc none; line-height: 1.25; padding: 0; margin: 0; border: 0;"><!-- --></div>';
                    $("body").prepend(containerHTML);
                }
                if($(messageId).size() == 0) {
                    var messageHTML =   '<p id="' + messageId.replace("#", "") + '" style="margin: 10px 0; padding: 0;">' + message + '</p>';
                    $("div#SimplrNotify").append(messageHTML);                    
                }
            } else {
                $(messageId).remove();
                if($("#SimplrNotify").is(":empty")) {
                    $("#SimplrNotify").remove();
                }
            }
        });
    }    
    
    // Base Object
    window.Simplr = {};

    (function() {
    
    function createTimeKey(key) {
        return key;
    };
    
    function createDataKey(key) {
        return key + "_data";
    };
    
    function createTimeValue(key, freshness) {
        return key + "|" + (new Date().getTime()+freshness);
    };
    
    Simplr.Cache = {
        
        mExpire : function(key) {
            localStorage.removeItem(createTimeKey(key));
            localStorage.removeItem(createDataKey(key));
            return localStorage.getItem(createDataKey(key));
        },
        
        mGet : function(options) {
            var options = $.extend({ key : "", identifier : ""}, options);
            if(options.key != "") {
                var timeData = localStorage.getItem(createTimeKey(options.key));
                if(timeData != null) {
                    var timeParts = timeData.split("|");
                    if(timeParts.length == 2) {
                        if(timeParts[0] == options.identifier) {
                            return (new Date().getTime() <= (parseInt(timeParts[1], 10))) ? localStorage.getItem(createDataKey(options.key)) : Simplr.Cache.mExpire(options.key);
                        }
                    }
                }
            }
            return null;
        },
        
        mSet : function(options) {
            var options = $.extend({ key : "", identifier : "", data : "", freshness : 600000 }, options);
            if(options.key != "") {
                localStorage.setItem(createTimeKey(options.key), createTimeValue(options.identifier, options.freshness));
                localStorage.setItem(createDataKey(options.key), options.data);
                return Simplr.Cache.mGet({ key : options.key, identifier : options.identifier });
            }
            return null;
        }
            
    };
    
})();(function() {

    var ControllerData = {
        CRUD : { 
            "view" : true, 
            "new" : true, 
            "update" : true, 
            "delete" : true 
        },
        Commands : {},
        Bases : {}
    };
    
    Simplr.Controller = {
        
        mAddBases : function(bases) {
            var collection = $.isArray(bases) ? bases : [ bases ];
            for(var i = 0, iL = collection.length; i < iL; i++) {
                ControllerData.Bases[collection[i]] = 1;
            }
        },
        
        mAddCommands : function(commands) {
            for(var name in commands) {
                var tmp = $.extend({ route : [], callback : function() {} }, commands[name]);
                var key = tmp.route.join("_");
                if( key != "" )
                { ControllerData.Commands[key] = tmp.callback; }
            }
        },
        
        mData : function() {
            return ControllerData;
        },
        
        mExecute : function(data) {
            var key = data.route.join("_");
            if($.isFunction(ControllerData.Commands[key])) {
                ControllerData.Commands[key](data); 
            }
        },
        
        mRoute : function(url) {
            var ret = { route : [], url : url, base : "", resources : {}, action : "", parameters : {} };
            
            // remove hash
            if(ret.url.charAt(0) == "#") {
                ret.url = ret.url.substring(1);
            }
            // remove bang
            if(ret.url.charAt(0) == "!") {
                ret.url = ret.url.substring(1);
            }
            
            var urlArray = ret.url.split("?");
            urlArray[0] = decodeURI(urlArray[0]);
            
            /* 1. Find the base and remove if its there */
            var tmpURL = urlArray[0];
            for(var base in ControllerData.Bases) {
                if( (urlArray[0] = urlArray[0].replace(base, "")) != tmpURL ) { 
                    ret.base = base; ret.route.push(base); break;
                }
            }
            
            /* 2. Get CRUD Operation */
            urlArray[0] = urlArray[0].split("/");
            ret.action = urlArray[0][urlArray[0].length-1];
            ret.action = ControllerData.CRUD[ret.action] ? ret.action : "view";
            
            /* 3. Get the Resources */
            var isResource = true;
            var res = "";
            for(var x = 0, xL = urlArray[0].length-1; x < xL; x++)
            {
                if(urlArray[0][x] != "")
                {
                    if( isResource )
                    { 
                        res = urlArray[0][x];
                        ret.route.push(res);
                        ret.resources[res] = ""; 
                    }
                    else
                    { ret.resources[res] = urlArray[0][x]; }
                    isResource = !isResource;
                }
            }
            
            /* 4. Get Parameters */
            if( urlArray[1] )
            { 
                var kvArr = urlArray[1].split("&");
                for(var i = 0, iL = kvArr.length; i < iL; i++) {
                    var keyValue = kvArr[i].split("=");
                    ret.parameters[keyValue[0]] = $.trim(decodeURIComponent(keyValue[1]).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'));
                }
            }
            
            ret.route.push(ret.action);
            return ret;
        },
        
        mRouteAndExecute : function(hashURLPart) {
            Simplr.Controller.mExecute(Simplr.Controller.mRoute(hashURLPart));
        }
    };
    
    $(window).on("hashchange", {}, function() {
        Simplr.Controller.mRouteAndExecute(window.location.hash);
    });
    
})();Simplr.Cookie = {
    
    mExpire : function(options) {
        return Simplr.Cookie.mSet($.extend({ name : "", expireDays : -1}, options));
    },
    
    mGet : function(options) {
        var opts = $.extend({ name : "" }, options);
        if( document.cookie.length > 0 && !Simplr.Util.mEmpty(opts.name)) {
            var r = document.cookie.match( '(^|;) ?' + opts.name + '=([^;]*)(;|$)');
            if(r) {
                return decodeURIComponent(r[2]);
            }
        }
        return null;
    },
    
    mSet : function(options) {
        var opts = $.extend({ name : "", value : "", expireDays : null, path : "/", domain : null, secure : false }, options);
        if(opts.name != "") {
            var cookieString = opts.name + "=" + encodeURIComponent(opts.value);
            if(!Simplr.Util.mEmpty(opts.expireDays)) {
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (opts.expireDays * 86400000));
                cookieString += "; expires=" + expirationDate.toUTCString();
            }
            cookieString += !Simplr.Util.mEmpty(opts.path) ? "; path=" + opts.path : "";
            cookieString += !Simplr.Util.mEmpty(opts.domain) ? "; domain=" + opts.domain : "";
            cookieString += opts.secure ? "; secure" : "";
            document.cookie = cookieString;
            return Simplr.Cookie.mGet({ name : opts.name });
        }
        return null;
    }
    
};(function() {

    var isActive = false;

    Simplr.Console = {
        mToggle : function(on) {
            isActive = (typeof window.console != "undefined") && (typeof window.console.group != "undefined") && on;
            _notifier(isActive, "Console", "!-- Console Messaging is Active --!");
        },
        mMessage : function(options) {
            if(isActive) {
                var messageData = $.extend({
                    group : "",
                    message : "",
                    data : ""
                }, options)
                
                if($.isArray(messageData.message)) {
                    console.group(messageData.group);
                    for(var i = 0, iL = messageData.message.length; i < iL; i++) {
                        Simplr.Console.mMessage(messageData.message[i]);
                    }
                    console.groupEnd();
                } else {
                    console.group(messageData.message);
                    console.log(messageData.data);
                    console.groupEnd();
                }
            }
        }
        
    };

})();(function() {
    
    function render(selector, obj) {
        var specClass = "_simplr";
        var classes = FormData.Classes;
        
        // Reset the Form
        $("."+classes.FormError + "," + "."+classes.FieldError, selector).filter("." + specClass).removeClass(classes.FormError).removeClass(classes.FieldError);
        $("."+classes.TextInformation + "," + "."+classes.TextError, selector).filter("." + specClass).remove();
        
        // Create the Messages
        for(var key in obj.codes) {
            var msgObject = obj.codes[key];
            var msgArray = [ msgObject.error, msgObject.success ];
            var html = "";
            for(var i = 0; i < 2; i++) {
                // Only showing 1 message at a time.
                if(msgArray[i].length > 0) {
                    html += '<p class="' + (( i == 0) ? classes.TextError : classes.TextInformation) + ' ' + specClass + '">' + Simplr.Validation.mGetCodeMessage(msgArray[i][0], obj.data[key].label) + '</p>';
                }
            }
            
            // Now find the Form Entry to put the message html
            $("[name='" + key + "']:first", selector).addClass(classes.FieldError + " " + specClass).closest("."+classes.FormEntry).addClass(classes.FormError + " " + specClass).append(html);
        }
    };
    
    function transformValues(values) {
        var validationAndRenderValues = {};
        for(var key in values) {
            var label = FormData.Labels[key] ? FormData.Labels[key] : FormData.DefaultLabel;
            var validationObject = { value : values[key], label : label, rules : [] };
            // Add Validators as needed
            for(var i = 0, iL = FormData.DefaultRules.length; i < iL; i++) {
                validationObject.rules.push(FormData.DefaultRules[i]);
            }
            if($.isFunction(FormData.Rules[key])) {
              FormData.Rules[key](validationObject.rules);
            }
            // Return the Transformed Data
            validationAndRenderValues[key] = validationObject;
        }
        return validationAndRenderValues;
    };
    
    var FormData = {
        Classes : {
            FormEntry : "formEntry",
            FormError : "formError",
            FieldError : "errorField",
            TextError : "errorText",
            TextInformation : "informationText"
        },
        DefaultRules : [ "notempty" ],
        DefaultLabel : "_LABEL_",
        Rules : { },
        Labels : { }
    };
    
    Simplr.Form = {
        mAddLabelAssociation : function(obj) {
            $.extend(FormData.Labels, obj);
        },
        mAddValidationAssociation : function(obj) {
            $.extend(FormData.Rules, obj);
        },
        mGetValues : function(selector) {
            var values = {};
            $("input, select, textarea", selector).each(function() {
                var thisEl = $(this);
                if(thisEl.is("[type='button']") || thisEl.is("[type='reset']") || thisEl.is("[type='submit']") || (thisEl.is("[type='radio']") && !thisEl.is(":checked"))) {
                    // Excluded 
                } else if( thisEl.is("[type='checkbox']") ) {
                    values[$(this).attr("name")] = $(this).is(":checked") ? ( $(this).val() != "on" ? $(this).val() : true ) : false;
                } else {
                    values[$(this).attr("name")] = $(this).val();
                }
            });
            return values;
        },
        mValidateValuesAndRender : function(selector, values) {
            var validationData = transformValues(values);
            var validatedData = Simplr.Validation.mValidate(validationData);
            render(selector, validatedData);
            return validatedData.valid;
        }
    };

})();(function() {
    
    function convertTokenToString(value) {
        if(typeof value == "object") {
            return Simplr.Layout.mAssembleLayout(value);
        }
        return value;
    };
    
    function replaceTokens(keys, string) {
        if(string !== undefined) {
            $.extend(keys, LayoutData.GlobalTokens);
            for(var token in keys) {
                string = string.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
            }
        }
        return unescape(string);
    };
    
    var LayoutData = {
        Components : {} ,
        GlobalTokens : {}
    };
    
    Simplr.Layout = {
        mAddComponent : function(key, component) {
            LayoutData.Components[key] = $.trim(component.replace(/\n/g,"").replace(/\s{1,}/g," "));
            return true;
        },
        mGetComponent : function(key) {
           // if not loaded, fetch it
           if(LayoutData.Components[key] === undefined) {
                var el = $("script#layout-" + key + "[type='text/x-simplr-layout-component']");
                if(el.size() == 1) {
                   Simplr.Layout.mAddComponent(key, el.text());
                }
           }
           // return what's found
           return LayoutData.Components[key];
        },
        
        mAddGlobalToken : function(token, value) {
           LayoutData.GlobalTokens[token] = value;  
        },
        
        mAssembleLayout : function(config) {
            var finalResults = "";
            if(config) {
                if(config.component && config.tokens) {
                    var tokenCollections = $.isArray(config.tokens) ? config.tokens : [ config.tokens ];
                    for(var i = 0, iL = tokenCollections.length; i < iL; i++) {
                        var tmpTokens = {};
                        for(var tKey in tokenCollections[i]) {
                            tmpTokens[tKey] = convertTokenToString(tokenCollections[i][tKey]);
                        }
                        finalResults += replaceTokens(tmpTokens, Simplr.Layout.mGetComponent(config.component));
                    }
                }
            }
            return finalResults;
        },
        
        mData : function() {
            return LayoutData;
        }
        
    };
    
})();(function() {
    var TriggerData = {
        Env : "_simplr",
        Services : {}
    };
    
    function getServiceIDs() {
        var serviceIDs = [];
        for(var id in TriggerData.Services) {
            serviceIDs.push(id);
        }
        return serviceIDs;
    };
    
    function trigger(triggerObj) {
        var triggerOptions = { services : [], data : { envID : TriggerData.Env } };
        $.extend(true, triggerOptions, triggerObj.options);
        if(Simplr.Util.mEmpty(triggerOptions.services)) { 
            triggerOptions.services = getServiceIDs(); 
        }
        
        var messages = { group : "simplr.trigger: " + TriggerData.Env + " environment", message : [] };
        for(var i = 0, iL = triggerOptions.services.length; i < iL; i++) {
            var id = triggerOptions.services[i];
            if($.isFunction(TriggerData.Services[id][triggerObj.type]) && TriggerData.Services[id].data.environmentIDs[TriggerData.Env]) { 
                messages.message.push({
                    message : "[" + id + "] " + triggerObj.type + " triggered.",
                    data : TriggerData.Services[id][triggerObj.type](triggerOptions.data)
                });
            }
        }
        
        if( messages.message.length > 0 ) {
            Simplr.Console.mMessage(messages);
        }
    }
    
    Simplr.Trigger = {
        mAddServices : function( services ) {
            for(var serviceName in services) {
                TriggerData.Services[serviceName] = $.extend({
                    data : {
                        environmentIDs : {}
                    },
                    onLoad : function() {},
                    onPage : function() {},
                    onEvent : function() {},
                    onTransaction : function() {}
                }, services[serviceName]);
            }
        },
        
        mData : function() {
            return TriggerData;
        },

        mSetEnvironment : function(env) {
            TriggerData.Env = env;
        },
        
        mOnLoad : function(options) {
            trigger({ type : "onLoad", options : $.extend({}, options) });
        },
        
        mOnPage : function(options) {
            trigger({ type : "onPage", options : $.extend({}, options) });
        },
        
        mOnEvent : function(options) {
            trigger({ type : "onEvent", options : $.extend({}, options) });
        },
        
        mOnTransaction : function(options) {
            trigger({ type : "onTransaction", options : $.extend({}, options) });
        }
    };
    
    
})();(function() {

    function equal(thing1, thing2) {
        if(typeof thing1 == typeof thing2) {
            if(typeof thing1 != "object") { // check if its a simplr type
                return thing1 == thing2;
            } else {
               if($.isArray(thing1)) {
                   if(thing1.length == thing2.length) {
                       for(var i = 0, iL = thing1.length; i < iL; i++) {
                            if(!equal(thing1[i], thing2[i])) { 
                                return false;
                            }
                        } 
                        return true;
                    }             
               } else {
                   // compare key values in each object
                   for(var key in thing1) {
                        if(!equal(thing1[key], thing2[key])) { 
                            return false;
                        }
                    }
                    // make sure have the same amount of keys
                    var l1 = 0;
                    var l2 = 0;
                    for(var key in thing1) {
                        l1++;
                    }
                    for(var key in thing2) {
                        l2++;
                    }
                    return l1 == l2;
               }
            }
        }
        return false;
    };

    Simplr.Util = {
        mEmpty : function(thing) {
            var typeOfThing = typeof thing;
            if( typeOfThing != "undefined" && thing != null ) {
                if(typeOfThing == "object") {
                    if($.isArray(thing)) {
                        return thing.length == 0;
                    }
                    return $.isEmptyObject(thing);
                }
                return $.trim(thing) == "";             
            }
            return true;
        },
        mEqual : function(things) {
            if($.isArray(things)) {
                var valid = true;
                for(var i = 0, iL = things.length; i < iL; i++) {
                    if(!equal(things[0], things[i])) {
                        valid = false;
                        i = iL;
                    }
                }
                return valid;
            }
            return true;
        },
        mGetUrlParameter : function(name) {
            var string = location.search;
            if(string != "") {
                string = string.substring(1).split("&");
                var parameters = {};
                for(var i = 0, iL = string.length; i < iL; i++) {
                    var keyValue = string[i].split("=");
                    parameters[keyValue[0]] = $.trim(decodeURIComponent(keyValue[1]).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'));
                }
                if(Simplr.Util.mEmpty(name)) {
                    return parameters;
                } else if(typeof parameters[name] != "undefined") {
                    return parameters[name];
                }
            }
            return null;
        },
        mTruncateString : function(options) {
            var opts = $.extend({ string : "", size : 5, postfix : "", smart : true }, options);
            if(opts.string.length > opts.size) {
                var truncateIndex = opts.size - opts.postfix.length - 1;
                var defaultIndex = truncateIndex+1;
                if(opts.smart) {
                    while((opts.string.charAt(truncateIndex) != " ") && (truncateIndex > 0)) {
                        truncateIndex--;
                    }
                }
                return opts.string.substring(0, (truncateIndex == 0 ? defaultIndex : (truncateIndex+1))) + opts.postfix;
            }
            return opts.string;
        }   
    };
    
})();(function() {
    
    function mergeValidationResults(key, rule, newData, existingData) {
        existingData.codes[key].success = existingData.codes[key].success.concat( newData.successCodes );
        existingData.codes[key].error = existingData.codes[key].error.concat( newData.errorCodes );
        if( !newData.valid ) { existingData.valid = false; }
    };
    
    function replaceTokens(keys, message) {
        var results = message;
        for(var token in keys) {
            results = results.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
        }
        return unescape(results);
    };
    
    var data = {
        codes : {
            eEmpty : "$[label] is empty.",
            eMissingValidator : "Missing Validator"
        },
        codeResultsTemplate : { 
            success : [], 
            error : []
        },
        defaultCodeMessage : "$[label] is UNDEFINED",
        ruleResultsTemplate : { 
            valid : true, 
            successCodes : [], 
            errorCodes : []
        },
        validators : {
            missingvalidator : function(value) { 
                return $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : false, errorCodes : [ "eMissingValidator" ] }); 
            },
            notempty : function(value) {
                var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate());
                if( typeof value != "undefined" && value != null ) {
                    if( typeof value == "string" ) { results.valid = !($.trim(value) == ""); }
                    else if( $.isArray(value) ) { results.valid = !(value.length == 0); }
                    else if( typeof value == "object" ) { results.valid = !$.isEmptyObject(value); }
                }
                if(!results.valid) { results.errorCodes.push("eEmpty"); }
                return results;
            }
        },
        validationResultsTemplate : { 
            data : "", 
            valid : true, 
            codes : {}
        }
    };
    
    Simplr.Validation = {
        mAddCodes : function(obj) {
            $.extend(data.codes, obj);
        },
        mGetCodes : function() {
            return data.codes;
        },
        mAddValidators : function(obj) {
            $.extend(data.validators, obj);
        },
        mGetValidators : function() {
            return data.validators;
        },
        mGetRuleResultsTemplate : function() {
            return $.extend(true, {}, data.ruleResultsTemplate);
        },
        mGetCodeMessage : function(code, label) {
            if( data.codes[code] != undefined ) {
                return replaceTokens({ label : label }, data.codes[code]);
            }
            return replaceTokens({ label : code }, data.defaultCodeMessage);
        },
        mValidate : function(dataObject) {
            var results = $.extend(true, {}, data.validationResultsTemplate, { data : $.extend(true, {}, dataObject)});
            for(var key in results.data) {
                // Check the Rules for this data
                var entry = results.data[key];
                results.codes[key] = $.extend(true, {}, data.codeResultsTemplate);
                for(var i = 0, iL = entry.rules.length; i < iL; i++) {
                    var rule = entry.rules[i];
                    var tmpValidationData = $.extend(true, {}, data.ruleResultsTemplate);
                    if( data.validators[rule] ) { 
                        tmpValidationData = data.validators[rule](entry.value); 
                    } else { 
                        tmpValidationData = data.validators["missingvalidator"](entry.value); 
                    }
                    mergeValidationResults(key, rule, tmpValidationData, results);
                }
                // Cleanup Data
                if( results.codes[key].error.length == 0 && results.codes[key].success.length == 0 ) { 
                    delete results.codes[key]; 
                }
            }
            return results;
        }
    };

})();/* Add Codes */
Simplr.Validation.mAddCodes({ 
    eMissingValidator : "Missing Validator",
    eAlphaNumeric : "$[label] is not alphanumeric.",
    eAmericanExpress : "$[label] is not a valid AMERICAN EXPRESS number.",
    eDinersClub : "$[label] is not a valid DINERS CLUB number.",
    eDiscover : "$[label] is not a valid DISCOVER number.",
    eEmail : "$[label] is not an email address.",
    eEqual : "$[label] does not match.",
    eMastercard : "$[label] is not a valid MASTERCARD number.",
    eEmpty : "$[label] is empty.",
    eNumber : "$[label] is not a number.",
    ePhoneNumber : "$[label] is not a valid Phone Number.",
    ePostalCode : "$[label] is not a Postal Code.",
    eVisa : "$[label] is not a valid VISA number."
});

/* Add Validators */
Simplr.Validation.mAddValidators({
    /* Missing Validator */
    missingvalidator : function(value) { 
        return $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : false, errorCodes : [ "eMissingValidator" ] }); 
    },
    
    alphanumeric : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^\w*$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eAlphaNumeric"); }
        return results;
    },
    americanexpress : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^3(4|7)\d{2}-?\d{6}-?\d{5}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eAmericanExpress"); }
        return results;
    },
    dinersclub : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^3[0,6,8]\d{12}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eDinersClub"); }
        return results;
    },
    discover : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^6011-?\d{4}-?\d{4}-?\d{4}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eDiscover"); }
        return results;
    },
    email : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eEmail"); }
        return results;
    },
    equal : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate());
        if( $.isArray(value) ) { 
            for(var i = 0, iL = value.length; i < iL; i++) {
                if(!Simplr.Util.mEqual([value[0], value[i]])) {
                    results.valid = false; 
                    i = iL;
                }
            }
        }
        if( !results.valid ) { results.errorCodes.push("eEqual"); }
        return results;
    },
    mastercard : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eMastercard"); }
        return results;
    },
    notempty : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate());
        if( typeof value != "undefined" && value != null ) {
            if( typeof value == "string" ) { results.valid = !($.trim(value) == ""); }
            else if( $.isArray(value) ) { results.valid = !(value.length == 0); }
            else if( typeof value == "object" ) { results.valid = !$.isEmptyObject(value); }
        }
        if(!results.valid) { results.errorCodes.push("eEmpty"); }
        return results;
    },
    number : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : ( !isNaN(parseFloat(value)) && isFinite(value) ) });
        if( !results.valid ) { results.errorCodes.push("eNumber"); }
        return results;
    },
    phonenumber : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^\d{10}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("ePhoneNumber"); }
        return results;
    },
    postalcode : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^\d{5}([\-]?\d{4})?$/.test(value) });
        if( !results.valid ) { 
            results.errorCodes.push("ePostalCode") 
        }
        return results; 
    },
    visa : function(value) {
        var results = $.extend(true, {}, Simplr.Validation.mGetRuleResultsTemplate(), { valid : /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/.test(value) });
        if( !results.valid ) { results.errorCodes.push("eVisa"); }
        return results;
    }
});(function() {
    
    var ViewData = {
        Views : {}
    };
    
    Simplr.View = {
        mAddViews : function(obj) {
            for(var key in obj) {
                var newView = $.extend(true, {}, { 
                    html : function(data) { return ""; }, 
                    callback : function(selector, data) {} 
                }, obj[key]);
                ViewData.Views[key] = newView;
            }
        },
        
        mData : function() {
            return ViewData;
        },
        
        mRender : function(options) {
            var tmp = $.extend({ name : "", data: "", selector : ""}, options);
            $(tmp.selector).html(ViewData.Views[tmp.name].html(tmp.data));
            ViewData.Views[tmp.name].callback(tmp.selector, tmp.data);
        }
    };
    
})();
})();