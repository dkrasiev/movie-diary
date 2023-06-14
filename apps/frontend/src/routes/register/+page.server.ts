import authService from '$lib/server/services/auth.service.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		try {
			const result = await authService.register(event);
			if (result?.data.errors) {
				return result.data;
			}

			throw redirect(303, '/login');
		} catch (e) {
			// TODO: fix typing error
			if (String(e?.status).startsWith('3')) {
				throw e;
			}

			console.error(e);
			return fail(500, { errors: { error: 'Неизвестная ошибка' } });
		}
	}
};
