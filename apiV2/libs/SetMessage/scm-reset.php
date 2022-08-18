<?php
    return function($approver, $username, $password){
        $massage = "<p><b>Dear:</b> $approver</p>
        <p>คำขอรีเซ็ตรหัสผ่านสำหรับบัญชี <b>SNC VRS</b></p><br/>
        <p><b>Username: </b>$username</p>
        <p><b>Password: </b>$password</p><br/>
        <p>โปรดลงชื่อเข้าใช้และเปลี่ยนรหัสผ่านใหม่</p>
        <h6>Powered by SNC-IIoT Team</h6>";

        return $massage;
    }
?>