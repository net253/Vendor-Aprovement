<?php
Header('Access-Control-Allow-Origin: *');
Header('Access-Control-Allow-Headers: *');
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set('Asia/Bangkok');

$hostname = "rct-dev.com";
$database  = "vrs";
$dbusername = "rctdev_vrs";
$dbpassword = "Snc@2022";
