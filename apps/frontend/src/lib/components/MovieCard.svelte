<script lang="ts">
	import type { Movie } from '@dkrasiev/movie-diary';

	export let movie: Movie;

	let url = `/movies/${movie.kinopoiskId}`;

	function onClick() {
		window.location.href = url;
	}
</script>

<div
	style={`background-image: url('${movie.posterUrlPreview}')`}
	class="block rounded-md border bg-cover aspect-[2/3] cursor-pointer"
	on:click|preventDefault={onClick}
	on:keypress={onClick}
/>
