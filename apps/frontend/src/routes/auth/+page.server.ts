import { USER_TOKEN_KEY } from '$lib/server/constants.js';
import { HttpError } from '$lib/server/http-utils/http-error.js';
import { setTokenCookie } from '$lib/server/http-utils/set-token-cookie.js';
import authService from '$lib/server/services/auth.service.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types.js';

async function getUserCredsFromRequest(
	request: Request
): Promise<{ email?: string; password?: string }> {
	const data = await request.formData();
	const email = data.get('email')?.toString();
	const password = data.get('password')?.toString();

	return { email, password };
}

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions = {
	login: async ({ request, cookies }) => {
		const { email, password } = await getUserCredsFromRequest(request);

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		try {
			const { token } = await authService.login(email, password);
			setTokenCookie(cookies, token);
			throw redirect(302, '/auth');
		} catch (e) {
			if (e instanceof HttpError) {
				return { error: { status: e.status, data: e.data } };
			}

			throw e;
		}
	},

	register: async ({ request, cookies }) => {
		const { email, password } = await getUserCredsFromRequest(request);

		if (!email || !password) {
			return fail(400, { missing: true });
		}

		try {
			const { token } = await authService.register(email, password);
			setTokenCookie(cookies, token);
			throw redirect(302, '/auth');
		} catch (e) {
			if (e instanceof HttpError) {
				return { error: { status: e.status, data: e.data } };
			}

			throw e;
		}
	},

	logout: async ({ cookies }) => {
		cookies.delete(USER_TOKEN_KEY);
		throw redirect(302, '/auth');
	}
} satisfies Actions;
