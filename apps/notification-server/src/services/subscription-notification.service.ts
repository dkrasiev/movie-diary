import {
  Collections,
  ExpandedSubscriptionResponse,
  PremierUpdateDTO,
} from "@dkrasiev/movie-diary-core";
import { Channel } from "amqplib";
import dayjs from "dayjs";
import PocketBase from "pocketbase";

export class SubscriptionNotificationService {
  constructor(
    private channel: Channel,
    private exchange: string,
    private pocketbase: PocketBase
  ) {}

  public async publishSubscriptionsWithReleasedPremiere() {
    for (const subscription of await this.getSubscriptionsWithReleasedPremiere()) {
      await this.publish(subscription);
    }
  }

  private async getSubscriptionsWithReleasedPremiere() {
    return this.pocketbase
      .collection(Collections.Subscriptions)
      .getFullList<ExpandedSubscriptionResponse>({
        filter: `premiere.premiereRu <= '${dayjs().format("YYYY-MM-DD")}'`,
        expand: "user,premiere.movie",
      });
  }

  private async publish(
    subscription: PremierUpdateDTO,
    routingKey: string = ""
  ) {
    console.log(
      "publishing",
      subscription.premiere,
      "for user",
      subscription.user
    );

    this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(subscription))
    );
    await this.pocketbase
      .collection(Collections.Subscriptions)
      .delete(subscription.id);
  }
}
