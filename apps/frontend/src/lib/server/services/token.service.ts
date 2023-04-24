import { env } from '$env/dynamic/private';
import type { UserDTO } from '@dkrasiev/movie-diary-core';
import type { Token } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { USER_TOKEN_EXPIRE_TIME } from '../constants.js';
import prisma from '../prisma.js';

class TokenService {
	constructor(private refreshSecret: string) {}

	public saveUserToken(userId: string, token: string): Promise<Token> {
		return prisma.token.upsert({
			create: {
				userId,
				token
			},
			update: {
				token
			},
			where: {
				userId
			}
		});
	}

	public generateUserToken(payload: UserDTO) {
		return jwt.sign(payload, this.refreshSecret, {
			expiresIn: USER_TOKEN_EXPIRE_TIME
		});
	}

	public verifyUserToken(token: string): boolean {
		try {
			const result = jwt.verify(token, env.USER_TOKEN_SECRET);
			return Boolean(result);
		} catch (e) {
			return false;
		}
	}
}

export default new TokenService(env.USER_TOKEN_SECRET);
