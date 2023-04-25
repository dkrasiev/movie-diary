import { USER_TOKEN_KEY } from '$lib/server/constants';
import { setTokenCookie } from '$lib/server/http-utils/set-token-cookie';
import authService from '$lib/server/services/auth.service';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authenticateUser: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(USER_TOKEN_KEY);

	if (token) {
		const result = await authService.refresh(token).catch(() => undefined);

		if (result) {
			setTokenCookie(event.cookies, result.token);
		} else {
			event.cookies.delete(USER_TOKEN_KEY);
		}

		event.locals.user = result?.user;
	}

	return resolve(event);
};

const redirectRootToPremieres: Handle = ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		throw redirect(302, '/premieres');
	}

	return resolve(event);
};

export const handle = sequence(redirectRootToPremieres, authenticateUser);
