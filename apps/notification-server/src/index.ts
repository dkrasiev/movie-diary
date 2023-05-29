await import("dotenv/config.js");

import amqplib from "amqplib";
import * as cron from "node-cron";
import { pocketbase } from "./pocketbase-client.js";
import { SubscriptionNotificationService } from "./services/subscription-notification.service.js";

if (!process.env.RABBIT_URI) {
  throw new Error("RABBIT_URI not found");
}

const EXCHANGE = "subscription_updates";

console.log("connecting to", process.env.RABBIT_URI);
const channel = await amqplib
  .connect(process.env.RABBIT_URI)
  .then((connection) => connection.createChannel());

const subscriptionNotificationService = new SubscriptionNotificationService(
  channel,
  EXCHANGE,
  pocketbase
);

async function check() {
  const updatedSubscriptions =
    await subscriptionNotificationService.getUpdatedSubscriptions();
  console.log("updated subscriptions =>", updatedSubscriptions);

  for (const subscription of updatedSubscriptions) {
    await subscriptionNotificationService.publishSubscription(subscription);
  }
}

check();

// раз в сутки, в 08:00 часов
cron.schedule("0 8 * * *", check);
