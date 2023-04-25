<script lang="ts">
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import { Month } from '@dkrasiev/movie-diary-core';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let year: number = data.year;
	let month: Month = data.month;
</script>

<h1>Premieres</h1>

<form class="flex mb-4" action={`?year=${year}&month=${month}`}>
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

{#if data.premieres?.length > 0}
	<PremiereGrid premieres={data.premieres} />
{:else}
	<h3>Premieres not found</h3>
{/if}

<style>
	form {
		@apply max-w-sm;
	}

	form > * {
		@apply w-full h-full;
	}
</style>
