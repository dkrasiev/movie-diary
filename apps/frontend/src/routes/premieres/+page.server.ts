import premiereUpdateService from '$lib/server/services/premiere-update.service';
import { PremiereService } from '$lib/server/services/premiere.service.js';
import { getMonthById, isMonth } from '@dkrasiev/movie-diary-core';
import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
	const year = Number(url.searchParams.get('year'));
	const month = url.searchParams.get('month');

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

	await premiereUpdateService.udpatePremieres(year, month);

	const premiereService = new PremiereService(locals.pb);
	const premieres = await premiereService.getPremiereList(year, month);

	return {
		premieres: structuredClone(premieres),
		year,
		month
	};
}
