<?php
	require_once('connect.php');
	
	$sql = "insert into `feedback`(`reason`) values(" . $_GET['reason'] . ");";
	
	//echo $sql;

	if ($bd->query($sql) === TRUE) {
		echo "Done";
	}
	exit();
 ?>
