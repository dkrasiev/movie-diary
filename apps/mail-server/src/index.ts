import { PremierUpdateDTO } from "@dkrasiev/movie-diary-core";
import amqp from "amqplib";
import nodemailer from "nodemailer";
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
      console.log("consume message:", content);

      const subscription = JSON.parse(content) as PremierUpdateDTO;

      const email = subscription.expand?.user.email;
      const movie = subscription.expand?.premiere.expand?.movie;

      if (!email || !movie) {
        channel.nack(message);
        throw new Error("user email or movie not found");
      }

      const html = generateHtml(String(movie.kinopoiskId));
      await mailService.sendMail(email, html);

      channel.ack(message);
    } catch (e) {
      console.error(e);
    }
  }
});
