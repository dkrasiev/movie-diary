import type { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { UserDTO } from "../dtos/user-dto";
import prismaClient from "../prisma-client";
import { jsonResponse, unauthorizedResponse } from "../responses";
import tokenService from "./token.service";

class AuthService {
  constructor() {}

  public async register(email: string, password: string) {
    const candidate = await this.getUserByEmail(email);
    if (candidate) {
      return new Response("User already exists");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const user = await prismaClient.user.create({
      data: { email, password: hashPassword },
    });
    const userDto = new UserDTO(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refresh);

    return tokens;
  }

  public async login(email: string, password: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      return unauthorizedResponse();
    }

    if (bcrypt.compareSync(password, user.password) === false) {
      return unauthorizedResponse();
    }

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refresh);

    return tokens;
  }

  public async refresh(email: string, refreshToken: string) {
    const user = await this.getUserByEmail(email);
    const token = await prismaClient.token.findUnique({
      where: { userId: user?.id },
    });

    if (!user || !token) {
      return unauthorizedResponse();
    }

    if (refreshToken !== token.token) {
      return unauthorizedResponse();
    }

    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refresh);

    return jsonResponse(tokens);
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    return prismaClient.user.findUnique({ where: { email } });
  }
}

export default new AuthService();
