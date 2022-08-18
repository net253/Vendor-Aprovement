<?php
require_once('./libs/dbconfig.php');
$chkAuth = require('./libs/chk-auth.php');

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "GET") {
    if ($chkAuth()->state) {
        try {
            $sql = "SELECT name, position FROM t_accounts ;";
            $result = $conn->query($sql);
            $usersList = array();
            while ($row = $result->fetchObject()) $usersList[] = $row;
            echo json_encode(["state" => true, "results" => $usersList]);
        } catch (PDOException $e) {
            echo json_encode(["state" => false, "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout"]);
    }
}
