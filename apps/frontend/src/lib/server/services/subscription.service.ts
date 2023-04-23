import type { PrismaClient, Subscription } from '@prisma/client';
import { prisma } from '../prisma';

export class SubscriptionService {
	constructor(private prisma: PrismaClient) {}

	public async getSubscriptions(userId: string): Promise<Subscription[]> {
		return this.prisma.subscription.findMany({ where: { userId } });
	}

	public async subscribe(
		userId: string,
		kinopoiskId: number,
		premiereRu: string
	): Promise<Subscription> {
		return this.prisma.subscription.create({
			data: { userId, kinopoiskId, premiereRu }
		});
	}

	public async unsubscribe(userId: string, kinopoiskId: number) {
		const subscription = await this.prisma.subscription.findFirst({
			where: {
				userId,
				kinopoiskId
			}
		});

		if (subscription) {
			return await prisma.subscription.delete({
				where: {
					id: subscription.id
				}
			});
		}
	}
}

export default new SubscriptionService(prisma);
