import { Channel } from "amqplib";
import { QUEUE, channel } from "../lib/amqp.js";

export class NotificationService {
  constructor(private channel: Channel, private queue: string) {}

  public checkUpdates() {
    // TODO: проверка на выход фильма
    throw new Error("not implemented");
  }

  public sendEmailMessage(data: { to: string; html: string }) {
    return this.send(data);
  }

  private send(data: any) {
    let payload: string =
      typeof data === "object" ? JSON.stringify(data) : String(data);

    return this.channel.sendToQueue(this.queue, Buffer.from(payload));
  }
}

export default new NotificationService(channel, QUEUE);
