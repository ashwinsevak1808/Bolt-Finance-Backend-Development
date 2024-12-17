const getRegistrationEmailTemplate = (name, otp, email) => {
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>FinanceFlow OTP Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Reset and Normalize */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }

      img {
        -ms-interpolation-mode: bicubic;
      }

      /* Responsive Styles */
      @media screen and (max-width: 600px) {
        .container {
          width: 100% !important;
        }
      }
    </style>
  </head>

  <body>
    <table
      class="container"
      width="600"
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
        border-radius: 20px;
        overflow: hidden;
      "
    >
      <tr>
        <td
          style="
            padding: 20px;
            background: #171717;
            border-bottom: 2px dashed #e6f7f5;
          "
        >
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" valign="top" style="padding: 0">
                <h1 style="margin: 8px 0 0 0">
                  <span
                    style="
                      color: #fff;
                      text-transform: capitalize;
                      font-family: Arial, sans-serif;
                      font-weight: bold;
                    "
                    >Finance</span
                  ><span
                    style="
                      font-family: Arial, sans-serif;
                      font-weight: bold;
                      color: #fff;
                      text-transform: capitalize;
                    "
                    >Flow</span
                  >
                </h1>
              </td>
            </tr>
            <tr>
              <td
                align="left"
                style="
                  font-family: Arial, sans-serif;
                  font-size: 14px;
                  line-height: 24px;
                  color: #fff;
                  padding-top: 10px;
                "
              >
                Manage your personal finances with ease.
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; border-bottom: 1px solid #e0e0e0">
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 24px;
              color: #3f3f3f;
            "
          >
            Dear ${name},<br /><br />
            Thank you for registering with FinanceFlow! To complete your account
            setup, please use the One Time Password (OTP) below:<br /><br />
            <span
              style="
                display: block;
                font-size: 18px;
                font-weight: bold;
                color: #171717;
                margin: 10px 0;
              "
              >${otp}</span
            ><br />
            This OTP is valid for the next 10 minutes. Please do not share it
            with anyone.<br /><br />
            We look forward to helping you take control of your finances!<br /><br />
            Best regards,<br />
            The FinanceFlow Team
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px">
          <p
            style="
              font-family: Arial, sans-serif;
              font-size: 14px;
              line-height: 24px;
              color: #3f3f3f;
            "
          >
            Need assistance? Visit our
            <a
              href="#"
              style="color: #171717; text-decoration: none; font-weight: bold"
              >Support Center</a
            >
            or contact us at
            <a
              href="mailto:financeflow.help@gmail.com"
              style="color: #171717; text-decoration: none; font-weight: bold"
              >financeflow.help@gmail.com</a
            >.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; background-color: #f5f5f5">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td height="10"></td>
            </tr>
            <tr>
              <td
                align="left"
                style="
                  font-size: 14px;
                  line-height: 24px;
                  color: #3f3f3f;
                  font-family: Arial, sans-serif;
                "
              >
                FinanceFlow, Financial District, Tech Avenue, Mumbai,
                Maharashtra, <br />India - 400072 <br />
                This email was sent to ${email}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
};


module.exports = {
    getRegistrationEmailTemplate,
};
