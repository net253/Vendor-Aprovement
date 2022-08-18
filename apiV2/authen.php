<?php
require_once("./libs/dbconfig.php");

session_start();

if (isset($_SESSION['username']) && isset($_SESSION['timeout'])) {
    if ($_SESSION['timeout'] > time()) {
        echo json_encode(["message" => $_SESSION['username'], "position" => $_SESSION['position'], "state" => true]);
    } else {
        $username = $_SESSION['username'];
        $action = "logout";
        $note = "timeout";
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

        echo json_encode(["message" => "session timeout.", "state" => false]);

        $result->closeCursor();
    }
} else {
    echo json_encode(["message" => "session timeout.", "state" => false]);
}
