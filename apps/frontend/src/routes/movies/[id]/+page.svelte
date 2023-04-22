<script lang="ts">
	import type { Movie } from '@movie-diary/core';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let movie: Movie | undefined = data.movie;
	let name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal;
</script>

<h1>{name}</h1>

<pre>{JSON.stringify(movie, undefined, 2)}</pre>
