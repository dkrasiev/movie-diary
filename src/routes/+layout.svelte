<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<div class="min-h-screen flex flex-col">
	<Header username={data.user?.email} />

	<main class="container mx-auto flex-1 p-4">
		<slot />
	</main>

	<Footer />
</div>

<style>
</style>
