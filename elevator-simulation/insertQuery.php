<?php
	require_once('connect.php');
	
	$sql = "INSERT INTO`readings`(`e_id`, `curr_floor`, `dest_floor`, `num_people`, `weight`, `rem_stops`) VALUES ('".$_GET['e_id']."','".$_GET['curr_floor']."','".$_GET['dest_floor']."','".$_GET['num_people']."', '" . $_GET['weight'] . "','" . $_GET['rem_stops'] . "')";
	
	//echo $sql;

	if ($bd->query($sql) === TRUE) {
		echo "<script> alert('Job Successfully Added.');";
		echo "window.location = 'index.html' </script>";
	} 
	exit();
 ?>
