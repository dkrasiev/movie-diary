<script lang="ts">
	import type { Premiere } from '@prisma/client';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const movie: Premiere | null = data.premiere;
	let name = movie?.nameRu || movie?.nameEn;
</script>

<h1>{name}</h1>

<pre>{JSON.stringify(movie, undefined, 2)}</pre>
