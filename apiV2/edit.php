<?php
require_once('./libs/dbconfig.php');
$chkAuth = require('./libs/chk-auth.php');
$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson);

if ($requestMethod == "POST") {
    if (!empty($data) && $chkAuth()->state) {
        $number = $data->number;
        $companyName = $data->companyDetails[0]->engCompany;
        $companyRegister = $data->companyRegister;

        $companyDetails = $data->companyDetails;
        $contactParson = $data->contactParson;
        $bankAccount = $data->bankAccount;
        // $stdCertificate = $data->stdCertificate;

        $username = $data->userName;
        $datetime = (new DateTime())->format('Y-m-d H:i:s');

        $sqlVendor = "UPDATE t_vendor 
                        SET companyName = :companyName, 
                            companyRegister = :companyRegister, 
                            username = :username
                        WHERE number =:number1 ;";

        $paramVendor = array(
            ":number1" => $number,
            ":companyName" => $companyName,
            ":companyRegister" => $companyRegister,
            ":username" => $username
        );

        $sqlDetails = "UPDATE t_company_details 
                        SET engCompany = :engCompany, 
                            thaiCompany = :thaiCompany, 
                            engAddress = :engAddress, 
                            thaiAddress = :thaiAddress, 
                            natureBusiness = :natureBusiness, 
                            companyWeb = :companyWeb, 
                            tel = :tel, 
                            fax = :fax
                        WHERE number = :number2 ;";

        $paramDetails = array(
            ":number2" => $number,
            ":engCompany" => $companyDetails[0]->engCompany,
            ":thaiCompany" => $companyDetails[0]->thaiCompany,
            ":engAddress" => $companyDetails[0]->engAddress,
            ":thaiAddress" => $companyDetails[0]->thaiAddress,
            ":natureBusiness" => $companyDetails[0]->natureBusiness,
            ":companyWeb" => $companyDetails[0]->companyWeb,
            ":tel" => $companyDetails[0]->tel,
            ":fax" => $companyDetails[0]->fax
        );

        $sqlParson = "UPDATE t_contact_parson 
                        SET saleName = :saleName, 
                            saleEmail = :saleEmail, 
                            saleTel = :saleTel, 
                            saleManagerName = :saleManagerName, 
                            saleManagerEmail = :saleManagerEmail, 
                            saleManagerTel = :saleManagerTel, 
                            otherName = :otherName, 
                            otherEmail = :otherEmail, 
                            otherTel = :otherTel
                        WHERE number = :number3 ;";

        $paramParson = array(
            ":number3" => $number,
            ":saleName" => $contactParson[0]->sale[0]->name,
            ":saleEmail" => $contactParson[0]->sale[0]->email,
            ":saleTel" => $contactParson[0]->sale[0]->tel,
            ":saleManagerName" => $contactParson[0]->saleManager[0]->name,
            ":saleManagerEmail" => $contactParson[0]->saleManager[0]->email,
            ":saleManagerTel" => $contactParson[0]->saleManager[0]->tel,
            ":otherName" => $contactParson[0]->other[0]->name,
            ":otherEmail" => $contactParson[0]->other[0]->email,
            ":otherTel" => $contactParson[0]->other[0]->tel
        );

        // $sqlCertificate = "UPDATE t_std_certificate
        //                     SET certificate = :certificate, 
        //                         payment = :payment, 
        //                         stdPacking = :stdPacking, 
        //                         moq = :moq 
        //                     WHERE number =:number4 ;";
        // $paramCertificate = array(
        //     ":number4" => $number,
        //     ":certificate" => join(",", $stdCertificate[0]->certificate),
        //     ":payment" => join(",", $stdCertificate[0]->payment),
        //     ":stdPacking" => $stdCertificate[0]->stdPacking,
        //     ":moq" => $stdCertificate[0]->moq
        // );

        $sqlBank = "UPDATE t_bank_account 
                    SET accountName = :accountName, 
                        accountNo = :accountNo, 
                        bank = :bank, 
                        otherBank = :otherBank, 
                        branch = :branch, 
                        contact = :contact, 
                        tel = :tel, 
                        email = :email
                    WHERE number = :number5, ;";
        $paramBank = array(
            ":number5" => $number,
            ":accountName" => $bankAccount[0]->accountName,
            ":accountNo" => $bankAccount[0]->accountNo,
            ":bank" => $bankAccount[0]->bank,
            ":otherBank" => $bankAccount[0]->otherBank,
            ":branch" => $bankAccount[0]->branch,
            ":contact" => $bankAccount[0]->contact,
            ":tel" => $bankAccount[0]->tel,
            ":email" => $bankAccount[0]->email
        );


        try {
            $stmVendor = $conn->prepare($sqlVendor);
            $stmDetails = $conn->prepare($sqlDetails);
            $stmParson = $conn->prepare($sqlParson);
            // $stmCertificate = $conn->prepare($sqlCertificate);
            $stmBank = $conn->prepare($sqlBank);

            $stmVendor->execute($paramVendor);
            $stmDetails->execute($paramDetails);
            $stmParson->execute($paramParson);
            // $stmCertificate->execute($paramCertificate);
            $stmBank->execute($paramBank);

            $stmVendor->closeCursor();
            $stmDetails->closeCursor();
            $stmParson->closeCursor();
            // $stmCertificate->closeCursor();
            $stmBank->closeCursor();

            echo json_encode(["message" => "Update Successfully", "number" => $number, "state" => true]);
        } catch (PDOException $e) {
            echo json_encode(["message" => $e->getMessage(), "state" => false]);
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout"]);
    }
}
