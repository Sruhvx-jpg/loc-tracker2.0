export const verifyEmailTemplate = (username: string, verifyUrl: string) => `
  <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;">
    <h2>Email Verification</h2>
    <p>Hey ${username},</p>
    <p>Click the button below to verify your email:</p>
    <a href="${verifyUrl}" 
       style="display:inline-block;padding:10px 16px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">
      Verify Email
    </a>
    <p style="margin-top:20px;font-size:12px;color:#666;">
      If you didn’t request this, you can ignore this email.
    </p>
  </div>
`;