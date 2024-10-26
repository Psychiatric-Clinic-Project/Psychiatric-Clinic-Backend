export const emialTemplate=(username, verificationUrl)=>{
    return `
     <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - [Clinic Name]</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #f8f8f8;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
      }
      h2 {
        color: #4CAF50;
        text-align: center;
      }
      p {
        line-height: 1.6;
      }
      .button-container {
        text-align: center;
        margin: 20px 0;
      }
      .button {
        background-color: #4CAF50;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        font-weight: bold;
        border-radius: 5px;
      }
      .footer {
        font-size: 12px;
        color: #777;
        text-align: center;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Welcome to [Clinic Name]!</h2>
      
      <p>Dear ${username},</p>
      
      <p>Thank you for registering with [Clinic Name]. We’re excited to support you in your journey toward better health and wellness.</p>

      <p>To complete your registration, please verify your email by clicking the button below:</p>
      
      <div class="button-container">
        <a href="${verificationUrl}" class="button">Verify Email</a>
      </div>

      <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
      <p style="word-wrap: break-word;">${verificationUrl}</p>
      
      <p>This verification link will expire in 1 hour. If you didn’t register at our clinic, please disregard this email.</p>

      <p>Warm regards,</p>
      <p><strong>[Clinic Name] Team</strong></p>
    </div>
    
    <div class="footer">
      <p>[Clinic Address Line 1]<br>[City, Zip Code]<br>[Phone Number]</p>
    </div>
  </body>
  </html>
    `}