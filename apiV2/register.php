<?php
require_once('./libs/dbconfig.php');
$runNumber = require('./libs/runnumber.php');
$sendMail = require('./libs/sendmail.php');
$setMsgVendorRegis = require('./libs/Setmessage/vendor-regis.php');
$setMsgScmPending = require('./libs/Setmessage/scm-pending.php');

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson);

if ($requestMethod == "POST") {
    if (!empty($data)) {
        $number = $runNumber();
        $companyName = $data->companyDetails[0]->engCompany;
        $companyRegister = $data->companyRegister;

        $companyDetails = $data->companyDetails;
        $contactParson = $data->contactParson;
        $stdCertificate = $data->stdCertificate;
        $bankAccount = $data->bankAccount;
        $pdf = $data->pdf;

        $username = $data->username;
        $status = $data->status;
        $datetime = (new DateTime())->format('Y-m-d H:i:s');
        $saleEmail = $data->contactParson[0]->sale[0]->email;

        $sqlVendor = "INSERT INTO t_vendor (number, 
                                            companyName, 
                                            companyRegister, 
                                            username, 
                                            status,
                                            datetime)
                        VALUES (:number1, 
                                :companyName, 
                                :companyRegister,  
                                :username, 
                                :status,
                                :datetime) ;";

        $paramVendor = array(
            ":number1" => $number,
            ":companyName" => $companyName,
            ":companyRegister" => $companyRegister,
            ":username" => $username,
            ":status" => $status,
            ":datetime" => $datetime
        );

        $sqlDetails = "INSERT INTO t_company_details (number, 
                                                        engCompany, 
                                                        thaiCompany, 
                                                        engAddress, 
                                                        thaiAddress, 
                                                        natureBusiness, 
                                                        companyWeb, 
                                                        tel, 
                                                        fax)
                        VALUES (:number2, 
                                :engCompany, 
                                :thaiCompany, 
                                :engAddress, 
                                :thaiAddress, 
                                :natureBusiness, 
                                :companyWeb, 
                                :tel, 
                                :fax) ;";

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

        $sqlParson = "INSERT INTO t_contact_parson (number, 
                                                    saleName, 
                                                    saleEmail, 
                                                    saleTel, 
                                                    saleManagerName, 
                                                    saleManagerEmail, 
                                                    saleManagerTel, 
                                                    otherName, 
                                                    otherEmail, 
                                                    otherTel)
                        VALUES (:number3, 
                                :saleName, 
                                :saleEmail, 
                                :saleTel, 
                                :saleManagerName, 
                                :saleManagerEmail, 
                                :saleManagerTel, 
                                :otherName, 
                                :otherEmail, 
                                :otherTel) ;";
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

        $sqlCertificate = "INSERT INTO t_std_certificate(number, 
                                                        certificate, 
                                                        payment, 
                                                        stdPacking, 
                                                        moq) 
                            VALUES (:number4, 
                                    :certificate, 
                                    :payment, 
                                    :stdPacking, 
                                    :moq) ;";
        $paramCertificate = array(
            ":number4" => $number,
            ":certificate" => join(",", $stdCertificate[0]->certificate),
            ":payment" => join(",", $stdCertificate[0]->payment),
            ":stdPacking" => $stdCertificate[0]->stdPacking,
            ":moq" => $stdCertificate[0]->moq
        );

        $sqlBank = "INSERT INTO t_bank_account (number, 
                                                accountName, 
                                                accountNo, 
                                                bank, 
                                                otherBank, 
                                                branch, 
                                                contact, 
                                                tel, 
                                                email)
                        VALUES (:number5, 
                                :accountName, 
                                :accountNo, 
                                :bank, 
                                :otherBank, 
                                :branch, 
                                :contact, 
                                :tel, 
                                :email) ;";
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

        $sqlPdf = "INSERT INTO t_pdf(number, 
                                        stdName, 
                                        stdBase64, 
                                        moqName, 
                                        moqBase64, 
                                        vatName, 
                                        vatBase64, 
                                        affidavitName, 
                                        affidavitBase64, 
                                        mapName, 
                                        mapBase64, 
                                        otherName, 
                                        otherBase64, 
                                        mapLink)
                    VALUES (:number6, 
                            :stdName, 
                            :stdBase64, 
                            :moqName, 
                            :moqBase64, 
                            :vatName, 
                            :vatBase64, 
                            :affidavitName, 
                            :affidavitBase64, 
                            :mapName, 
                            :mapBase64, 
                            :otherName, 
                            :otherBase64, 
                            :mapLink);";
        function findPdf($name)
        {
            global $pdf;
            $array = $pdf;

            foreach ($array as $element) {
                if ($name == $element->name) {
                    return $element;
                }
            }

            return false;
        }
        $paramPdf = array(
            ":number6" => $number,
            ":stdName" => findPdf("stdPackingPdf")->fileName,
            ":stdBase64" => findPdf("stdPackingPdf")->base64,
            ":moqName" => findPdf("moqPdf")->fileName,
            ":moqBase64" => findPdf("moqPdf")->base64,
            ":vatName" => findPdf("vatPdf")->fileName,
            ":vatBase64" => findPdf("vatPdf")->base64,
            ":affidavitName" => findPdf("affidavitPdf")->fileName,
            ":affidavitBase64" => findPdf("affidavitPdf")->base64,
            ":mapName" => findPdf("mapPdf")->fileName,
            ":mapBase64" => findPdf("mapPdf")->base64,
            ":otherName" => findPdf("otherPdf")->fileName,
            ":otherBase64" => findPdf("otherPdf")->base64,
            ":mapLink" => findPdf("mapLink")->link
        );

        $emailSql = "SELECT name, email FROM t_accounts WHERE position = 'scm' ;";
        $queryAccEmail = $conn->query($emailSql);
        $accResult = true;
        while ($row = $queryAccEmail->fetchObject()) {
            if (!$sendMail($row->email, "SNC VRS(Pending approval)", $setMsgScmPending($row->name, $companyName, $number))) $accResult = false;
        }
        $queryAccEmail->closeCursor();
        $saleResult = $sendMail($saleEmail, "SNC VRS", $setMsgVendorRegis($companyName, $number));

        // $accResult = true;
        // $saleResult = true;

        if ($accResult && $saleResult) {
            try {
                $stmVendor = $conn->prepare($sqlVendor);
                $stmDetails = $conn->prepare($sqlDetails);
                $stmParson = $conn->prepare($sqlParson);
                $stmCertificate = $conn->prepare($sqlCertificate);
                $stmBank = $conn->prepare($sqlBank);
                $stmPdf = $conn->prepare($sqlPdf);

                $stmVendor->execute($paramVendor);
                $stmDetails->execute($paramDetails);
                $stmParson->execute($paramParson);
                $stmCertificate->execute($paramCertificate);
                $stmBank->execute($paramBank);
                $stmPdf->execute($paramPdf);

                $stmVendor->closeCursor();
                $stmDetails->closeCursor();
                $stmParson->closeCursor();
                $stmCertificate->closeCursor();
                $stmBank->closeCursor();
                $stmPdf->closeCursor();

                echo json_encode(["message" => "Insert Successfully", "number" => $number, "state" => true]);
            } catch (PDOException $e) {
                echo json_encode(["message" => $e->getMessage(), "state" => false]);
            }
        } else {
            echo json_encode(["message" => "Failed to send email", "state" => false]);
        }
    }
}
