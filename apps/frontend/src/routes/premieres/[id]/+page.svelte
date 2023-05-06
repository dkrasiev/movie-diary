<script lang="ts">
	import { page } from '$app/stores';
	import dayjs from 'dayjs';

	export let data;

	const premiere = data.premiere;
	const movie = data.premiere.expand?.movie;

	const released = movie ? dayjs().diff(premiere?.premiereRu) > 0 : false;
	const name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal || 'Название не найдено';
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

{#if movie}
	<div class="grid grid-cols-1 sm:grid-cols-[256px_auto] md:grid-cols-[320px_auto]">
		<img class="aspect-[2/3] rounded" src={movie.posterUrl} alt={`${name} poster`} />
		<div class="mt-8 sm:mt-0 sm:ml-8">
			<h1 class="text-left">{movie.nameRu || name} ({movie.year})</h1>

			{#if movie.nameOriginal}
				<h2>{movie.nameOriginal}</h2>
			{/if}

			{#if $page.data.user && movie && released === false}
				{#if data.subscription}
					<form class="mb-4" action="?/unsubscribe" method="post">
						<button class="btn variant-filled-primary"> Отписаться </button>
					</form>
				{:else}
					<form class="mb-4" action="?/subscribe" method="post">
						<button class="btn variant-filled-primary"> Подписаться </button>
					</form>
				{/if}
			{/if}

			<div>content</div>

			<pre class="overflow-x-scroll w-full">{JSON.stringify(movie, undefined, 2)}</pre>
		</div>
	</div>
{:else}
	<h2>Премьера не найдена</h2>
{/if}
