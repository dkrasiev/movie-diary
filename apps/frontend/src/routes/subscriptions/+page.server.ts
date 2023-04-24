import subscriptionService from '$lib/server/services/subscription.service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}

	return { userPremieres: await subscriptionService.getUserPremieres(locals.user.id) };
}) satisfies PageServerLoad;
