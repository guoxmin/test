<?php 
	header('Content-Type:application/json');
	header("content-type:text/html;charset=utf-8"); 


	$params =  isset($_POST["username"]) && isset($_POST["msg"]);

	$code = 0;

	if($params){

		require_once('dbconnect.php');

		$db = db_connect();

		if(!$db){
			$GLOBALS["code"] = 2;
			return;
		}

		$msg = $_POST["msg"];
		$dt = date("Y-m-d H:i:s");
		$username = $_POST["username"];

		$sql = "INSERT INTO chat (username, chatdate, msg) VALUES ('".$username."', '".$dt."', '".$msg."')";

		
		$result = mysql_query($sql);



		db_close($db);
		
		if(!$result){
			$GLOBALS["code"] = 3;
		}

	}else{
		$GLOBALS["code"] = 1;
	}


	
	$raw_success = array('code' => 0, 'msg' => '提交成功!');
	$raw_fail1 = array('code' => 1, 'msg' => '参数不正确!');
	$raw_fail2 = array('code' => 2, 'msg' => '数据库连接失败!');
	$raw_fail3 = array('code' => 3, 'msg' => '数据库执行失败!');
	$raw_fail4 = array('code' => 4, 'msg' => '未知错误!');
	
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
		default:
			echo json_encode($raw_fail4);
	}
	


 ?>