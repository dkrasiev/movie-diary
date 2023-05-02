import { KINOPOISK_API_TOKEN } from '$env/static/private';
import type { Film, Month, PremiereResponseItem } from '@dkrasiev/movie-diary-core';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { RedisCache } from '../redis-cache';

export class KinopoiskApiService {
	private api: AxiosInstance;

	constructor(token: string) {
		this.api = axios.create({
			baseURL: 'https://kinopoiskapiunofficial.tech',
			headers: {
				'X-API-KEY': token,
				'Content-Type': 'application/json'
			}
		});
	}

	@RedisCache({
		prefix: 'movie'
	})
	public async getMovie(movieId: number): Promise<Film | undefined> {
		return this.api
			.get<Film>(`api/v2.2/films/${movieId}`)
			.then((response) => response.data)
			.catch(() => undefined);
	}

	@RedisCache({
		prefix: 'premieres'
	})
	public async getPremieres(year: number, month: Month): Promise<PremiereResponseItem[]> {
		return this.api
			.get<{ total: number; items: PremiereResponseItem[] }>(`api/v2.2/films/premieres`, {
				params: {
					year,
					month
				}
			})
			.then((response) => response.data.items)
			.catch(() => []);
	}
}

export default new KinopoiskApiService(KINOPOISK_API_TOKEN);
