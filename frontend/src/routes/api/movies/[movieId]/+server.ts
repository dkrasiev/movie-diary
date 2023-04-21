import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../[movieId]/$types';

export const GET = (async ({ params }) => {
	const movieId = Number(params.movieId);

	if (!movieId) {
		throw error(400, 'Bad Request');
	}

	const movie = await kinopoiskApiService.getMovie(movieId);

	return json(movie);
}) satisfies RequestHandler;
