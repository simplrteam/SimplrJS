<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $page_template["title"] ?></title>
	   	
	   	<?php //Template Includes ?>
	   	<link rel="stylesheet" type="text/css" href="includes/qunit.css" />
		<style type="text/css">
			body { padding: 10px 0 0 0; margin: 0; }
			#pageContent { width: 800px; margin: 0 auto; }
			.none { display: none; }
		</style>		
		
		<script type="text/javascript" src="includes/jquery.min.js"></script>
		<script type="text/javascript" src="includes/qunit.js"></script>
		<script type="text/javascript" src="../src/simplr-dev.php"></script>
		
		<?php include($page_template["head_file"]); ?>
	</head>

	<body>
    	<div id="pageContent">
    		<h1 id="qunit-header"><?php echo $page_template["title"] ?></h1>  
			<h2 id="qunit-banner"><!--  --></h2>  
			<h2 id="qunit-userAgent"><!--  --></h2>  
			<ol id="qunit-tests"><!--  --></ol>  
		</div>
	</body>

</html>