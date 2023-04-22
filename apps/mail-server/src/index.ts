import amqp from "amqplib";
import mailService from "./services/mail.service.js";

const QUEUE = "email_notification";

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

channel.consume(QUEUE, async (message) => {
  if (message) {
    try {
      const content = message.content.toString();
      console.log("consume message: ", content);

      const data = JSON.parse(content);
      const { to, html } = data;

      if ((typeof to === "string" && typeof html === "string") === false) {
        console.error("Error: bad Message");
        channel.nack(message);
        return;
      }

      await mailService.sendMail(to, html);
      channel.ack(message);
    } catch (e) {
      console.error(e);
    }
  }
});
