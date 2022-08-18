<?php
    return function($approver, $companyName, $number){
        $massage = '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;unicode-bidi:embed;word-break:normal">
                        <font color="#000000" face="Calibri">Dear: '. $approver . '</font>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span ><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;unicode-bidi:embed;word-break:normal">
                        <font color="#000000" face="Calibri" size="4"><b>#Vendor registration</b></font>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:rgb(0,32,96);font-weight:bold">Application Form No.: '. $number .'</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:rgb(0,32,96);font-weight:bold">Company Name: '. $companyName .'</span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span ><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">Pending approval, please proceed via </span>
                        <u><span style="font-family:Calibri;color:rgb(0,32,96)">Link</span></u>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span ><br></span>
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
                        <span ><br></span>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">This message was sent automatically. </span>
                        <u><span style="font-family:Calibri;color:black">pleasedo not reply</span></u>
                    </p>';

        $massage .= '<p style="line-height:90%;margin-top:10pt;margin-bottom:0pt;margin-left:0in;text-indent:0in;direction:ltr;unicode-bidi:embed;word-break:normal">
                        <span style="font-family:Calibri;color:black">Powered by SNC-IIoT Team</span>
                    </p>';

        return $massage;
    }
?>