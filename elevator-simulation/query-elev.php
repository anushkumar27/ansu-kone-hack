<?php
	// This php is to insert data to DB

	//Include database connection details
	require_once('connect.php');
	//Sanitize the POST values
	//$query = $_POST['q'];
	//echo $query;
	$query = "SELECT * FROM `readings` WHERE e_id = '" . $_GET['eid'] . "' order by timestamp desc";
	$rows = array();
	$a=mysqli_query($bd,$query);
	//Output data of each row
	while ($r = mysqli_fetch_assoc($a)) {
		//print_r($row);
		//echo "$\n".json_encode($row);
		$rows[] = $r;
	}
	print json_encode($rows);
	exit();
 ?>
