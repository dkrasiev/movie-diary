import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import subscriptionService from '$lib/server/services/subscription.service';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Movie } from '@dkrasiev/movie-diary-core';

export const load = (async ({ locals }) => {
	const user = locals.user;

	if (!user) {
		throw redirect(302, '/');
	}

	const movies = await subscriptionService
		.getSubscriptions(user.id)
		.then((subscriptions) => subscriptions.map((subscription) => subscription.kinopoiskId))
		.then((kinopoiskIds) =>
			Promise.all(kinopoiskIds.map((kinopoiskId) => kinopoiskApiService.getMovie(kinopoiskId)))
		)
		.then((movies) => movies.filter(Boolean) as Movie[]);

	return { movies };
}) satisfies PageServerLoad;
