import { PremierUpdateDTO } from "@dkrasiev/movie-diary-core";
import { Channel } from "amqplib";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();
await prisma.$connect();

export class NotificationService {
  constructor(private channel: Channel, private exchange: string) {}

  public async checkUpdates() {
    return prisma.subscription.findMany().then((subscriptions) =>
      subscriptions.filter(async ({ premiereId }) => {
        const premiere = await prisma.premiere.findUnique({
          where: { id: premiereId },
        });
        if (!premiere) {
          return false;
        }

        return dayjs().diff(premiere.premiereRu) > 0;
      })
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
