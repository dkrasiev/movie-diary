<script lang="ts">
	import MovieCard from '../MovieCard.svelte';
	import { fetchPremieres } from '$lib/client/fetch-premieres';
	import { Month, getMonthById } from '$lib/models/month';
	import type { MovieShort } from '$lib/models/movie';

	let year: number = new Date().getFullYear();
	let month: Month = getMonthById(new Date().getMonth()) || Month.JANUARY;

	let premieres: Promise<MovieShort[]> = new Promise<MovieShort[]>((resolve) => resolve([]));

	function search() {
		premieres = fetchPremieres(year, month);
	}
</script>

<form>
	<input type="number" bind:value={year} />
	<select bind:value={month}>
		{#each Object.values(Month) as month}
			<option value={month}>{month}</option>
		{/each}
	</select>
	<button on:click|preventDefault={search}>Fetch</button>
</form>

{#await premieres}
	<h1>Loading...</h1>
{:then movies}
	<div class="grid gap-4">
		{#each movies as movie (movie.kinopoiskId)}
			<MovieCard {movie} />
		{/each}
	</div>
{:catch}
	<h1>Error</h1>
{/await}

<style>
	div {
		grid-template-columns: repeat(auto-fill, minmax(16rem, auto));
	}
</style>
