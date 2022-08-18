<?php
require('./libs/dbconfig.php');

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson);

session_start();

if ($requestMethod == "POST") {
    if (!empty($data) && ($_SESSION['timeout'] > time())) {
        $username = $_SESSION['username'];
        $oldPassword = $data->oldPassword;
        $newPassWord = $data->newPassword;
        $action = "Change Password";
        $note = "-";
        $datetime = (new DateTime())->format('Y-m-d H:i:s');

        $oldHash = md5($oldPassword);
        $newHash = md5($newPassWord);

        $chkSql = "SELECT * FROM t_accounts WHERE username = :username AND password = :oldHash ;";
        $chkResult = $conn->prepare($chkSql);
        $chkResult->execute(array(
            ":username" => $username,
            ":oldHash" => $oldHash
        ));

        if ($chkResult->rowCount() > 0) {
            $chkResult->closeCursor();
            $updatePass = "UPDATE t_accounts SET password = :newHash WHERE username = :username ;";
            $historySql = " INSERT INTO t_history (username, action, note, datetime)
                                    VALUES (:username, :action, :note, :datetime) ;";
            $updateResult = $conn->prepare($updatePass . $historySql);
            $updateResult->execute(array(
                ":username" => $username,
                ":newHash" => $newHash,
                ":action" => $action,
                ":note" => $note,
                ":datetime" => $datetime
            ));

            if ($updateResult->rowCount() > 0) {
                echo json_encode(["message" => "Update Successfully", "state" => true]);
            } else {
                echo json_encode(["message" => "There is a problem with the database", "state" => false]);
            }
            $updateResult->closeCursor();
        } else {
            echo json_encode(["message" => "The original password was invalid", "state" => false]);
        }
    } else {
        $username = $_SESSION['username'];
        $action = "logout";
        $note = "Timeout";

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
