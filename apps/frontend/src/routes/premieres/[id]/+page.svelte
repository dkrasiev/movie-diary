<script lang="ts">
	import { page } from '$app/stores';
	import dayjs from 'dayjs';

	export let data;

	const premiere = data.premiere;
	const movie = data.premiere.expand?.movie;

	const released = movie ? dayjs().diff(premiere?.premiereRu) > 0 : false;
	const name = movie?.nameRu || movie?.nameEn || 'Name not found';
</script>

<ol class="breadcrumb mb-4">
	<li class="crumb"><a href="/premieres">Premieres</a></li>
	{#if movie}
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<li class="crumb">{name}</li>
	{/if}
</ol>

{#if movie}
	<div class="grid grid-cols-1 sm:grid-cols-[256px_auto] md:grid-cols-[320px_auto]">
		<img class="aspect-[2/3] rounded" src={movie.posterUrl} alt={`${name} poster`} />
		<div class="mt-8 sm:mt-0 sm:ml-8">
			<h1 class="text-left">{movie.nameRu} ({movie.year})</h1>
			<h2>{movie.nameEn}</h2>

			{#if $page.data.user && movie && released === false}
				{#if !data.subscription}
					<form class="mb-4" action="?/subscribe" method="post">
						<button class="btn variant-filled-primary"> Subscribe </button>
					</form>
				{/if}

				{#if data.subscription}
					<form class="mb-4" action="?/unsubscribe" method="post">
						<button class="btn variant-filled-primary"> Unsubscribe </button>
					</form>

					<h3>Your subscription</h3>
					<pre class="mb-4">{JSON.stringify(data.subscription, undefined, 2)}</pre>
				{/if}
			{/if}

			<pre class="overflow-x-scroll w-full">{JSON.stringify(movie, undefined, 2)}</pre>
		</div>
	</div>
{:else}
	<h2>Premiere not found</h2>
{/if}
