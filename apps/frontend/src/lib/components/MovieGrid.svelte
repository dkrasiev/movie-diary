<script lang="ts">
	import type { Movie } from '@dkrasiev/movie-diary';
	import MovieCard from './MovieCard.svelte';

	export let movies: Movie[] = [];
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
