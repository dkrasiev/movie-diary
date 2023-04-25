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

<div class="relative">
	<button class="btn absolute left-0 h-full" on:click={() => history.back()}>back</button>
	<h1 class={'after:absolute after:text-sm' + (released ? " after:content-['released']" : '')}>
		{name}
	</h1>
</div>

{#if $page.data.user && premiere && released === false}
	<form class="mb-4" method="post">
		<button class="btn variant-filled-primary">
			{data.subscription ? 'Unsubscribe' : 'Subscribe'}
		</button>
	</form>

	{#if data.subscription}
		<h3>Your subscription</h3>
		<pre class="mb-4">{JSON.stringify(data.subscription, undefined, 2)}</pre>
	{/if}
{/if}

<pre>{JSON.stringify(premiere, undefined, 2)}</pre>
