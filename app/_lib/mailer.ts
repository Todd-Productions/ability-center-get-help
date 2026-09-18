import nodemailer, { type Transporter } from "nodemailer";

// Lazily created so a missing/incomplete SMTP config only breaks the request
// that actually needs to send mail, not the whole server on boot.
let transporter: Transporter | null = null;

export const getMailer = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.MAIL_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return transporter;
};
