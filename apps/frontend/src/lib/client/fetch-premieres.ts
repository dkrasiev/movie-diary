import type { Month } from '@dkrasiev/movie-diary-core';
import type { Premiere } from '@prisma/client';

export async function fetchPremieres(year: number, month: Month): Promise<Premiere[]> {
	return fetch(
		'/api/movies/premieres?' + new URLSearchParams({ year: String(year), month: String(month) })
	).then((response) => response.json() as Promise<Premiere[]>);
}
