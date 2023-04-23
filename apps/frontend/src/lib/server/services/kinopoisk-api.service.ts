import { KINOPOISK_API_TOKEN } from '$env/static/private';
import type { Distribution, Month, Movie, PremierResponseItem } from '@dkrasiev/movie-diary-core';
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

	public async getPremiereDateRu(kinopoiskId: number): Promise<string | undefined> {
		return this.getDestributionInfo(kinopoiskId)
			.then((distributions) =>
				distributions.filter(
					({ type, country }) =>
						country?.country === 'Россия' && (type === 'PREMIERE' || type === 'COUNTRY_SPECIFIC')
				)
			)
			.then((distributions) => distributions[0].date)
			.catch(() => undefined);
	}

	private async getDestributionInfo(kinopoiskId: number): Promise<Distribution[]> {
		return this.api
			.get<{ total: number; items: Distribution[] }>(`api/v2.2/films/${kinopoiskId}/distributions`)
			.then((response) => response.data.items)
			.catch(() => []);
	}
}

export default new KinopoiskApiService(KINOPOISK_API_TOKEN);
