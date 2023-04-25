import type { Subscription, Premiere } from '@prisma/client';
import prisma from '../prisma';

export class SubscriptionService {
	public async getUserPremieres(userId: string): Promise<Premiere[]> {
		return prisma.subscription
			.findMany({ where: { userId }, select: { premiere: true } })
			.then((results) => results.map((result) => result.premiere));
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
