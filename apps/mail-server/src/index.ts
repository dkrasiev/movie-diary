import { MovieShort, PremierUpdateDTO } from "@dkrasiev/movie-diary";
import amqp from "amqplib";
import mailService from "./services/mail.service.js";

const QUEUE = "email_notification";

const connection = await amqp.connect("amqp://localhost");
const channel = await connection.createChannel();

function generateHtml(movie: MovieShort): string {
  return `
  <h1>${movie.nameRu || movie.nameEn} premiere</h1>
  `;
}

channel.consume(QUEUE, async (message) => {
  if (message) {
    try {
      const content = message.content.toString();
      console.log("consume message: ", content);

      const data = JSON.parse(content) as PremierUpdateDTO;
      const movie = data.movie;

      const to = data.email;
      const html = generateHtml(movie);

      await mailService.sendMail(to, html, movie.nameRu);
      channel.ack(message);
    } catch (e) {
      console.error(e);
      channel.nack(message);
    }
  }
});
