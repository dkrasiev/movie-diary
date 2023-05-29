(await import("dotenv")).config();
import {
  MoviesProductionStatusOptions,
  PremierUpdateDTO,
} from "@dkrasiev/movie-diary-core";
import Mail from "nodemailer/lib/mailer";

export class MailService {
  constructor(private transport: Mail) {}

  public async sendNotification(data: PremierUpdateDTO) {
    const email = data.expand?.user.email;
    const movie = data.expand?.premiere.expand?.movie;

    if (!email) {
      throw new Error("Email not found", { cause: data });
    }

    if (!movie) {
      throw new Error("Movie not found", { cause: data });
    }

    const movieName = movie.nameRu || movie.nameEn || movie.nameOriginal;
    if (!movieName) {
      throw new Error("Movie name not found", { cause: data });
    }

    const html = this.generateHtml(movieName);
    await this.sendMail(
      email,
      html,
      `Movie Diary. Уведомление о выходе фильма "${movieName}"`
    );
  }

  private generateHtml(movieName: string): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        <main>
          <h1>
            Премьера "${movieName}"!
          </h1>
          <p>
            Мы рады сообщить Вам о выходе новой премьеры в кинотеатрах!
            "${movieName}" можно будет увидеть на больших экранах уже с этой недели.
          </p>
          <p>Билеты уже в продаже!</p>
          <p>С уважением,<br />Команда Movie Diary.</p>
        </main>
      </body>
    </html>    
    `;
  }

  private async sendMail(to: string, html: string, subject = "Movie Diary") {
    return this.transport.sendMail({
      to,
      html,
      subject,
    });
  }
}
