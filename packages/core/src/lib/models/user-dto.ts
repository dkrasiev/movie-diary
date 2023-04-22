import type { User } from "@prisma/client";

export interface UserDTO {
  id: string;
  email: string;
  activated: boolean;
}

export function convertUserToDTO(user: User): UserDTO {
  const { id, email, activated } = user;

  return {
    id,
    email,
    activated,
  };
}

export function isUserDTO(obj: any): obj is UserDTO {
  return (
    typeof obj === "object" &&
    typeof obj.id === "string" &&
    typeof obj.email === "string" &&
    typeof obj.activated === "boolean"
  );
}
