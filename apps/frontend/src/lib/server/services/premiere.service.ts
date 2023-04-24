import type { Month } from '@dkrasiev/movie-diary-core';
import type { Premiere } from '@prisma/client';
import prisma from '../prisma';
import type { KinopoiskApiService } from './kinopoisk-api.service';
import kinopoiskApiService from './kinopoisk-api.service';

export class PremiereService {
	constructor(private kinopoiskApiService: KinopoiskApiService) {}

	public async getPremiere(premiereId: number): Promise<Premiere | null> {
		return this.kinopoiskApiService
			.getMovie(premiereId)
			.then((premiere) => prisma.premiere.findUnique({ where: { id: premiere?.kinopoiskId } }));
	}

	public async getPremieres(year: number, month: Month): Promise<Premiere[]> {
		return this.kinopoiskApiService
			.getPremieres(year, month)
			.then((premieres) =>
				Promise.all(
					premieres.map((premiere) =>
						prisma.premiere.upsert({
							where: { id: premiere.kinopoiskId },
							update: {},
							create: {
								id: premiere.kinopoiskId,
								premiereRu: premiere.premiereRu,
								nameEn: premiere.nameEn,
								nameRu: premiere.nameRu,
								duration: premiere.duration,
								posterUrl: premiere.posterUrl,
								posterUrlPreview: premiere.posterUrlPreview,

								year,
								month: String(month)
							}
						})
					)
				)
			)
			.catch(() => []);
	}
}

export default new PremiereService(kinopoiskApiService);
