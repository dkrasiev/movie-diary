import { USER_TOKEN_SECRET } from '$env/static/private';
import type { Token } from '@prisma/client';
import jwt from 'jsonwebtoken';
import type { UserDTO } from '../../dtos/user-dto';
import { USER_TOKEN_EXPIRE_TIME } from '../constants';
import prismaClient from '../prisma-client';

class TokenService {
	constructor(private refreshSecret: string) {}

	public saveUserToken(userId: string, token: string): Promise<Token> {
		return prismaClient.token.upsert({
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
			const result = jwt.verify(token, USER_TOKEN_SECRET);
			return Boolean(result);
		} catch (e) {
			return false;
		}
	}
}

export default new TokenService(USER_TOKEN_SECRET);
