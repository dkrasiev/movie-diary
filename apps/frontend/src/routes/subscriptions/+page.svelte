<script lang="ts">
	import PremiereGrid from '$lib/components/PremiereGrid.svelte';
	import type { ExpandedPremiereResponse } from '@dkrasiev/movie-diary-core';

	export let data;

	const premieres: ExpandedPremiereResponse[] = data.subscriptions.map(
		(subscription) => subscription.expand?.premiere
	) as ExpandedPremiereResponse[];
</script>

<h1>Your subscriptions</h1>

{#if premieres.length > 0}
	<PremiereGrid {premieres} />
{:else}
	<h2>Your subscription list is empty</h2>
{/if}
