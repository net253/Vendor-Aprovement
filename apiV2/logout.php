<?php
require_once("./libs/dbconfig.php");

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

session_start();

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $action = "logout";
    $note = "-";
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

    if ($result->rowCount() > 0) {
        session_destroy();
        unset($_SESSION['username']);
        unset($_SESSION['timeout']);
        echo json_encode(["message" => "Logout Successfully", "state" => true]);
        setcookie('username', '', time() - 1000);
    } else {
        echo json_encode(["message" => "There is a problem with the database", "state" => false]);
    }
    $result->closeCursor();
}
