import { Channel } from "amqplib";
import { EXCHANGE, channel } from "../lib/amqp.js";

export class NotificationService {
  constructor(private channel: Channel, private exchange: string) {}

  public checkUpdates() {
    // TODO: проверка на выход фильма
    throw new Error("not implemented");
  }

  public publish(data: any) {
    let payload: string =
      typeof data === "object" ? JSON.stringify(data) : String(data);

    return this.channel.publish(this.exchange, "", Buffer.from(payload));
  }
}

export default new NotificationService(channel, EXCHANGE);
