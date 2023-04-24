<script lang="ts">
	import type { Premiere } from '@prisma/client';
	import PremiereCard from './PremiereCard.svelte';

	export let premieres: Premiere[] = [];
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
