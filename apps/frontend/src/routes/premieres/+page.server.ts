import premiereService from '$lib/server/services/premiere.service.js';
import { isMonth } from '@dkrasiev/movie-diary-core';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
	const year = Number(url.searchParams.get('year'));
	const month = url.searchParams.get('month');

	if (!year || !isMonth(month)) {
		throw redirect(302, url.pathname + '?' + new URLSearchParams({ year: '2023', month: 'APRIL' }));
	}

	const premieres = await premiereService.getPremieres(year, month);

	return {
		premieres,
		year,
		month
	};
};
