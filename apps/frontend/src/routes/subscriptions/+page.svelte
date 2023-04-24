<script lang="ts">
	import MovieGrid from '$lib/components/PremiereGrid.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

{#if data.userPremieres.length > 0}
	<h1>Your subscriptions</h1>
	<MovieGrid premieres={data.userPremieres} />
{:else}
	<h1>No subscriptions</h1>
{/if}
