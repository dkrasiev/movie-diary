import { POCKETBASE_URL } from '$env/static/private';
import { Collections } from '@dkrasiev/movie-diary-core';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import PocketBase from 'pocketbase';

const authenticateUser: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
		if (event.locals.pb.authStore.isValid && event.locals.pb.authStore.model?.verified) {
			await event.locals.pb.collection(Collections.Users).authRefresh();
			event.locals.user = structuredClone(event.locals.pb.authStore.model);
		}
	} catch (_) {
		// clear the auth store on failed refresh
		event.locals.pb.authStore.clear();
	}

	const response = await resolve(event);

	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: false
		})
	);

	return response;
};

const redirectRootToPremieres: Handle = ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		throw redirect(302, '/premieres');
	}

	return resolve(event);
};

const authGuardRoutes = ['/login', '/register'];
const redirectAuthUser: Handle = ({ event, resolve }) => {
	if (event.locals.user && authGuardRoutes.some((route) => event.url.pathname.startsWith(route))) {
		throw redirect(302, '/premieres');
	}

	return resolve(event);
};

const notAuthGuardRoutes = ['/subscriptions'];
const redirectNotAuthUser: Handle = ({ event, resolve }) => {
	if (
		!event.locals.user &&
		notAuthGuardRoutes.some((route) => event.url.pathname.startsWith(route))
	) {
		throw redirect(302, '/premieres');
	}

	return resolve(event);
};

export const handle = sequence(
	redirectRootToPremieres,
	authenticateUser,
	redirectAuthUser,
	redirectNotAuthUser
);
