import prismaClient from '$lib/server/prisma-client';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import kinopoiskApiService from '$lib/server/services/kinopoisk-api.service';

export const load = (async ({ locals }) => {
	const user = locals.user;

	if (!user) {
		throw redirect(302, '/');
	}

	const movies = await prismaClient.subscription
		.findMany({ where: { userId: user.id } })
		.then((subscriptions) => subscriptions.map((subscription) => subscription.kinopoiskId))
		.then((kinopoiskIds) =>
			Promise.all(kinopoiskIds.map((kinopoiskId) => kinopoiskApiService.getMovie(kinopoiskId)))
		);

	return { movies };
}) satisfies PageServerLoad;
