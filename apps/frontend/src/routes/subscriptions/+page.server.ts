import { SubscriptionService } from '$lib/server/services/subscription.service';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const subscriptionService = new SubscriptionService(locals.pb);

	return {
		subscriptions: structuredClone(await subscriptionService.getSubscriptionList())
	};
}) satisfies PageServerLoad;
