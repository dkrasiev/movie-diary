<script lang="ts">
	import MovieGrid from '$lib/components/PremiereGrid.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>Your subscriptions</h1>

{#if data.userPremieres.length > 0}
	<MovieGrid premieres={data.userPremieres} />
{:else}
	<h2>Your subscription list is empty</h2>
{/if}
