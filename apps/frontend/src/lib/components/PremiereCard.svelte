<script lang="ts">
	import type { ExpandedPremiereResponse } from '@dkrasiev/movie-diary-core';
	import dayjs from 'dayjs';
	import('dayjs/locale/ru');

	export let premiere: ExpandedPremiereResponse;

	const movie = premiere.expand?.movie;
	const name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal;
	const premiereDate = dayjs(premiere.premiereRu).locale('ru').format('D MMMM YYYY');
</script>

<a
	style={`background-image: url('${movie?.posterUrlPreview}')`}
	class="relative aspect-[2/3] bg-cover rounded-container-token overflow-hidden border border-surface-200"
	href={`/premieres/${premiere.id}`}
>
	<span
		class="absolute top-0 left-0 p-1 rounded-br-container-token transition-all duration-300 variant-filled-surface"
	>
		{name}
		<br />
		{`Дата выхода ${premiereDate}`}
	</span>
</a>

<style>
	a:not(:hover) > .absolute {
		@apply text-transparent bg-transparent border-none;
	}
</style>
