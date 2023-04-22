<script lang="ts">
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Home component</h1>

<pre>{JSON.stringify(data.user, undefined, 2)}</pre>
