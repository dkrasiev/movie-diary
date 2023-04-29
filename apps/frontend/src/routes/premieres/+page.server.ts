import { PremiereService } from '$lib/server/services/premiere.service.js';
import { getMonthById, isMonth } from '@dkrasiev/movie-diary-core';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';

export const load = (async ({ url, locals }) => {
	const year = Number(url.searchParams.get('year'));
	const month = url.searchParams.get('month');

	const premiereService = new PremiereService(kinopoiskApiService, locals.pb);

	if (!year || !isMonth(month)) {
		throw redirect(
			302,
			url.pathname +
				'?' +
				new URLSearchParams({
					year: String(new Date().getFullYear()),
					month: String(getMonthById(new Date().getMonth()))
				})
		);
	}

	const premieres = await premiereService.getPremiereList(year, month);

	return {
		premieres: structuredClone(premieres),
		year,
		month
	};
}) satisfies PageServerLoad;
