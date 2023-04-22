import prismaClient from '$lib/server/prisma-client';
import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import subscriptionService from '$lib/server/services/subscription.service';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const movieId = Number(params.id);

	if (!movieId) {
		throw error(400, 'Bad Request');
	}

	const movie = await kinopoiskApiService.getMovie(movieId);
	const user = locals.user;

	if (!movie) {
		return;
	}

	return {
		movie,
		subscription: await prismaClient.subscription.findFirst({
			where: {
				userId: user.id,
				kinopoiskId: movie.kinopoiskId
			}
		})
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ params, locals }) => {
		const user = locals.user;
		const movie = await kinopoiskApiService.getMovie(Number(params.id));

		if (user && movie) {
			const unsubscribed = await subscriptionService.unsubscribe(user.id, movie.kinopoiskId);
			if (unsubscribed) {
				return;
			}

			await subscriptionService.subscribe(user.id, movie.kinopoiskId);
			return;
		}
	}
} satisfies Actions;
