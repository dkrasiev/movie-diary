import amqp from "amqplib";
import mailService from "./services/mail.service.js";

const MAIL_QUEUE = "premier_update";

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

channel.consume(MAIL_QUEUE, async (message) => {
  if (message) {
    try {
      console.log("consume message: ", message?.content.toString());
      const data = JSON.parse(message?.content.toString() || "");

      if (
        (typeof data.to === "string" && typeof data.html === "string") === false
      ) {
        throw new Error("Bad Message");
      }

      await mailService.sendMail(data.to, data.html);
    } catch (e) {
      console.error(e);
    } finally {
      channel.ack(message);
    }
  }
});
