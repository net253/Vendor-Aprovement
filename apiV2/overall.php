<?php
require_once('./libs/dbconfig.php');

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data =  json_decode($dataJson);

if ($requestMethod == "POST") {
    // if(!empty($data) && ($_SESSION['timeout'] > time())){
    if (!empty($data)) {
        $name = $_SESSION["name"];
        $position = $_SESSION["position"];

        $filter = $data->filter;
        $sql = $position === "scm" ? "SELECT * FROM v_overall " : "SELECT * FROM v_overall WHERE nextApprover = '$name' OR approved LIKE '%$name%' ";
        if ($filter) {
            $sql .= $position === "scm" ? "WHERE status = '$filter' " : "AND status = '$filter' ";
        }
        $sql .= ";";
        $results = $conn->query($sql);

        if ($results) {
            $overall = array();
            while ($row = $results->fetchObject()) {
                $overall[] = $row;
            }
            echo json_encode(["results" => $overall, "state" => true], JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(["message" => "error", "state" => false]);
        }
        $results->closeCursor();
    } else {
        $username = $_SESSION['username'];
        $username = '-';
        $action = "logout";
        $note = "Timeout";
        $datetime = (new DateTime())->format('Y-m-d H:i:s');

        $historySql = "INSERT INTO t_history (username, action, note, datetime) 
                            VALUES (:username, :action, :note, :datetime) ;";

        $result = $conn->prepare($historySql);
        $result->execute(array(
            ":username" => $username,
            ":action" => $action,
            ":note" => $note,
            ":datetime" => $datetime
        ));

        session_destroy();
        unset($_SESSION['username']);
        unset($_SESSION['timeout']);
        setcookie('username', '', time() - 1000);

        echo json_encode(["message" => "Session Timeout", "state" => false]);
    }
}
