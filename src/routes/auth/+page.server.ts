import { setTokenCookie } from '$lib/server/httpUtils/set-token-cookie.js';
import authService from '$lib/server/services/auth.service.js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import { HttpError } from '$lib/server/httpUtils/http-error.js';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		try {
			const { token } = await authService.login(email, password);
			setTokenCookie(cookies, token);

			return { ok: true, result: 'Login completed successfully' };
		} catch (e) {
			if (e instanceof HttpError) {
				return { error: { status: e.status, data: e.data } };
			}
		}
	},

	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		try {
			const { user, token } = await authService.register(email, password);
			setTokenCookie(cookies, token);

			return { user };
		} catch (e) {
			if (e instanceof HttpError) {
				return { error: { status: e.status, data: e.data } };
			}
		}
	}
} satisfies Actions;
