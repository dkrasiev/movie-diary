import { PremierUpdateDTO } from "@dkrasiev/movie-diary";
import { Channel } from "amqplib";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();
await prisma.$connect();

export class NotificationService {
  constructor(private channel: Channel, private exchange: string) {}

  public async checkUpdates() {
    return prisma.subscription
      .findMany()
      .then((subscriptions) =>
        subscriptions.filter(({ premiereRu }) => dayjs().diff(premiereRu) > 0)
      );
  }

  public publish(payload: PremierUpdateDTO, routingKey: string = "") {
    return this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(payload))
    );
  }
}
