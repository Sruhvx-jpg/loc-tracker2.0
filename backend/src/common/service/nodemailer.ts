// services/email.service.ts
import nodemailer from "nodemailer";
import { verifyEmailTemplate } from "./emailTemplate";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (
  to: string,
  username: string,
  token: string
) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: `"YourApp" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verify your email",
    text: `Hey ${username}, verify your email: ${verifyUrl}`,
    html: verifyEmailTemplate(username, verifyUrl),
  });

  return info.messageId;
};