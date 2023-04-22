import notificationService from "./services/notification.service.js";

// TODO: cron выржение, проверяющее обновлений фильмов и отправляющее сообщение в обменник (ориентировочно раз в сутки)

const updates = await notificationService.checkUpdates();

for (const [user, movie] of updates.entries()) {
  console.log(user.email);
  console.log(movie.nameRu);

  notificationService.publish({ email: user.email, movie });
}
