<?php
require_once("./libs/dbconfig.php");

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson);

session_start();

if ($requestMethod == "POST") {
    if (!empty($data)) {
        $username = $data->username;
        $password = $data->password;

        if (empty($username) || empty($password)) {
            echo json_encode(["message" => "Username & Password is required", "state" => false]);
        } else {
            $hashPass = md5($password);

            $sql = "SELECT * FROM t_accounts WHERE username = :username AND password = :hashPass ;";
            $result = $conn->prepare($sql);
            $result->execute(array(':username' => $username, ':hashPass' => $hashPass));

            if ($result->rowCount() == 1) {
                $user = $result->fetchObject();
                $result->closeCursor();

                $name = $user->name;
                $email = $user->email;
                $position = $user->position;

                $action = "login";
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
                    $cookieOptions = array(
                        'domain' => ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false,
                        'secure' => false,
                        'expires' => time() + (60 * 60),
                        'path' => '/'
                    );

                    setcookie('username', $username, $cookieOptions);

                    $_SESSION['username'] = $username;
                    $_SESSION['name'] = $name;
                    $_SESSION['position'] = $position;
                    $_SESSION['email'] = $email;
                    $_SESSION['timeout'] = time() + 1800;

                    echo json_encode(["message" => "login successfully.", "state" => true, "position" => $position, "host" => $_SERVER['HTTP_HOST']]);
                } else {
                    echo json_encode(["message" => "There is a problem with the database", "state" => false]);
                }
            } else {
                session_destroy();
                unset($_SESSION['username']);
                unset($_SESSION['timeout']);

                setcookie('username', '', time() - 1000);

                echo json_encode(["message" => "login failed.", "state" => false]);
            }
        }
    } else {
        echo json_encode(["message" => "username & password is required", "state" => false]);
    }
}
