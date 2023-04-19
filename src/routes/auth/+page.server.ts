import { setTokenCookie } from '$lib/server/httpUtils/set-token-cookie.js';
import authService from '$lib/server/services/auth.service.js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		const result = await authService.login(email, password);
		setTokenCookie(cookies, result.token);

		return result;
	},

	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		const result = await authService.register(email, password);
		setTokenCookie(cookies, result.token);

		return result;
	}
} satisfies Actions;
