import { KINOPOISK_API_TOKEN } from '$env/static/private';
import type { Month } from '$lib/models/month';
import type { Movie, MovieShort } from '$lib/models/movie';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { RedisCache } from '../redis/cache';

export class KinopoiskApiService {
	constructor(private api: AxiosInstance) {}

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
	public async getPremieres(year: number, month: Month): Promise<MovieShort[]> {
		return this.api
			.get<{ total: number; items: MovieShort[] }>(`api/v2.2/films/premieres`, {
				params: {
					year,
					month
				}
			})
			.then((response) => response.data.items)
			.catch(() => []);
	}
}

const kinopoiskApi = axios.create({
	baseURL: 'https://kinopoiskapiunofficial.tech',
	headers: {
		'X-API-KEY': KINOPOISK_API_TOKEN,
		'Content-Type': 'application/json'
	}
});

export default new KinopoiskApiService(kinopoiskApi);
