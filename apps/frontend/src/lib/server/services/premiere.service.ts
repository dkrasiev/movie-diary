import { Collections, type ExpandedPremiereResponse, type Month } from '@dkrasiev/movie-diary-core';
import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';
import type { KinopoiskApiService } from './kinopoisk-api.service';

export class PremiereService {
	private premieres: RecordService;
	private movies: RecordService;

	constructor(private kinopoiskApiService: KinopoiskApiService, private pb: PocketBase) {
		this.premieres = this.pb.collection(Collections.Premieres);
		this.movies = this.pb.collection(Collections.Movies);
	}

	public async getPremiere(premiereId: string): Promise<ExpandedPremiereResponse> {
		return this.premieres.getOne<ExpandedPremiereResponse>(String(premiereId), {
			expand: 'subscriptions(premiere),movie'
		});
	}

	public async getPremiereList(year: number, month: Month): Promise<ExpandedPremiereResponse[]> {
		const premiereList = await this.premieres
			.getFullList<ExpandedPremiereResponse>({
				filter: `year = ${year} && month = '${month}'`,
				expand: 'subscriptions(premiere),movie'
			})
			.catch(() => []);

		if (premiereList.length === 0) {
			await this.fillDb(year, month);
		} else {
			return premiereList;
		}

		return this.premieres.getFullList({
			filter: `year = ${year} && month = '${month}'`,
			expand: 'movie'
		});
	}

	private async fillDb(year: number, month: Month) {
		const premieresWithMovies = await this.getPremieresWithMovies(year, month);

		for (const { premiere, movie } of premieresWithMovies) {
			// добавить фильм в БД
			await this.movies
				.create({ ...movie })
				// получить фильм, если не удалось добавить (значить он уже есть в БД)
				.catch(() => this.movies.getFirstListItem(`kinopoiskId = ${premiere.kinopoiskId}`))
				// добавить премьеру в БД
				.then((movieResponse) =>
					this.premieres.create({
						premiereRu: premiere.premiereRu,
						movie: movieResponse.id,
						year,
						month
					})
				)
				.catch((e) => console.error(e));
		}
	}

	private async getPremieresWithMovies(year: number, month: Month) {
		return this.kinopoiskApiService
			.getPremieres(year, month)
			.then((premieres) =>
				Promise.all(
					premieres.map((premiere) =>
						this.kinopoiskApiService
							.getMovie(premiere.kinopoiskId)
							.then((movie) => ({ premiere, movie }))
					)
				)
			);
	}
}
