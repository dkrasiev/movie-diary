import { getMonthById, isMonth } from '@dkrasiev/movie-diary-core';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import premiereService from '$lib/server/services/premiere.service';

export const GET = (async ({ url }) => {
	const year = Number(url.searchParams.get('year') ?? new Date().getFullYear());
	const month = url.searchParams.get('month') ?? getMonthById(new Date().getMonth());
	if (!year || !isMonth(month)) {
		throw error(400, 'Bad Request');
	}

	return json(await premiereService.getPremieres(year, month));
}) satisfies RequestHandler;
