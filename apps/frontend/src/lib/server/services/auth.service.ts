import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import tokenService from './token.service';
import { convertUserToDTO } from '@dkrasiev/movie-diary-core';
import { conflictResponse, notFoundResponse, unauthorizedResponse } from '../http-utils/responses';
import { v4, v5 } from 'uuid';
import prisma from '../prisma';

class AuthService {
	public async activate(activationLink: string) {
		const user = await this.getUserByActivationLink(activationLink);
		if (!user) {
			throw notFoundResponse();
		}

		return this.generateAndSaveUserTokens(user);
	}

	public async register(email: string, password: string) {
		const candidate = await this.getUserByEmail(email);
		if (candidate) {
			throw conflictResponse('User already exists');
		}

		const user = await this.createUser(email, password);
		prisma.user.update({
			data: {
				activationLink: v4()
			},
			where: { id: user.id }
		});
	}

	public async login(email: string, password: string) {
		const user = await this.getUserByEmail(email);
		if (!user || (await this.validateUserByPassword(user, password)) === false) {
			throw unauthorizedResponse();
		}

		return this.generateAndSaveUserTokens(user);
	}

	public async refresh(token: string) {
		const user = await this.getUserByToken(token);
		if (!user || (await this.validateUserByToken(user, token)) === false) {
			throw unauthorizedResponse();
		}

		return this.generateAndSaveUserTokens(user);
	}

	public async logout(token: string) {
		return prisma.token.delete({ where: { token } });
	}

	private async generateAndSaveUserTokens(user: User) {
		const userDto = convertUserToDTO(user);
		const token = tokenService.generateUserToken({ ...userDto });
		await tokenService.saveUserToken(user.id, token);

		return { token, user: userDto };
	}

	private async createUser(email: string, password: string): Promise<User> {
		return prisma.user.create({
			data: { email, password: await bcrypt.hash(password, 10) }
		});
	}

	private async getUserByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({ where: { email } });
	}

	private async getUserByActivationLink(activationLink: string): Promise<User | null> {
		return prisma.user.findUnique({ where: { activationLink } });
	}

	private async getUserByToken(token: string): Promise<User | null> {
		return prisma.token.findUnique({ where: { token } }).user();
	}

	private async validateUserByPassword(user: User, password: string): Promise<boolean> {
		return bcrypt.compare(password, user.password);
	}

	private async validateUserByToken(user: User, token: string): Promise<boolean> {
		const userToken = await prisma.token
			.findUnique({
				where: { userId: user.id }
			})
			.then((token) => token?.token);

		return (
			typeof userToken === 'string' && userToken === token && tokenService.verifyUserToken(token)
		);
	}
}

export default new AuthService();
