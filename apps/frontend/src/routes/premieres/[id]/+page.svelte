<script lang="ts">
	import { page } from '$app/stores';
	import type { Premiere } from '@prisma/client';
	import type { PageServerData } from './$types';
	import dayjs from 'dayjs';

	export let data: PageServerData;

	const premiere: Premiere | null = data.premiere;

	const released = premiere ? dayjs().diff(premiere.premiereRu) > 0 : false;
	const name = premiere?.nameRu || premiere?.nameEn || 'Name not found';
</script>

<ol class="breadcrumb mb-4">
	<li class="crumb"><a href="/premieres">Premieres</a></li>
	{#if premiere}
		<li class="crumb-separator" aria-hidden>&rsaquo;</li>
		<li class="crumb">{name}</li>
	{/if}
</ol>

{#if premiere}
	<div class="grid grid-cols-1 sm:grid-cols-[256px_auto] md:grid-cols-[320px_auto]">
		<img class="aspect-[2/3] rounded" src={premiere.posterUrl} alt={`${name} poster`} />
		<div class="mt-8 sm:mt-0 sm:ml-8">
			<h1 class="text-left">{premiere.nameRu} ({premiere.year})</h1>
			<h2>{premiere.nameEn}</h2>

			{#if $page.data.user && premiere && released === false}
				<form class="mb-4" method="post">
					<button class="btn variant-filled-primary">
						{data.subscription ? 'Unsubscribe' : 'Subscribe'}
					</button>
				</form>

				<!-- {#if data.subscription}
					<h3>Your subscription</h3>
					<pre class="mb-4">{JSON.stringify(data.subscription, undefined, 2)}</pre>
				{/if} -->
			{/if}

			<pre class="overflow-x-scroll w-full">{JSON.stringify(premiere, undefined, 2)}</pre>
		</div>
	</div>
{:else}
	<h2>Premiere not found</h2>
{/if}

<!-- <pre>{JSON.stringify(premiere, undefined, 2)}</pre> -->
