<script lang="ts">
	import type { ExpandedPremiereResponse } from '@dkrasiev/movie-diary-core';
	import PremiereCard from './PremiereCard.svelte';

	export let premieres: ExpandedPremiereResponse[] = [];
</script>

<div class="grid gap-4">
	{#each premieres as premiere (premiere.id)}
		<PremiereCard {premiere} />
	{/each}
</div>

<style>
	div {
		grid-template-columns: repeat(auto-fill, minmax(16rem, auto));
	}
</style>
