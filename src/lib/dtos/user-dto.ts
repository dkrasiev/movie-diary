import type { User } from "@prisma/client";

export class UserDTO {
  id;
  email;
  activated;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.activated = user.activated;
  }
}
