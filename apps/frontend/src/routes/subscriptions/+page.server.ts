import { SubscriptionService } from '$lib/server/services/subscription.service';

export async function load({ locals }) {
	const subscriptionService = new SubscriptionService(locals.pb);

	return {
		subscriptions: structuredClone(await subscriptionService.getSubscriptionList())
	};
}
