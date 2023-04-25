import subscriptionService from '$lib/server/services/subscription.service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, parent }) => {
	await parent();

	if (!locals.user?.id) {
		throw redirect(302, '/login');
	}

	return {
		userPremieres: await subscriptionService.getUserPremieres(locals.user?.id)
	};
}) satisfies PageServerLoad;
