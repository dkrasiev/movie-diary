import amqplib from "amqplib";

// todo: вынести в пакет
export const QUEUE = "premier_update";

export const connection = await amqplib.connect("amqp://localhost");
export const channel = await connection.createChannel();

await channel.assertQueue(QUEUE, {
  durable: true,
});
