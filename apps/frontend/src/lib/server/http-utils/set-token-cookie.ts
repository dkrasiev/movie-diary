import type { Cookies } from '@sveltejs/kit';
import { USER_TOKEN_EXPIRE_TIME, USER_TOKEN_KEY } from '../constants';

export function setTokenCookie(cookies: Cookies, token: string) {
	cookies.set(USER_TOKEN_KEY, token, {
		maxAge: USER_TOKEN_EXPIRE_TIME,
		httpOnly: true,
		path: '/',
		secure: false,
	});
}
