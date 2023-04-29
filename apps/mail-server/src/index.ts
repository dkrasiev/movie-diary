import nodemailer from "nodemailer";
import amqp from "amqplib";
import { MailService } from "./services/mail.service.js";

const QUEUE = "email_notifications";

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
const mailService = new MailService(transport);

function generateHtml(data: string): string {
  return `
  <h1>${data}</h1>
  `;
}

console.log("consuming...");
channel.consume(QUEUE, async (message) => {
  if (message) {
    try {
      const content = message.content.toString();
      console.log("consume message: ", content);

      const { userId, kinopoiskId } = JSON.parse(content);

      if (!userId || !kinopoiskId) {
        throw new Error("userId or kinopoiskId not found");
      }

      // const user = await prisma.user.findUnique({ where: { id: userId } });
      // if (!user) {
      //   throw new Error("user not found");
      // }

      const html = generateHtml(kinopoiskId);

      // await mailService.sendMail(user.email, html, kinopoiskId);
      channel.ack(message);
    } catch (e) {
      console.error(e);
      channel.nack(message);
    }
  }
});
