import type { PrismaClient, Subscription } from 'database';
import prismaClient from '../prisma-client';

export class SubscriptionService {
	constructor(private prismaClient: PrismaClient) {}

	public async subscribe(userId: string, kinopoiskId: number): Promise<Subscription> {
		return this.prismaClient.subscription.create({
			data: { userId, kinopoiskId }
		});
	}

	public async unsubscribe(userId: string, kinopoiskId: number) {
		const subscription = await this.prismaClient.subscription.findFirst({
			where: {
				userId,
				kinopoiskId
			}
		});

		if (subscription) {
			return await prismaClient.subscription.delete({
				where: {
					id: subscription.id
				}
			});
		}
	}
}

export default new SubscriptionService(prismaClient);
