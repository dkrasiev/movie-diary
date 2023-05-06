<script lang="ts">
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import { Month } from '@dkrasiev/movie-diary-core';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data;

	let form: HTMLFormElement;
	let loading = false;

	function submit() {
		console.log('submit');
		loading = true;
		form.submit();
	}

	$: {
		if (data) {
			loading = false;
		}
	}

	// TODO: вынести как константу
	const monthMap = new Map([
		[Month.JANUARY, 'Январь'],
		[Month.FEBRUARY, 'Февраль'],
		[Month.MARCH, 'Март'],
		[Month.APRIL, 'Апрель'],
		[Month.MAY, 'Май'],
		[Month.JUNE, 'Июнь'],
		[Month.JULY, 'Июль'],
		[Month.AUGUST, 'Август'],
		[Month.SEPTEMBER, 'Сентябрь'],
		[Month.OCTOBER, 'Октябрь'],
		[Month.NOVEMBER, 'Ноябрь'],
		[Month.DECEMBER, 'Декабрь']
	]);
</script>

<svelte:head>
	<title>Премьеры</title>
</svelte:head>

<h1>Премьеры</h1>

<form class="sm:flex mb-4" bind:this={form} on:change={submit}>
	<div
		class="input-group input-group-divider grid-cols-[8rem_auto] sm:max-w-sm sm:mr-2 mb-2 sm:mb-0"
	>
		<div class="input-group-shim">Год</div>
		<input id="year" name="year" type="number" value={data.year} />
	</div>

	<div class="input-group input-group-divider grid-cols-[8rem_auto] sm:max-w-sm">
		<div class="input-group-shim">Месяц</div>
		<select id="month" name="month" value={data.month}>
			{#each Array.from(monthMap) as [key, value]}
				<option value={key}>{value}</option>
			{/each}
		</select>
	</div>
</form>

<!-- <form
	class="input-group input-group-divider grid-cols-[auto_1fr] max-w-xs mb-4"
	bind:this={form}
	on:change={submit}
>
	<div class="input-group-shim">Год</div>
	<input id="year" name="year" type="number" value={data.year} />

	<div class="input-group-shim">Месяц</div>
	<select id="month" name="month" value={data.month}>
		{#each Array.from(monthMap) as [key, value]}
			<option value={key}>{value}</option>
		{/each}
	</select>
</form> -->

{#if loading}
	<div class="mx-auto">
		<ProgressRadial stroke={100} meter="stroke-primary-500" track="stroke-primary-500/30" />
	</div>
{:else if data.premieres?.length > 0}
	<PremiereGrid premieres={data.premieres} />
{:else}
	<h3>Ничего не найдено</h3>
{/if}
