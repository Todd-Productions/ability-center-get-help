const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const buildGetHelpRequestTemplate = ({
  fullName,
  email,
  phoneNumber,
  county,
  preferredContactMethod,
  bestTimeToContact,
  profileType,
  needs,
  additionalInfo,
}: {
  fullName: string;
  email: string;
  phoneNumber: string;
  county: string;
  preferredContactMethod: string;
  bestTimeToContact: string;
  profileType: string;
  needs: string[];
  additionalInfo?: string;
}) => {
  return {
    subject: "New Get Help Request — The Ability Center",
    html: `
      <html>
        <head>
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Get Help Request</title>
          <style>
            /* ---------- GLOBAL RESETS ---------- */
            img {
              border: none;
              -ms-interpolation-mode: bicubic;
              max-width: 100%;
            }
            body {
              background-color: #f6f6f6;
              font-family: sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 14px;
              line-height: 1.4;
              margin: 0;
              padding: 0;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
            }
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
            }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top;
            }

            /* ---------- BODY & CONTAINER ---------- */
            .body {
              background-color: #f6f6f6;
              width: 100%;
            }
            .container {
              display: block;
              margin: 0 auto !important;
              max-width: 580px;
              padding: 10px;
              width: 580px;
            }
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
            }

            /* ---------- HEADER, FOOTER, MAIN ---------- */
            .main {
              background: #ffffff;
              border-radius: 3px;
              border-top: 4px solid #ffc20e;
              width: 100%;
            }
            .wrapper {
              box-sizing: border-box;
              padding: 20px;
            }
            .footer {
              clear: both;
              margin-top: 10px;
              text-align: center;
              width: 100%;
            }
            .footer td,
            .footer p,
            .footer span,
            .footer a {
              color: #999999;
              font-size: 12px;
              text-align: center;
            }

            /* ---------- TYPOGRAPHY ---------- */
            h1, h2, h3, h4 {
              color: #071f45;
              font-family: sans-serif;
              font-weight: 400;
              line-height: 1.4;
              margin: 0 0 30px 0;
            }
            p, ul, ol {
              font-family: sans-serif;
              font-size: 14px;
              font-weight: normal;
              margin: 0 0 15px 0;
              color: #333333;
            }
            ul {
              padding-left: 20px;
            }
            a {
              color: #071f45;
              text-decoration: underline;
            }

            /* ---------- HEADER ---------- */
            .header {
              background: #071f45;
              padding: 24px 20px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              font-size: 20px;
              font-weight: 700;
              margin: 0;
            }
            .header span {
              color: #ffc20e;
            }

            /* ---------- RESPONSIVE ---------- */
            @media only screen and (max-width: 620px) {
              table[class="body"] p,
              table[class="body"] ul,
              table[class="body"] ol,
              table[class="body"] td,
              table[class="body"] span,
              table[class="body"] a {
                font-size: 16px !important;
              }
              table[class="body"] .wrapper {
                padding: 10px !important;
              }
              table[class="body"] .content {
                padding: 0 !important;
              }
              table[class="body"] .container {
                padding: 0 !important;
                width: 100% !important;
              }
              table[class="body"] .main {
                border-radius: 0 !important;
              }
            }
          </style>
        </head>

        <body>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
                  <div class="header">
                    <h1>The <span>Ability</span> Center</h1>
                  </div>
                  <!-- START CENTERED WHITE CONTAINER -->
                  <table role="presentation" class="main">
                    <tr>
                      <td class="wrapper">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <h2 style="text-align: center; margin-bottom: 20px; font-size: 22px; font-weight: 700;">
                                New Get Help Request
                              </h2>
                              <p><strong>I am:</strong> ${profileType}</p>
                              <p><strong>Areas of need:</strong></p>
                              <ul>
                                ${needs.map((need) => `<li>${need}</li>`).join("")}
                              </ul>
                              <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
                              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                              <p><strong>Phone:</strong> ${escapeHtml(phoneNumber)}</p>
                              <p><strong>County:</strong> ${escapeHtml(county)}</p>
                              <p><strong>Preferred Contact Method:</strong> ${escapeHtml(preferredContactMethod)}</p>
                              <p><strong>Best Time to Contact:</strong> ${escapeHtml(bestTimeToContact)}</p>
                              <p><strong>Additional Info:</strong> ${additionalInfo?.length ? escapeHtml(additionalInfo) : "No additional info provided"}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!-- END CENTERED WHITE CONTAINER -->

                  <!-- START FOOTER -->
                  <div class="footer">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="content-block">
                          Submitted from the Get Help Form
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
};
