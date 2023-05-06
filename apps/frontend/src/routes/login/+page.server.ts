import authService from '$lib/server/services/auth.service.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const result = await authService.login(event);
		if (result?.data.errors) {
			return result.data;
		}

		throw redirect(303, '/login');
	}
};
