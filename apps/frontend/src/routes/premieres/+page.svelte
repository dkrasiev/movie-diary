<script lang="ts">
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import { Month } from '@dkrasiev/movie-diary-core';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';

	export let data;

	let form: HTMLFormElement;
	let loading = false;

	function submit() {
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
		<div class="input-group-shim">
			<label for="year">Год</label>
		</div>
		<input
			id="year"
			name="year"
			type="number"
			min="1960"
			max={new Date().getFullYear()}
			value={data.year}
		/>
	</div>

	<div class="input-group input-group-divider grid-cols-[8rem_auto] sm:max-w-sm">
		<div class="input-group-shim">
			<label for="month">Месяц</label>
		</div>
		<select id="month" name="month" value={data.month}>
			{#each Array.from(monthMap) as [key, value]}
				<option value={key}>{value}</option>
			{/each}
		</select>
	</div>
</form>

{#if loading}
	<div class="flex justify-center">
		<ProgressRadial
			width="w-36"
			stroke={100}
			meter="stroke-primary-500/30"
			track="stroke-primary-500/60"
		/>
	</div>
{:else if data.premieres?.length > 0}
	<PremiereGrid
		premieres={data.premieres.filter(
			(premiere) => String(premiere.premiereRu) > dayjs().format('DD-MM-YYYY')
		)}
	/>
{:else}
	<h3>Ничего не найдено</h3>
{/if}
