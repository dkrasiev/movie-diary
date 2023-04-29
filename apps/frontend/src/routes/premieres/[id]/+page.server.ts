import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import { PremiereService } from '$lib/server/services/premiere.service';
import { SubscriptionService } from '$lib/server/services/subscription.service';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const premiereId = params.id;

	const premiereService = new PremiereService(kinopoiskApiService, locals.pb);

	const premiere = structuredClone(await premiereService.getPremiere(premiereId));
	const subscription = premiere.expand?.['subscriptions(premiere)']?.[0];

	return {
		premiere: premiere,
		subscription: subscription
	};
}) satisfies PageServerLoad;

export const actions = {
	subscribe: async ({ params, locals }) => {
		const premiereId = params.id;

		const subscriptionService = new SubscriptionService(locals.pb);
		await subscriptionService.subscribe(premiereId);

		return {
			subscribeSucces: true
		};
	},

	unsubscribe: async ({ params, locals }) => {
		const premiereId = params.id;

		const subscriptionService = new SubscriptionService(locals.pb);
		await subscriptionService.unsubscribe(premiereId);

		return {
			unsubscribeSucces: true
		};
	}
} satisfies Actions;
