<?php 
    return function($companyName, $number){
        $massage = '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;unicode-bidi:embed;word-break:normal">
                        <font color="#000000" face="Calibri">'. $companyName . '</font>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:rgb(0,32,96);font-weight:bold">Application Form No.: ' . $number . '</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">The registration form has been <b>approved.</b></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">For the next step, please contact the coordinator directly.</span>
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