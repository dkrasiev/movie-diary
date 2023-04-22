import { PrismaClient } from "@prisma/client";
import {
  MovieShort,
  PremierUpdateDTO,
  UserDTO,
  convertUserToDTO,
} from "@movie-diary/core";
import { Channel } from "amqplib";
import { EXCHANGE, channel } from "../lib/amqp.js";

const client = new PrismaClient();
await client.$connect();

export class NotificationService {
  constructor(private channel: Channel, private exchange: string) {}

  public async checkUpdates() {
    const updates = new Map<UserDTO, MovieShort>();
    const users = await client.user
      .findMany()
      .then((users) => users.map((user) => convertUserToDTO(user)));

    for (const user of users) {
      updates.set(user, {
        kinopoiskId: 301,
        nameEn: "The Matrix",
        posterUrl:
          "https://kinopoiskapiunofficial.tech/images/posters/kp/301.jpg",
        posterUrlPreview:
          "https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg",
        year: 1999,
        countries: [],
        duration: 123123,
        genres: [],
        nameRu: "Матрица",
        premiereRu: "2023-02-02",
      });
    }

    return updates;
  }

  public publish(payload: PremierUpdateDTO) {
    return this.channel.publish(
      this.exchange,
      "",
      Buffer.from(JSON.stringify(payload))
    );
  }
}

export default new NotificationService(channel, EXCHANGE);
