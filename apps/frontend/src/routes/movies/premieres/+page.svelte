<script lang="ts">
	import { fetchPremieres } from '$lib/client/fetch-premieres';
	import MovieCard from '$lib/components/MovieCard.svelte';
	import MovieGrid from '$lib/components/MovieGrid.svelte';
	import { Month, getMonthById } from '@dkrasiev/movie-diary';

	let year: number = new Date().getFullYear();
	let month: Month = getMonthById(new Date().getMonth()) || Month.JANUARY;

	$: premieres = fetchPremieres(year, month);
</script>

<div>
	<input name="year" type="number" bind:value={year} />
	<select name="month" bind:value={month}>
		{#each Object.values(Month) as month}
			<option value={month}>{month}</option>
		{/each}
	</select>
</div>

{#await premieres}
	<h1>Loading...</h1>
{:then movies}
	{#if movies?.length}
		<h1>Premieres</h1>
		<MovieGrid {movies} />
	{:else}
		<h1>Premieres not found</h1>
	{/if}
{:catch}
	<h1>Error</h1>
{/await}

<style>
</style>
