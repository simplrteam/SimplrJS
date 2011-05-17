<?php 
	include("../../config.php"); 
	$useDistVersion = false;
	$simplr_file = $useDistVersion ? "/dist/simplr.min.js" : "/src/simplr-dev.php";
?>

<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $page_template["title"] ?></title>
	   	
	   	<?php //Template Includes ?>
	   	<link rel="stylesheet" type="text/css" href="<?php echo $ctx ?>/test/includes/qunit.css" />
		<style type="text/css">
			#pageContent { width: 800px; margin: 0 auto; }
		</style>		
		
		<script type="text/javascript" src="<?php echo $ctx ?>/dist/jquery.min.js"></script>
		<script type="text/javascript" src="<?php echo "$ctx$simplr_file" ?>"></script>
		<script type="text/javascript" src="<?php echo $ctx ?>/test/includes/qunit.js"></script>

		<?php include($page_template["head_file"]); ?>
	</head>

	<body>
    	<div id="pageContent">
    		<h1 id="qunit-header"><?php echo $page_template["title"] ?></h1>  
			<h2 id="qunit-banner"><!--  --></h2>  
			<h2 id="qunit-userAgent"><!--  --></h2>  
			<ol id="qunit-tests"><!--  --></ol>  
		</div>
		<div id="js-testHTML"><!--  --></div>
	</body>

</html>