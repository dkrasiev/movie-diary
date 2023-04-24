import amqplib from "amqplib";
import * as cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { NotificationService } from "./services/notification.service.js";

const EXCHANGE = "subscription_updates";

amqplib
  .connect("amqp://localhost")
  .then((connection) => connection.createChannel())
  .then(async (channel) => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    const notificationService = new NotificationService(channel, EXCHANGE);

    async function check() {
      console.log("checking");
      const updates = await notificationService.checkUpdates();

      for (const { userId, premiereId } of updates) {
        console.log("send for user", userId, "and movie", premiereId);
        notificationService.publish({ userId, premiereId });
        await prisma.subscription.deleteMany({
          where: { userId, premiereId },
        });
      }
    }

    check();

    // раз в сутки, в 12 часов
    cron.schedule("0 12 * * *", check);
  });
