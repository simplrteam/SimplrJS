<?php 
	$useDistVersion = false;
	$simplr_file = $useDistVersion ? "/dist/simplr.min.js" : "/src/simplr-dev.php";
?>

<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $page_template["title"] ?></title>
	   	
	   	<?php //Template Includes ?>
	   	<link rel="stylesheet" type="text/css" href="../includes/qunit.css" />
		<style type="text/css">
			body { padding: 10px 0 0 0; margin: 0; }
			#pageContent { width: 800px; margin: 0 auto; }
			.none { display: none; }
		</style>		
		
		<script type="text/javascript" src="../../dist/jquery.min.js"></script>
		<script type="text/javascript" src="../../<?php echo "$simplr_file" ?>"></script>
		<script type="text/javascript" src="../includes/qunit.js"></script>

		<?php include($page_template["head_file"]); ?>
	</head>

	<body>
    	<div id="pageContent">
    		<h1 id="qunit-header"><?php echo $page_template["title"] ?></h1>  
			<h2 id="qunit-banner"><!--  --></h2>  
			<h2 id="qunit-userAgent"><!--  --></h2>  
			<ol id="qunit-tests"><!--  --></ol>  
		</div>
		<div id="js-testHTML"><!--  -->
		    
		    <!-- Templates inside script tags -->
		    <!--
		    <script id="layout-test2" type="text/x-simplr-layout-component">
                <div id="test2">test2</div>
            </script>
            <script id="layout-test3" type="text/x-simplr-layout-component">
                <div id="test3">test3</div>
            </script>
            <script id="layout-nested" type="text/x-simplr-layout-component">
                <div id="nested"><span>nested</span></div>
            </script>
            <script id="layout-nested2" type="text/x-simplr-layout-component">
                <div id="nested2"><a href="http://www.google.com/#/test/test/">this is a link</a></div>
            </script>
            -->
        
		    <!--
		    <div id="layout-test1" class="layout-component">
    		    <div id="myTest1">
                    <h1>Test Test Test</h1>
                    <p>this is a paragraph</p>
                    <div>test div</div>
                </div>
            </div>
		    -->
		    
		</div>
	</body>

</html>