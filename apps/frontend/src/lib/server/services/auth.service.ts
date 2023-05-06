import { Collections, type PocketbaseErrorData } from '@dkrasiev/movie-diary-core';
import { error, type RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export class AuthService {
	public async login({ request, locals }: RequestEvent) {
		const data = Object.fromEntries(await request.formData());
		const { identity, password } = data;

		if (typeof identity !== 'string' || typeof password !== 'string') {
			return fail(400, {
				errors: { auth: 'Неправильная почта/имя пользователя или пароль.' }
			});
		}

		try {
			await locals.pb.collection(Collections.Users).authWithPassword(identity, password);

			if (locals.pb.authStore.model?.verified === false) {
				locals.pb.authStore.clear();
				return fail(400, {
					errors: {
						auth: 'Аккаунт не подтвержден. Пожалуйста, проверьте свою почту.'
					},
					data
				});
			}
		} catch (e) {
			if (e instanceof ClientResponseError) {
				if (e.status.toString().startsWith('4')) {
					return fail(400, {
						errors: {
							'Ошибка авторизации': 'Неверный логин или пароль'
						},
						data
					});
				}
			}

			throw error(500, 'Что-то пошло не так.');
		}
	}

	public async register({ request, locals }: RequestEvent) {
		const data = Object.fromEntries(await request.formData());
		const { username, email, password, passwordConfirm } = data;

		if (typeof email !== 'string') {
			return fail(400, {
				errors: {
					email: 'Неверный формат почты.'
				},
				data
			});
		}

		try {
			await locals.pb
				.collection(Collections.Users)
				.create({ username, email, password, passwordConfirm });
			await locals.pb.collection(Collections.Users).requestVerification(email);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				return fail(400, {
					errors: Object.entries(e.data.data as PocketbaseErrorData).reduce(
						(errors, [key, { message }]) => ({ ...errors, [key]: message }),
						{}
					),
					data
				});
			}

			throw error(500, 'Что-то пошло не так.');
		}
	}
}

export default new AuthService();
