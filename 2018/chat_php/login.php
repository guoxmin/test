<?php 
	header('Content-Type:application/json');
	header("content-type:text/html;charset=utf-8"); 


	$code = 0;

	$params =  isset($_POST["username"]);



	if($params){

		require_once('dbconnect.php');

		$db = db_connect();

		if(!$db){
			$GLOBALS["code"] = 3;
			return;
		}

		
		$username = $_POST["username"];

		$sql = "SELECT id,username  FROM `chat` WHERE `username` LIKE '".$username."'";

		
		$result = mysql_query($sql);

		if(!$result){
			$GLOBALS["code"] = 5;
		}


		$resultArray = null;

		while($row = mysql_fetch_array($result)) {

			$resultArray = array('id' => $row["id"], 'username' => $row["username"]);

			// array_push($resultArray,$arr);
		}

		if($resultArray){
			$GLOBALS["code"] = 1;
		}
		
		
		db_close($db);

	}else{
		$GLOBALS["code"] = 2;
	}


	
	$raw_success = array('code' => 0, 'msg' => '未占用');
	$raw_fail1 = array('code' => 1, 'msg' => '已占用');
	$raw_fail2 = array('code' => 2, 'msg' => '参数不正确!');
	$raw_fail3 = array('code' => 3, 'msg' => '数据库连接失败!');
	$raw_fail4 = array('code' => 4, 'msg' => '数据库执行失败!');
	$raw_fail5 = array('code' => 5, 'msg' => '未知错误!');
	
	$res_success = json_encode($raw_success);
	$res_fail = json_encode($raw_fail);
	
	
	switch($code){
		case 0:
			echo json_encode($raw_success);
			break;
		case 1:
			echo json_encode($raw_fail1);
			break;
		case 2:
			echo json_encode($raw_fail2);
			break;
		case 3:
			echo json_encode($raw_fail3);
			break;
		case 4:
			echo json_encode($raw_fail4);
			break;
		default:
			echo json_encode($raw_fail4);
	}
	


 ?>