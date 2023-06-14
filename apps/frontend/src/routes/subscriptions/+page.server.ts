import { SubscriptionService } from '$lib/server/services/subscription.service';

export async function load({ locals }) {
	const subscriptionService = new SubscriptionService(locals.pb);
	const subscriptions = await subscriptionService.getSubscriptionList();

	return {
		subscriptions: structuredClone(subscriptions)
	};
}
