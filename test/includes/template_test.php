<?php include("../../config.php"); ?>

<!DOCTYPE html>
<html>
	<head>
		<title>testing</title>
	   	
	   	<?php //Template Includes ?>
	   	<link rel="stylesheet" type="text/css" href="<?php echo $ctx ?>/test/includes/qunit.css" />
		<style type="text/css">
			#pageContent { width: 800px; margin: 0 auto; }
		</style>		
		
		<script type="text/javascript" src="<?php echo $ctx ?>/dist/jquery.min.js"></script>
		<script type="text/javascript" src="<?php echo $ctx ?>/src/simplr-dev.php"></script>
		<script type="text/javascript" src="<?php echo $ctx ?>/test/includes/qunit.js"></script>

		<?php //DocumentHead_TEXT ?>
	</head>

	<body>
    	<div id="pageContent">
    		<h1 id="qunit-header">HEADER</h1>  
			<h2 id="qunit-banner"><!--  --></h2>  
			<h2 id="qunit-userAgent"><!--  --></h2>  
			<ol id="qunit-tests"><!--  --></ol>  
		</div>
		<div id="js-testHTML"><!--  --></div>
	</body>

</html>