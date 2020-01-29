<?php 
$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => "https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix_des_carburants_j_7&rows=8000&start=0&sort=update&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand",
CURLOPT_RETURNTRANSFER => true,
CURLOPT_TIMEOUT => 30,
CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
CURLOPT_CUSTOMREQUEST => "GET",
CURLOPT_HTTPHEADER => array(
"cache-control: no-cache"
),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

echo json_encode($response);