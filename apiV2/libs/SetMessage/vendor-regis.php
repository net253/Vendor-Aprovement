<?php 
    return function($companyName, $number){
        $massage = '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;unicode-bidi:embed;word-break:normal">
                        <font color="#000000" face="Calibri">'. $companyName . '</font>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">SNC-VRS has received your company’s vendor registration information.</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">This will take 3-5 business days for approval.</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:rgb(0,32,96);font-weight:bold">Application Form No.: '. $number .'</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">The system will be sending </span>
                        <u><span style="font-family:Calibri;color:black">progression via this e-mail. </span></u>
                        <span style="font-family:Calibri;color:black">
                            In the event that  not received within the specified period please inquire about the progress directly with the coordinator.
                        </span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">Best regards,</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:LilyUPC;color:red;font-weight:bold;font-style:italic">
                            <font size="4">SNC</font>
                        </span>
                        <span style="font-family:Calibri;color:black"> - Purchasing Department </span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">This message was sent automatically. </span>
                        <u><span style="font-family:Calibri;color:black">please do not reply</span></u>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">Powered by SNC-IIoT Team</span>
                    </p>';

        return $massage;
    }
?>