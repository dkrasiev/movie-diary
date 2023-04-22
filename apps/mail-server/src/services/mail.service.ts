(await import("dotenv")).config();

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailService {
  constructor(private transport: Mail) {}

  public async sendMail(to: string, html: string, subject = "Movie Diary") {
    return this.transport.sendMail({
      to,
      html,
      subject,
    });
  }
}

export default new MailService(
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
);
