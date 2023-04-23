import type { Month, MovieShort } from '@dkrasiev/movie-diary-core';

export async function fetchPremieres(year: number, month: Month): Promise<MovieShort[]> {
	const url =
		'/api/movies/premieres?' + new URLSearchParams({ year: String(year), month: String(month) });
	const response = await fetch(url);
	return await (response.json() as Promise<MovieShort[]>);
}
