<script lang="ts">
	import type { MovieShort } from '@dkrasiev/movie-diary';
	import MovieCard from './MovieCard.svelte';

	export let movies: MovieShort[] = [];
</script>

<div class="grid gap-4">
	{#each movies as movie (movie.kinopoiskId)}
		<MovieCard {movie} />
	{/each}
</div>

<style>
	div {
		grid-template-columns: repeat(auto-fill, minmax(16rem, auto));
	}
</style>
