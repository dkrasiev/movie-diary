import { Collections } from '@dkrasiev/movie-diary-core';
import { error, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types.js';

export const actions = {
	default: async ({ request, locals }) => {
		const { identity, password } = Object.fromEntries(await request.formData());

		if (typeof identity !== 'string' || typeof password !== 'string') {
			throw error(400, 'Wrong email or password');
		}

		try {
			await locals.pb.collection(Collections.Users).authWithPassword(identity, password);

			if (locals.pb.authStore.model?.verified === false) {
				locals.pb.authStore.clear();
				return {
					errors: { auth: { message: 'Your account is not verified. Please, check your email' } }
				};
			}
		} catch (e) {
			console.error(e);

			if (e instanceof ClientResponseError) {
				if (e.status.toString().startsWith('4')) {
					return { errors: { auth: { message: 'Wrong username/email or password' } } };
				}

				return { errors: e.data.data };
			}

			throw error(500, 'Something went wrong');
		}

		throw redirect(302, '/');
	}
} satisfies Actions;
