<?php 
    require_once('./libs/dbconfig.php');
    $sendMail = require('./libs/sendmail.php');
    $setMsgScmRst = require('./libs/Setmessage/scm-reset.php');

    $conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

    $requestMethod = $_SERVER["REQUEST_METHOD"];
    $dataJson = file_get_contents("php://input");
    $data =  json_decode($dataJson);

    if($requestMethod == "POST"){
        if(!empty($data)){
            $email = $data -> email;
            $chkSql = "SELECT * FROM t_accounts WHERE email=:email ;";
            $chkResult = $conn -> prepare($chkSql);
            $chkResult -> execute(array(":email" => $email));

            if($chkResult -> rowCount() > 0){
                $account = $chkResult -> fetchObject();
                $chkResult -> closeCursor();

                $username = $account -> username;
                $name = $account -> name;
                $action = "Reset Password";
                $note = "-";
                $datetime = (new DateTime()) -> format('Y-m-d H:i:s');

                $password = substr(uniqid(), 5);
                $hashPassWord = md5($password);

                $sendResult = $sendMail($email, "SNC VRS (password reset request)", $setMsgScmRst($name, $username, $password));

                if($sendResult){
                    $updateSql = "UPDATE t_accounts SET password = :hashPassWord, datetime = :datetime WHERE email = :email ;";
                    $historySql = " INSERT INTO t_history (username, action, note, datetime)
                                    VALUES (:username, :action, :note, :datetime) ;";
                    $updateResult = $conn -> prepare($updateSql . $historySql);
                    $updateResult -> execute(array(
                        ":hashPassWord" => $hashPassWord,
                        ":email" => $email,
                        ":datetime" => $datetime,
                        ":username" => $username,
                        ":action" => $action,
                        ":note" => $note,
                        ":datetime" => $datetime
                    ));
                    if($updateResult -> rowCount() > 0){
                        echo json_encode(["message" => "Reset Password Successfully", "state" => true]);
                    }else{
                        echo json_encode(["message" => "There is a problem with the database", "state" => false]);
                    }
                    $updateResult -> closeCursor();
                    
                }else{
                    echo json_encode(["message" => "Failed to send email", "state" => false]);
                }
            }else{
                echo json_encode(["message" => "Email not found", "state" => false]);
            }
        }
    }
