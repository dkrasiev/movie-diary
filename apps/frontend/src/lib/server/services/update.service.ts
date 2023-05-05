import {
	Collections,
	type ExpandedPremiereResponse,
	type Month,
	type MoviesResponse
} from '@dkrasiev/movie-diary-core';
import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';
import { rootPb } from '../admin-pocketbase';
import type { KinopoiskApiService } from './kinopoisk-api.service';
import kinopoiskApiService from './kinopoisk-api.service';

export class PremierUpdateService {
	private premieres: RecordService;
	private movies: RecordService;

	constructor(private kinopoiskApiService: KinopoiskApiService, private pb: PocketBase) {
		this.premieres = this.pb.collection(Collections.Premieres);
		this.movies = this.pb.collection(Collections.Movies);
	}

	public async updatePremieres(year: number, month: Month) {
		const premieres = await this.kinopoiskApiService.getPremieres(year, month);
		const premieresFromDb = await this.getPremieresWithMovie(year, month);

		const idsFromDb = premieresFromDb.map((premiere) => premiere.expand?.movie?.kinopoiskId);
		const notInDb = premieres.filter(
			(premiere) => idsFromDb.includes(premiere.kinopoiskId) === false
		);

		if (notInDb.length > 0) {
			console.warn('not in database', notInDb);
		}

		for (const premiere of notInDb) {
			await this.createPremiere(premiere.kinopoiskId, premiere.premiereRu, year, month);
		}
	}

	private async createPremiere(
		kinopoiskId: number,
		premiereRu: string,
		year: number,
		month: Month
	) {
		const movie = await this.getOrCreateMovie(kinopoiskId);
		if (movie) {
			return this.premieres.create({ movie: movie.id, premiereRu, year, month });
		}
	}

	private async getPremieresWithMovie(
		year: number,
		month: Month
	): Promise<ExpandedPremiereResponse[]> {
		return this.premieres.getFullList({
			filter: `year = ${year} && month = '${month}'`,
			expand: 'movie'
		});
	}

	private async getOrCreateMovie(kinopoiskId: number) {
		return (await this.getMovie(kinopoiskId)) || (await this.createMovie(kinopoiskId));
	}

	private async getMovie(kinopoiskId: number): Promise<MoviesResponse | undefined> {
		return this.movies
			.getFirstListItem<MoviesResponse>(`kinopoiskId = ${kinopoiskId}`)
			.catch(() => undefined);
	}

	private async createMovie(kinopoiskId: number): Promise<MoviesResponse | undefined> {
		const movie = await this.kinopoiskApiService.getMovie(kinopoiskId);

		if (movie) {
			return this.movies.create<MoviesResponse>(movie);
		}
	}
}

export default new PremierUpdateService(kinopoiskApiService, rootPb);
