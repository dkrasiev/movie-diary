import prisma from '$lib/server/prisma';
import subscriptionService from '$lib/server/services/subscription.service';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const premiereId = Number(params.id);
	if (!premiereId) {
		throw error(400, 'Bad Request');
	}

	return {
		premiere: await prisma.premiere.findUnique({ where: { id: premiereId } })
	};
}) satisfies PageServerLoad;

export const actions = {
	subscribe: async ({ params, locals }) => {
		const user = locals.user;
		const premiereId = Number(params.id);
		if (!user || !premiereId) {
			return;
		}

		await subscriptionService.subscribeUserToPremiere(user.id, premiereId);
	},

	unsubscribe: async ({ params, locals }) => {
		const user = locals.user;
		const premiereId = Number(params.id);
		if (!user || !premiereId) {
			return;
		}

		await subscriptionService.unsubscribeUserFromPremiere(user.id, premiereId);
	}
} satisfies Actions;
