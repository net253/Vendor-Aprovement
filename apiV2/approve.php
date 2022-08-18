<?php
require_once('./libs/dbconfig.php');
$chkAuth = require('./libs/chk-auth.php');
$sendMail = require('./libs/sendmail.php');
$setMsgVendorApv = require('./libs/Setmessage/vendor-approved.php');
$setMsgScmApv = require('./libs/Setmessage/scm-approved.php');
$setMsgScmPending = require('./libs/Setmessage/scm-pending.php');

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson);

if ($requestMethod === "POST") {
    if (!empty($data) && $chkAuth()->state) {
        $username = $_SESSION['username'];
        $name = $_SESSION['name'];
        $position = $_SESSION["position"];
        $number = $data->number;

        $status = $data->status;
        $action = $status;
        $note = $number;
        $datetime = (new DateTime())->format('Y-m-d H:i:s');

        $historySql = " INSERT INTO t_history (username, action, note, datetime)
                        VALUES (:username, :action, :note, :datetime) ;";

        function fetchEmail($fName)
        {
            global $conn;
            $sqlChk = "SELECT name, email FROM t_accounts WHERE name = :name ;";
            $result = $conn->prepare($sqlChk);
            $result->execute(array(":name" => $fName));
            if ($result->rowCount() > 0) return $result->fetchObject()->email;
            $result->closeCursor();
        }

        function fetchComEmail($fNumber)
        {
            global $conn;
            $sqlChk = "SELECT engCompany AS companyName, saleEmail AS email FROM v_company_details WHERE number = :number ;";
            $result = $conn->prepare($sqlChk);
            $result->execute(array(":number" => $fNumber));
            if ($result->rowCount() > 0) return $result->fetchObject();
            $result->closeCursor();
        }

        function fetchAllEmail($lineArray)
        {
            global $conn;
            $whereIn = "";
            for ($i = 0; $i < count($lineArray); $i++) {
                $whereIn .= "'$lineArray[$i]'";
                if ($i + 1 < count($lineArray)) $whereIn .= ",";
            }

            $totalSql = "SELECT name, email FROM t_accounts WHERE name IN($whereIn) ;";
            $queryScmEmail = $conn->query($totalSql);
            $allMail = array();
            while ($row = $queryScmEmail->fetchObject()) $allMail[] = $row;
            $queryScmEmail->closeCursor();
            return $allMail;
        }

        if ($position === "scm") { //first approval

            $companyName =  $data->companyName;
            $sellerDetails = json_encode($data->sellerDetails, JSON_UNESCAPED_UNICODE);
            $score = json_encode($data->score, JSON_UNESCAPED_UNICODE);
            $moreInfo = json_encode($data->moreInfo, JSON_UNESCAPED_UNICODE);
            $summarize = $data->summarize;
            $submitBy = $data->submitBy;
            $approvalLine = $data->approvalLine;
            $approveEmail = fetchEmail($approvalLine[1]);

            $sendApprove = $sendMail($approveEmail, 'SNC VRS(Pending approval)', $setMsgScmPending($approvalLine[1], $companyName, $number));
            if ($sendApprove) {
                try {
                    $insertSql = "INSERT INTO t_score (number, 
                                                companyName, 
                                                sellerDetails, 
                                                score, 
                                                moreInfo, 
                                                summarize, 
                                                submitBy, 
                                                datetime)
                                    VALUES (:number, 
                                        :companyName, 
                                        :sellerDetails, 
                                        :score, 
                                        :moreInfo, 
                                        :summarize, 
                                        :submitBy, 
                                        :datetime) ;";

                    $updateSql = " UPDATE t_vendor 
                                    SET status = :status , 
                                        approvalLine = :approvalLine, 
                                        nextApprover = :nextApprover,
                                        approved = :approved
                                    WHERE number = :number2 ;";

                    $result = $conn->prepare($insertSql . $updateSql . $historySql);
                    $result->execute(array(
                        ":companyName" => $companyName,
                        ":sellerDetails" => $sellerDetails,
                        ":score" => $score,
                        ":moreInfo" => $moreInfo,
                        ":summarize" => $summarize,
                        ":submitBy" => $submitBy,
                        ":datetime" => $datetime,
                        ":status" => $status,
                        ":number" => $number,
                        ":number2" => $number,
                        ":username" => $username,
                        ":action" => $action,
                        ":note" => $note,
                        ":approvalLine" => join(',', $approvalLine),
                        ":nextApprover" => $approvalLine[1],
                        ":approved" => $name,
                        ":datetime" => $datetime
                    ));
                    echo json_encode(["message" => "Update Successfully", "state" => true]);
                } catch (PDOException $e) {
                    echo json_encode(["message" => $e->getMessage(), "state" => false]);
                }
            } else {
                echo json_encode(["message" => "Failed to send email", "state" => false]);
            }
        } else {
            if ($status !== "Hold") {

                $updateSql = " UPDATE t_vendor 
                                SET status = :status,
                                    nextApprover = :nextApprover ,
                                    approved = CONCAT(approved, :approved)
                                WHERE number = :number ;";

                $vendor = $conn->prepare("SELECT * FROM t_vendor WHERE number = :number;");
                $vendor->execute(array(":number" => $number));
                $vendorResult = $vendor->fetchObject();
                $vendor->closeCursor();

                $vendorLineApprove = explode(',', $vendorResult->approvalLine);
                $vendorApproved = explode(',', $vendorResult->approved);
                $vendorApproved[] = $name;
                $nextApproveArr = array_diff($vendorLineApprove, $vendorApproved);
                $nextApprove = array_shift($nextApproveArr);

                if (count($vendorLineApprove) === count($vendorApproved)) { // final approval
                    $allMail = fetchAllEmail($vendorLineApprove);
                    if (count($allMail) > 0) {
                        $sendScm = true;
                        foreach ($allMail as $oneMail) {
                            if (!$sendMail($oneMail->email, "SNC VRS (The registration form has been approved)", $setMsgScmApv($oneMail->name, $number))) $sendScm = false;
                        }
                        $sendVendor = $sendMail(fetchComEmail($number)->email, "SNC VRS (The registration form has been approved)", $setMsgVendorApv(fetchComEmail($number)->companyName, $number));

                        if ($sendScm && $sendVendor) {
                            try {
                                $updateResult = $conn->prepare($updateSql . $historySql);
                                $updateResult->execute(array(
                                    ":status" => $status,
                                    ":number" => $number,
                                    ":username" => $username,
                                    ":action" => $action,
                                    ":note" => $note,
                                    ":datetime" => $datetime,
                                    ":nextApprover" => "-",
                                    "approved" => ",$name"
                                ));
                                $updateResult->closeCursor();
                                echo json_encode(["message" => "Update Successfully", "state" => true]);
                            } catch (PDOException $e) {
                                echo json_encode(["message" => "There is a problem with the database", "state" => false]);
                            }
                        } else {
                            echo json_encode(["message" => "Failed to send email", "state" => false]);
                        }
                    } else {
                        echo json_encode(["message" => "Email list not found", "state" => false]);
                    }
                } else { // normal approval
                    $sendapprove = $sendMail(fetchEmail($nextApprove), 'SNC VRS(Pending approval)', $setMsgScmPending($nextApprove, fetchComEmail($number)->companyName, $number));
                    if ($sendapprove) {
                        try {
                            $updateResult = $conn->prepare($updateSql . $historySql);
                            $updateResult->execute(array(
                                ":status" => $status,
                                ":number" => $number,
                                ":username" => $username,
                                ":action" => $action,
                                ":note" => $note,
                                ":datetime" => $datetime,
                                ":nextApprover" => $nextApprove,
                                ":approved" => ",$name"
                            ));
                            $updateResult->closeCursor();

                            echo json_encode(["message" => "Update Successfully", "state" => true]);
                        } catch (PDOException $e) {
                            echo json_encode(["message" => $e->getMessage(), "state" => false]);
                        }
                    } else {
                        echo json_encode(["message" => "Failed to send email", "state" => false]);
                    }
                }
            } else { // status is Hold
                try {
                    $updateSql = " UPDATE t_vendor SET status = :status WHERE number = :number ;";
                    $updateResult = $conn->prepare($updateSql . $historySql);
                    $updateResult->execute(array(
                        ":status" => $status,
                        ":number" => $number,
                        ":username" => $username,
                        ":action" => $action,
                        ":note" => $note,
                        ":datetime" => $datetime
                    ));
                    $updateResult->closeCursor();

                    echo json_encode(["message" => "Update Successfully", "state" => true]);
                } catch (PDOException $e) {
                    echo json_encode(["message" => $e->getMessage(), "state" => false]);
                }
            }
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout."]);
    }
}
