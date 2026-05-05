// services/email.service.ts
import nodemailer from "nodemailer";
import { verifyEmailTemplate } from "./emailTemplate";


const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 25,
  secure: false,
});

export const sendVerificationEmail = async (
  to: string,
  username: string,
  token: string
) => {
  const verifyUrl = `http://localhost:3000/api/auth/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: `"YourApp" <sruhvxop26@gmail.com>`,
    to,
    subject: "Verify your email",
    text: `Hey ${username}, verify your email: ${verifyUrl}`,
    html: verifyEmailTemplate(username, verifyUrl),
  });

  return info.messageId;
};