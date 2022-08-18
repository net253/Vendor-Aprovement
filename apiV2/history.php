<?php 
    require_once("./libs/dbconfig.php");

    $conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data = json_decode($dataJson);

    session_start();

    if($requestMethod == "POST"){
        // if(!empty($data) && ($_SESSION['timeout'] > time()) ){
        if(!empty($data) ){
            $number = $data -> number;

            $sql = "SELECT * FROM v_history WHERE note = '$number' ;";
            $querySql = $conn -> query($sql);
            $results = array();
            while($row = $querySql-> fetchObject()){
                $results[] = $row;
            }

            if(count($results) < 6){
                $results = [$results[0],
                ["username"=>"-", "name"=>"-", "action"=>"-", "note"=>"-", "datetime"=>"-"],
                $results[1],
                $results[2],
                $results[3],
                $results[4],
            ];
            }

            echo json_encode(["results" => $results, "state" => true]);
            $querySql -> closeCursor();
        }else{
            echo json_encode(["message" => "Session Timeout", "state" => false]);
        }
    }
