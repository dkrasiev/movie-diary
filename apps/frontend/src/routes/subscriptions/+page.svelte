<script lang="ts">
	import MovieGrid from '$lib/components/MovieGrid.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<MovieGrid movies={data.movies} />
