import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const movieId = Number(params.id);

	if (!movieId) {
		throw error(400, 'Bad Request');
	}

	return {
		movie: await kinopoiskApiService.getMovie(movieId)
	};
}) satisfies PageServerLoad;
