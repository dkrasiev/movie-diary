<script lang="ts">
	import { page } from '$app/stores';
	import type { Premiere } from '@prisma/client';
	import type { PageServerData } from './$types';
	import dayjs from 'dayjs';

	export let data: PageServerData;

	const premiere: Premiere | null = data.premiere;
	let name = premiere?.nameRu || premiere?.nameEn || 'Name not found';
</script>

<h1>{name}</h1>

{#if $page.data.user && premiere && dayjs().diff(premiere.premiereRu) < 0}
	<form method="post">
		<button>{data.subscription ? 'Unsubscribe' : 'Subscribe'}</button>
	</form>

	<h1>Your subscription</h1>
	<pre>{JSON.stringify(data.subscription, undefined, 2)}</pre>

	<br />
{/if}

<pre>{JSON.stringify(premiere, undefined, 2)}</pre>
