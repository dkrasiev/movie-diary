import { env } from '$env/dynamic/private';
import type { Month, Movie, PremierResponseItem } from '@dkrasiev/movie-diary-core';
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
	public async getMovie(movieId: number): Promise<Movie | undefined> {
		return this.api
			.get<Movie>(`api/v2.2/films/${movieId}`)
			.then((response) => response.data)
			.catch(() => undefined);
	}

	@RedisCache({
		prefix: 'premieres'
	})
	public async getPremieres(year: number, month: Month): Promise<PremierResponseItem[]> {
		return this.api
			.get<{ total: number; items: PremierResponseItem[] }>(`api/v2.2/films/premieres`, {
				params: {
					year,
					month
				}
			})
			.then((response) => response.data.items)
			.catch(() => []);
	}
}

export default new KinopoiskApiService(env.KINOPOISK_API_TOKEN);
