	
<?php

	function db_connect(){
		// $db = mysql_connect("localhost","root","");

		if (!$db){
		  die('Could not connect: ' . mysql_error());
		}

		// mysql_select_db("chat", $db);
		mysql_select_db("qdm213069221_db", $db);
 		mysql_query('SET NAMES UTF8');
		return $db;
	}

	
	function db_close($db){
		mysql_close($db);
	}


	
?>
