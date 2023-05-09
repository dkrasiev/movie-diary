import amqplib from "amqplib";
import * as cron from "node-cron";
import pocketbaseClient from "./pocketbase-client.js";
import { SubscriptionNotificationService } from "./services/subscription-notification.service.js";

const EXCHANGE = "subscription_updates";

const channel = await amqplib
  .connect("amqp://localhost")
  .then((connection) => connection.createChannel());

const subscriptionNotificationService = new SubscriptionNotificationService(
  channel,
  EXCHANGE,
  pocketbaseClient
);

// раз в сутки, в 08:00 часов
cron.schedule("0 8 * * *", () =>
  subscriptionNotificationService.publishSubscriptionsWithReleasedPremiere()
);
