import prisma from '$lib/server/prisma';
import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import subscriptionService from '$lib/server/services/subscription.service';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import dayjs from 'dayjs';

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

	const premiereRu = await kinopoiskApiService.getPremiereDateRu(movie.kinopoiskId);
	const diff = Math.floor(dayjs().diff(premiereRu) / (3600 * 1000 * 24)) * -1;

	return {
		movie,
		subscription: await prisma.subscription.findFirst({
			where: {
				userId: user?.id,
				kinopoiskId: movie.kinopoiskId
			}
		}),
		premiereRu,
		diff
	};
}) satisfies PageServerLoad;

export const actions = {
	subscribe: async ({ params, locals }) => {
		const user = locals.user;
		const movie = await kinopoiskApiService.getMovie(Number(params.id));

		if (user && movie) {
			const premiereRu = await kinopoiskApiService.getPremiereDateRu(movie.kinopoiskId);
			if (premiereRu) {
				await subscriptionService.subscribe(user.id, movie.kinopoiskId, premiereRu);
			}
		}
	},

	unsubscribe: async ({ params, locals }) => {
		const user = locals.user;
		const movie = await kinopoiskApiService.getMovie(Number(params.id));

		if (user && movie) {
			await subscriptionService.unsubscribe(user.id, movie.kinopoiskId);
		}
	}
} satisfies Actions;
