<?php 
header('Content-Type:application/json');
require_once('dbconnect.php');
$db = db_connect();

$pageSize = 10;

if(isset($_GET["pageSize"])){
	$GLOBALS['pageSize'] = $_GET["pageSize"];
}


// $sql = "SELECT *, date_format(chatdate,'%d-%m-%Y %r') 
// as cdt from chat order by ID desc limit 200";

// $sql = "SELECT * FROM (" . $sql . ") as ch order by ID";

// $result = mysql_query($sql) or die('Query failed: ' . mysql_error());
// 
$sql = "SELECT * FROM `chat` LIMIT 0,".$pageSize;


$result = mysql_query($sql);

// $row = mysql_fetch_array($result);

$resultArray = array();

while($row = mysql_fetch_array($result)) {

	$arr = array('id' => $row["id"], 'username' => $row["username"],'chatdate' => $row["chatdate"],'msg' => $row["msg"]);

	array_push($resultArray,$arr);

}

 // print_r($resultArray);
	echo (json_encode($resultArray));

?>