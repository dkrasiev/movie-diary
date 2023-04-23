<script lang="ts">
	import type { Movie } from '@dkrasiev/movie-diary';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';

	export let data: PageServerData;

	let movie: Movie | undefined = data.movie;
	let name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal;
</script>

<h1>{name}</h1>
{#if data.diff && data.diff > 0}
	<h1>До релиза {data.diff} дней</h1>
{:else if data.diff}
	<h1>Вышел</h1>
{/if}

{#if data.premiereRu && $page.data.user}
	<form action="?/subscribe" method="post">
		{#if data.subscription}
			<button formaction="?/unsubscribe">unsubscribe</button>
		{:else if data.diff > 0}
			<button formaction="?/subscribe">subscribe</button>
		{/if}
	</form>
{/if}

<br />

<pre>{JSON.stringify(
		{ sub: data.subscription, premiereDateRu: data.premiereRu },
		undefined,
		2
	)}</pre>

<br />

<pre>{JSON.stringify(movie, undefined, 2)}</pre>
