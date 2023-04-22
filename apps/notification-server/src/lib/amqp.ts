import amqplib from "amqplib";

export const EXCHANGE = "premier_update";

export const connection = await amqplib.connect("amqp://localhost");
export const channel = await connection.createChannel();
