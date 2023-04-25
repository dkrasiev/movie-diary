<script lang="ts">
	import { fetchPremieres } from '$lib/client/fetch-premieres';
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import { Month, getMonthById } from '@dkrasiev/movie-diary-core';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let year: number = new Date().getFullYear();
	let month: Month = getMonthById(new Date().getMonth()) || Month.JANUARY;

	$: premieres = fetchPremieres(year, month);
</script>

<h1>Premieres</h1>

<form class="flex mb-4">
	<label class="label mr-4">
		Year
		<input class="input w-24" name="year" type="number" bind:value={year} />
	</label>

	<label class="label mr-4">
		Month
		<select class="select w-48" name="month" bind:value={month}>
			{#each Object.values(Month) as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
	</label>

	<button class="btn variant-filled-primary self-end">submit</button>
</form>

{#await premieres}
	<ProgressRadial
		class="mx-auto mt-16"
		stroke={100}
		meter="stroke-primary-500"
		track="stroke-primary-500/30"
	/>
{:then movies}
	{#if movies?.length > 0}
		<PremiereGrid premieres={movies} />
	{:else}
		<h1>Premieres not found</h1>
	{/if}
{:catch}
	<h1>Error</h1>
{/await}

<style>
	form {
		@apply max-w-sm;
	}

	form > * {
		@apply w-full h-full;
	}
</style>
