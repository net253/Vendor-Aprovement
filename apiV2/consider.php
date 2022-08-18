<?php
require_once('./libs/dbconfig.php');
$chkAuth = require('./libs/chk-auth.php');

$conn = new PDO("mysql:host=$hostname;dbname=$database", $dbusername, $dbpassword);

session_start();

$requestMethod = $_SERVER['REQUEST_METHOD'];
$dataJson = file_get_contents("php://input");
$data =  json_decode($dataJson);

if ($requestMethod == "POST") {
    if (!empty($data) && $chkAuth()->state) {
        try {
            $number = $data->number;
            $vendorSql = "SELECT * FROM t_vendor WHERE number = :number ;";
            $scoreSql = "SELECT * FROM t_score WHERE number = :number ;";
            $stdSql = "SELECT * FROM t_std_certificate WHERE number = :number ;";
            $comSql = "SELECT * FROM t_company_details WHERE number = :number ;";
            $conSql = "SELECT * FROM t_contact_parson WHERE number = :number ;";
            $bankSql = "SELECT * FROM t_bank_account WHERE number = :number ;";
            $pdfSql = "SELECT * FROM t_pdf WHERE number = :number ;";

            $stmVender = $conn->prepare($vendorSql);
            $stmScore = $conn->prepare($scoreSql);
            $stmStd = $conn->prepare($stdSql);
            $stmCom = $conn->prepare($comSql);
            $stmCon = $conn->prepare($conSql);
            $stmBank = $conn->prepare($bankSql);
            $stmPdf = $conn->prepare($pdfSql);

            $stmVender->execute(array(":number" => $number));
            $stmScore->execute(array(":number" => $number));
            $stmStd->execute(array(":number" => $number));
            $stmCom->execute(array(":number" => $number));
            $stmCon->execute(array(":number" => $number));
            $stmBank->execute(array(":number" => $number));
            $stmPdf->execute(array(":number" => $number));

            $resultVender = $stmVender->fetchObject();
            $resultScore = $stmScore->fetchObject();
            $resultStd = $stmStd->fetchObject();
            $resultCom = $stmCom->fetchObject();
            $resultCon = $stmCon->fetchObject();
            $resultBank = $stmBank->fetchObject();
            $resultPdf = $stmPdf->fetchObject();

            $stmVender->closeCursor();
            $stmScore->closeCursor();
            $stmStd->closeCursor();
            $stmCom->closeCursor();
            $stmCon->closeCursor();
            $stmBank->closeCursor();
            $stmPdf->closeCursor();

            $sellerDetails = json_decode($resultScore->sellerDetails ?? "[]");
            $score = json_decode($resultScore->score ?? "[]");
            $moreInfo = json_decode($resultScore->moreInfo ?? "[]");

            $sale = array(
                "name" => $resultCon->saleName,
                "email" => $resultCon->saleEmail,
                "tel" => $resultCon->saleTel
            );
            $saleManager = array(
                "name" => $resultCon->saleManagerName,
                "email" => $resultCon->saleManagerEmail,
                "tel" => $resultCon->saleManagerTel
            );
            $other = array(
                "name" => $resultCon->otherName,
                "email" => $resultCon->otherEmail,
                "tel" => $resultCon->otherTel
            );

            echo json_encode([
                "state" => true,
                "results" => array_merge(
                    (array)$resultVender,
                    array_merge(
                        (array)$resultScore,
                        [
                            "sellerDetails" => $sellerDetails,
                            "score" => $score,
                            "moreInfo" => $moreInfo
                        ],
                        [
                            "approvalLine" => explode(',', $resultVender->approvalLine),
                            "approved" => explode(',', $resultVender->approved)
                        ]
                    ),
                    [
                        "companyDetails" => [$resultCom],
                        "contactParson" => [[
                            "sale" => [$sale],
                            "saleManager" => [$saleManager],
                            "other" => [$other]
                        ]],
                        "stdCertificate" => [[
                            "certificate" => explode(',', $resultStd->certificate),
                            "payment" => explode(',', $resultStd->payment),
                            "stdPacking" => $resultStd->stdPacking,
                            "moq" => $resultStd->moq
                        ]],
                        "bankAccount" => [$resultBank],
                        "pdf" => [
                            (object)[
                                "name" => "stdPackingPdf",
                                "base64" => $resultPdf->stdBase64,
                                "fileName" => $resultPdf->stdName
                            ],
                            (object)[
                                "name" => "moqPdf",
                                "base64" => $resultPdf->moqBase64,
                                "fileName" => $resultPdf->moqName
                            ],
                            (object)[
                                "name" => "vatPdf",
                                "base64" => $resultPdf->vatBase64,
                                "fileName" => $resultPdf->vatName
                            ],
                            (object)[
                                "name" => "affidavitPdf",
                                "base64" => $resultPdf->affidavitBase64,
                                "fileName" => $resultPdf->affidavitName
                            ],
                            (object)[
                                "name" => "mapPdf",
                                "base64" => $resultPdf->mapBase64,
                                "fileName" => $resultPdf->mapName
                            ],
                            (object)[
                                "name" => "otherPdf",
                                "base64" => $resultPdf->otherBase64,
                                "fileName" => $resultPdf->otherName
                            ],
                            (object)[
                                "name" => "mapLink",
                                "link" => $resultPdf->mapLink
                            ],
                        ]
                    ]
                )
            ]);
        } catch (PDOException $e) {
            echo json_encode(["state" => false, "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout"]);
    }
}
