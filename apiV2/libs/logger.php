<?php
return function ($action, $note = "-") {
    global $conn;
    $username = $_SESSION["username"];
    $now = (new DateTime())->format('Y-m-d H:i:s');

    $sqlLog = "INSERT INTO t_carbon_logger (USERNAME, ACTION, NOTE, DATE_TIME) VALUES ( :username, :action, :note, :now ) ;";
    $result = $conn->prepare($sqlLog);
    $result->execute(array(
        ":username" => $username,
        ":action" => $action,
        ":note" => $note,
        ":now" => $now
    ));
    $result->closeCursor();
};
