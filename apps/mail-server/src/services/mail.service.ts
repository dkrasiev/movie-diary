(await import("dotenv")).config();
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
