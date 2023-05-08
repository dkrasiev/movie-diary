<script lang="ts">
	// Selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// global stylesheet
	import './styles.css';
	import { browser } from '$app/environment';

	import Header from '$lib/components/Header.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';

	import { fly } from 'svelte/transition';

	export let data;

	const x = 200;
	const duration = 300;
</script>

<svelte:head>
	<title>Movie Diary</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<main class="container mx-auto p-4">
		{#key data.pathname}
			<div in:fly={{ x: -x, duration, delay: duration }} out:fly={{ x, duration }}>
				<slot />
			</div>
		{/key}
	</main>
</AppShell>
