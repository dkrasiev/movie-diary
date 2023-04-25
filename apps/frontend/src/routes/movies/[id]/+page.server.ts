import premiereService from '$lib/server/services/premiere.service';
import subscriptionService from '$lib/server/services/subscription.service';
import { error, redirect } from '@sveltejs/kit';
import type { Premiere, Subscription } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const userId = locals.user?.id;
	const premiereId = Number(params.id);

	const response: {
		premiere: Premiere | null;
		subscription: Subscription | null;
	} = {
		premiere: null,
		subscription: null
	};

	if (premiereId) {
		response.premiere = await premiereService.getPremiere(premiereId);
	}
	if (userId) {
		response.subscription = await subscriptionService.getSubscription(userId, premiereId);
	}

	return response;
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ params, locals, url }) => {
		const userId = locals.user?.id;
		const premiereId = Number(params.id);
		if (!userId || !premiereId) {
			throw error(400, 'Bad Request');
		}

		await subscriptionService.toggleSubscription(userId, premiereId);

		throw redirect(302, url.href);
	}
} satisfies Actions;
