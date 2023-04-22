import notificationService from "./services/notification.service.js";

notificationService.sendEmailMessage({
  to: "dmitrykrasiev@gmail.com",
  html: "<h1>test</h1>",
});
