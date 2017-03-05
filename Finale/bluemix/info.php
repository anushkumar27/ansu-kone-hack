<?php

$BUILDING_ID = $_GET['bid'];
$destFloor = $_GET['df'];
$srcFloor = $_GET['sf'];
$final = "{\"template\":{\"data\":[{\"name\":\"sourceAreaId\",\"value\":\"area:".$BUILDING_ID.":".$srcFloor."\"}, {\"name\":\"destinationAreaId\",\"value\":\"area:".$BUILDING_ID.":".$destFloor."\"} ]}}";

echo $final;

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.kone.com/api/building/".$BUILDING_ID."/call",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $final,
  CURLOPT_HTTPHEADER => array(
    "accept: application/vnd.collection+json",
    "content-type: application/vnd.collection+json",
    "x-ibm-client-id: 75f194db-2ab8-4982-abdb-e2b9b178b12b",
    "x-ibm-client-secret: fI0iB4aP7vK7lP0pO1cB3iU3tL0lN3fQ8eV4cE6gD0tA3cQ8kL"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}