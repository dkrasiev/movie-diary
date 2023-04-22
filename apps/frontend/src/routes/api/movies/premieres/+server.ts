import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';
import { getMonthById, isMonth } from '@movie-diary/core';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const year = Number(url.searchParams.get('year') ?? new Date().getFullYear());
	const month = url.searchParams.get('month') ?? getMonthById(new Date().getMonth());

	if (!year || !isMonth(month)) {
		throw error(400, 'Bad Request');
	}

	const premieres = await kinopoiskApiService.getPremieres(year, month);

	return json(premieres);
}) satisfies RequestHandler;
