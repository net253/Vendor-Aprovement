<?php 
    // require_once('./libs/dbconfig.php');
    // $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
        
    // return function (){
    //     global $conn;  
    //     $now = new DateTime();
    //     $year = substr(strval(intval($now -> format('Y')) + 543), 2);
    //     $month = $now -> format('m');
    //     $number = $year . $month;

    //     $sql = "SELECT COUNT(DISTINCT number) AS number 
    //             FROM t_vendor 
    //             WHERE number BETWEEN '$number" . "000' AND '" . $number . "999' ;";
    //     $result = $conn -> query($sql);
    //     $totalNumber = $result -> fetchObject() -> number + 1;
    //     $result -> closeCursor();

    //     return $number . ($totalNumber > 99 ? $totalNumber : ($totalNumber > 9 ? "0" . $totalNumber : "00" . $totalNumber));
        
    // }

    return function () {
        global $conn;
        $now = new DateTime();
        $year = substr(strval(intval($now->format('Y')) + 543), 2);
        $month = $now->format('m');
        $number = $year . $month;
        $numStart = $number . "000";
        $numEnd = $number . "999";
    
        $sql = "SELECT number FROM t_vendor WHERE number BETWEEN '$numStart' AND '$numEnd' ORDER BY number DESC LIMIT 1 ;";
        $result = $conn->query($sql);
    
        if ($result->rowCount() > 0) {
            return (int)($result->fetchObject()->number) + 1;
        } else {
            return (int)$numStart + 1;
        }
    };
