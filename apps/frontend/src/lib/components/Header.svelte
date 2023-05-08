<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	interface Route {
		name: string;
		path: string;
		checkPath: (url: string) => boolean;
	}

	const routes: Route[] = [
		{ name: 'Премьеры', path: '/premieres', checkPath: (url) => url.startsWith('/premieres') }
	];

	if ($page.data.user) {
		routes.push({
			name: 'Подписки',
			path: '/subscriptions',
			checkPath: (url) => url.startsWith('/subscriptions')
		});
	} else {
		routes.push({
			name: 'Авторизация',
			path: '/login',
			checkPath: (url) => url.startsWith('/login') || url.startsWith('/register')
		});
	}
</script>

<AppBar slotDefault="place-self-center">
	<svelte:fragment slot="lead">
		<a class="hidden sm:block" href="/"> Movie Diary </a>
		<nav class="sm:hidden">
			<ul class="flex">
				{#each routes as route}
					<li class="mx-2" aria-current={route.checkPath($page.url.pathname) ? 'page' : undefined}>
						<a href={route.path}>{route.name}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</svelte:fragment>

	<nav class="hidden sm:block">
		<ul class="flex">
			{#each routes as route}
				<li class="mx-2" aria-current={route.checkPath($page.url.pathname) ? 'page' : undefined}>
					<a href={route.path}>{route.name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<svelte:fragment slot="trail">
		{#if $page.data.user}
			<form action="/logout" method="post">
				<button class="btn">Выйти</button>
			</form>
		{/if}
		<!-- <LightSwitch /> -->
	</svelte:fragment>
</AppBar>

<style>
	*[aria-current='page'] {
		@apply text-primary-500;
	}
</style>
