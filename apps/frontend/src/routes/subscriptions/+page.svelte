<script lang="ts">
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import type { ExpandedPremiereResponse } from '@dkrasiev/movie-diary-core';

	export let data;

	const premieres: ExpandedPremiereResponse[] = data.subscriptions.map(
		(subscription) => subscription.expand?.premiere
	) as ExpandedPremiereResponse[];
</script>

<svelte:head>
	<title>Подписки</title>
</svelte:head>

<h1>Ваши подписки</h1>

{#if premieres.length > 0}
	<PremiereGrid {premieres} />
{:else}
	<h2>Список подписок пуст.</h2>
{/if}
