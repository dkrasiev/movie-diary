<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ExpandedPremiereResponse } from '@dkrasiev/movie-diary-core';
	import dayjs from 'dayjs';

	export let premiere: ExpandedPremiereResponse;

	const movie = premiere.expand?.movie;
	const name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal;
	const premiereDate = dayjs(premiere.premiereRu).locale('ru').format('DD.MM.YYYY');
</script>

<a
	style={`background-image: url('${movie?.posterUrlPreview}')`}
	class="relative aspect-[2/3] bg-cover rounded-container-token overflow-hidden border border-surface-200 transition-all"
	href={`/premieres/${premiere.id}`}
>
	<div class="w-full h-full">
		<span
			class="absolute top-0 left-0 p-1 rounded-br-container-token variant-filled-surface translate-x-0 transition duration-300"
		>
			{name}
			<br />
			{premiereDate}
			<br />
			{#if movie?.ratingKinopoisk}
				<span class="flex items-center gap-1">
					<Icon icon="lucide:star" />
					{movie.ratingKinopoisk} / 10
				</span>
			{/if}
		</span>

		<!-- <form class="absolute bottom-0 right-2 -translate-y-2 transition duration-300">
			<button class="variant-filled-primary rounded p-1">Подписаться</button>
		</form> -->
	</div>
</a>

<style>
	a:not(:hover) > div > span {
		@apply -translate-x-[100%];
	}

	/* a:not(:hover) > div > form {
		@apply translate-y-[100%];
	} */
</style>
