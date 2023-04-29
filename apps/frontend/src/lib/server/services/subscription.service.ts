import {
	Collections,
	type ExpandedPremiereResponse,
	type SubscriptionsResponse
} from '@dkrasiev/movie-diary-core';
import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

type Texpand = {
	premiere: ExpandedPremiereResponse;
};

export class SubscriptionService {
	private userId?: string;
	private subscriptions: RecordService;

	constructor(private pb: PocketBase) {
		this.userId = this.pb.authStore.model?.id;
		this.subscriptions = this.pb.collection(Collections.Subscriptions);
	}

	public async getSubscriptionList(): Promise<SubscriptionsResponse<Texpand>[]> {
		return this.subscriptions
			.getFullList<SubscriptionsResponse<Texpand>>({
				filter: `user = '${this.userId}'`,
				expand: 'premiere.movie'
			})
			.catch(() => []);
	}

	public async getSubscription(premiereId: string): Promise<SubscriptionsResponse | undefined> {
		return this.subscriptions
			.getFirstListItem<SubscriptionsResponse>(
				`user = '${this.userId}' && premiere = '${premiereId}'`
			)
			.catch(() => undefined);
	}

	public async subscribe(premiereId: string) {
		return this.subscriptions.create<SubscriptionsResponse>({
			user: this.pb.authStore.model?.id,
			premiere: premiereId
		});
	}

	public async unsubscribe(premiereId: string) {
		const subscription = await this.pb
			.collection(Collections.Subscriptions)
			.getFirstListItem(`premiere = '${premiereId}'`);

		if (subscription) {
			return this.subscriptions.delete(subscription.id);
		}
	}
}
