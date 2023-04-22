import { USER_TOKEN_KEY } from '$lib/server/constants';
import { setTokenCookie } from '$lib/server/httpUtils/set-token-cookie';
import authService from '$lib/server/services/auth.service';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const token = event.cookies.get(USER_TOKEN_KEY);

	if (token) {
		const result = await authService.refresh(token).catch(() => undefined);

		if (result) {
			setTokenCookie(event.cookies, result.token);
			event.locals.user = result.user;
		}
	}

	return resolve(event);
}) satisfies Handle;
