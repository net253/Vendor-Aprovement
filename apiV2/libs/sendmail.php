<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;
use PHPMailer\PHPMailer\SMTP;

require 'vendor/autoload.php';
// require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/Exception.php';
// require 'PHPMailer/src/SMTP.php';

return function ($mailAd, $sj, $msg) {

    $mail = new PHPMailer(true);
    try {
        $myEmail = "snc.iotteam@gmail.com";
        $mail->CharSet = "utf-8";

        $mail->isSMTP();
        // $mail->SMTPDebug = 1;

        $mail->Mailer = "smtp";
        $mail->Host = "smtp.gmail.com";
        $mail->Port = "465";

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = true;
        $mail->AuthType = 'XOAUTH2';
        // $mail->Username = $myEmail;
        // $mail->SMTPSecure = "tls";

        $clientId = "1076725550653-epeca4dan41qtsntv7jfnk9d7le811qq.apps.googleusercontent.com";
        $clientSecret = "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";
        $refreshToken = "1//0gziZobuOT6_eCgYIARAAGBASNwF-L9Irw4WQZlVHXdwuSN559u2fvalPzwVkjznpgUnUE-wd0OsPnaQ8xehh4Xq7CiYawkzWpm4";

        $provider = new Google(
            [
                'clientId' => $clientId,
                'clientSecret' => $clientSecret,
            ]
        );

        $mail->setOAuth(
            new OAuth(
                [
                    'provider' => $provider,
                    'clientId' => $clientId,
                    'clientSecret' => $clientSecret,
                    'refreshToken' => $refreshToken,
                    'userName' => $myEmail,
                ]
            )
        );

        $mail->setFrom($myEmail, 'SNC VRS');
        $mail->addAddress($mailAd);

        $mail->isHTML(true);
        $mail->Subject = $sj;
        $mail->Body = $msg;

        $mail->send();
        return true;
    } catch (Exception $e) {
        echo json_encode(["message" => $e->getMessage()]);
        return false;
        // return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
};
