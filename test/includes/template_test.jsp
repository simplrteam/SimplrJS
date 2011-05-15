<%@ include file="/includes/include_jstl.jsp" %>
<%@ taglib uri='http://dpz.estore.com/jsp/taglib/template' prefix='template' %>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope="application" />

<!DOCTYPE html>
<html>
	<head>
		<title><template:get name='title' /></title>
	   	
	   	<%-- Template js/css --%>
	   	<link rel="stylesheet" type="text/css" href="${ctx}/localization/global/css/screen.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/tests/includes/qunit.css" />
		<script type="text/javascript" src="${ctx}/code/frameworks/jQuery/jquery.js"></script>
		<script type="text/javascript" src="${ctx}/tests/includes/qunit.js"></script>

		<%-- Page Specifi js/css --%>
		<template:get name='scripts-styles' />
	
	</head>

	<body>
    	
    	<div id="pageFrame">
    		<div id="pageHeader"><c:import url="/layouts/headers/header_generic.jsp" /></div>
    		<div id="pageContent">
	    		<h1 id="qunit-header"><template:get name='title' /></h1>  
				<h2 id="qunit-banner"><!--  --></h2>  
				<h2 id="qunit-userAgent"><!--  --></h2>  
				<ol id="qunit-tests"><!--  --></ol>  
			</div>
			<div id="js-testHTML"><!--  --></div>
		</div>
    	
	</body>

</html>