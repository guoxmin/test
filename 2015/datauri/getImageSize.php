
 <?php 


	$reg = "/data\:image\/([a-z]*);base64/i";

	$base64 = $_POST["base64"];

	$img = base64_decode($base64);
	
	preg_match($reg,$base64,$result); 
	
	$type = str_replace("jpeg","jpg",$result[1]);


	$file =  time().rand(0, 1000).".".$type;

	// echo "$file";

	file_put_contents($file, $img);

	$size  = filesize($file)/1024;

	$id = $_POST['id'];

	echo '{"id":"'.$id.'","size":"'.$size.'"}';

	unlink($file);


 ?>

