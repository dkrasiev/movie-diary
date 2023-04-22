<script lang="ts">
	import type { Movie } from '@movie-diary/core';
	import type { PageServerData, ActionData } from './$types';

	export let data: PageServerData;

	let movie: Movie | undefined = data.movie;
	let name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal;
</script>

<h1>{name}</h1>

{movie?.premiereRu}

<!-- {#if } -->
<form method="post">
	<button>{!data.subscription ? 'subscribe' : 'unsubscribe'}</button>
</form>

<br />

<pre>{JSON.stringify(data.subscription, undefined, 2)}</pre>

<br />

<pre>{JSON.stringify(movie, undefined, 2)}</pre>
