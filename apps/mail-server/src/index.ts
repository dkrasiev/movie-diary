import { PremierUpdateDTO } from "@dkrasiev/movie-diary-core";
import amqp from "amqplib";
import nodemailer from "nodemailer";
import { MailService } from "./services/mail.service.js";

if (!process.env.RABBIT_URI) {
  throw new Error("RABBIT_URI not found");
}

const QUEUE = "email_notifications";

const channel = await amqp
  .connect(process.env.RABBIT_URI)
  .then((connection) => connection.createChannel());

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

console.log("consuming...");
channel.consume(QUEUE, async (message) => {
  if (message) {
    try {
      const content = message.content.toString();
      console.log("consume message:", content);

      const subscription = JSON.parse(content) as PremierUpdateDTO;

      await mailService.sendNotification(subscription);

      channel.ack(message);
    } catch (e) {
      console.error(e);
    }
  }
});
