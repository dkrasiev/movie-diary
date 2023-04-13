import jwt from "jsonwebtoken";
import prismaClient from "../prisma-client";

class TokenService {
  constructor(private accessSecret: string, private refreshSecret: string) {}

  public saveToken(userId: string, token: string) {
    return prismaClient.token.upsert({
      create: {
        token,
        userId,
      },
      update: {
        token,
      },
      where: {
        userId,
      },
    });
  }

  public generateTokens(payload: object) {
    const access = this.generateAccessToken(payload);
    const refresh = this.generateRefreshToken(payload);

    return { access, refresh };
  }

  private generateAccessToken(payload: object) {
    return jwt.sign(payload, this.accessSecret, { expiresIn: "30m" });
  }

  private generateRefreshToken(payload: object) {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: "30d" });
  }
}

export default new TokenService(
  import.meta.env.JWT_ACCESS_KEY,
  import.meta.env.JWT_REFRESH_KEY
);
