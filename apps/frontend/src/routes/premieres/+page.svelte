<script lang="ts">
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import { Month } from '@dkrasiev/movie-diary-core';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let year: number = data.year;
	let month: Month = data.month;

	$: loading = !data;
</script>

<h1>Premieres</h1>

<form
	class="grid grid-cols-[4rem_auto] mb-4 gap-y-2 sm:flex gap-4"
	on:submit={() => (loading = true)}
>
	<label class="label sm:self-center" for="year"> Year </label>
	<input class="input sm:w-24" id="year" name="year" type="number" bind:value={year} />

	<label class="label sm:self-center" for="month"> Month </label>
	<select class="select sm:w-48" id="month" name="month" bind:value={month}>
		{#each Object.values(Month) as month}
			<option value={month}>{month}</option>
		{/each}
	</select>

	<button class="btn variant-filled-primary self-end col-start-1 col-end-3"
		>{loading ? 'loading...' : 'submit'}</button
	>
</form>

{#if data.premieres?.length > 0}
	<PremiereGrid premieres={data.premieres} />
{:else}
	<h3>Premieres not found</h3>
{/if}
