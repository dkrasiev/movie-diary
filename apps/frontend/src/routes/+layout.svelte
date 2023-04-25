<script lang="ts">
	// Selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// global stylesheet
	import './styles.css';

	import Header from '$lib/components/Header.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<main class="container mx-auto p-4">
		<slot />
	</main>
</AppShell>
