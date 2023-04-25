import type { Premiere, Subscription } from '@prisma/client';
import prisma from '../prisma';

export class SubscriptionService {
	public async getUserPremieres(userId: string): Promise<Premiere[]> {
		return prisma.subscription
			.findMany({ where: { userId }, select: { premiere: true } })
			.then((results) => results.map((result) => result.premiere));
	}

	public async getSubscription(userId: string, premiereId: number): Promise<Subscription | null> {
		return prisma.subscription.findFirst({ where: { userId, premiereId } });
	}

	public async toggleSubscription(userId: string, premiereId: number) {
		const subscription = await prisma.subscription.findFirst({ where: { userId, premiereId } });

		if (subscription) {
			this.unsubscribeUserFromPremiere(userId, premiereId);
		} else {
			this.subscribeUserToPremiere(userId, premiereId);
		}
	}

	public async subscribeUserToPremiere(
		userId: string,
		premiereId: number
	): Promise<Subscription | undefined> {
		return prisma.premiere.findUnique({ where: { id: premiereId } }).then((premiere) => {
			if (premiere) {
				return prisma.subscription.create({ data: { userId, premiereId: premiere?.id } });
			}

			return undefined;
		});
	}

	public async unsubscribeUserFromPremiere(userId: string, premiereId: number) {
		const subscription = await prisma.subscription.findFirst({
			where: {
				premiereId,
				userId
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

export default new SubscriptionService();
