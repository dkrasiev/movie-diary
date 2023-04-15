import type { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { UserDTO } from "../dtos/user-dto";
import prismaClient from "../prisma-client";
import { unauthorizedResponse } from "../responses";
import tokenService from "./token.service";

class AuthService {
  constructor() {}

  public async register(email: string, password: string) {
    const candidate = await this.getUserByEmail(email);
    if (candidate) {
      throw new Response("User already exists", { status: 409 });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await prismaClient.user.create({
      data: { email, password: hashPassword },
    });

    return this.generateAndSaveUserTokens(user);
  }

  public async login(email: string, password: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      throw unauthorizedResponse();
    }

    if (bcrypt.compareSync(password, user.password) === false) {
      throw unauthorizedResponse();
    }

    return this.generateAndSaveUserTokens(user);
  }

  private async generateAndSaveUserTokens(user: User) {
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refresh);

    return tokens;
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findUnique({ where: { email } });
  }
}

export default new AuthService();
