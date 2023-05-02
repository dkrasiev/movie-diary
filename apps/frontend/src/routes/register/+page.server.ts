import { Collections } from '@dkrasiev/movie-diary-core';
import { error, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const actions = {
	default: async ({ request, locals }) => {
		const { username, email, password, passwordConfirm } = Object.fromEntries(
			await request.formData()
		);

		if (typeof email !== 'string') {
			throw error(400, 'Wrong email');
		}

		try {
			await locals.pb
				.collection(Collections.Users)
				.create({ username, email, password, passwordConfirm });
			await locals.pb.collection(Collections.Users).requestVerification(email);
		} catch (e) {
			console.error(e);

			if (e instanceof ClientResponseError) {
				return { errors: e.data.data };
			}

			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};
