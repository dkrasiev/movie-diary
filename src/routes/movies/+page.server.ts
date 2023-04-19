import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (() => {
	throw redirect(307, '/movies/premieres');
}) satisfies PageServerLoad;
