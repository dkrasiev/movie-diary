<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	interface Route {
		name: string;
		path: string;
		exact?: boolean;
	}

	const routes: Route[] = [{ name: 'Premieres', path: '/premieres' }];

	if ($page.data.user) {
		routes.push({ name: 'Subscriptions', path: '/subscriptions' });
	} else {
		routes.push({ name: 'Auth', path: '/auth' });
	}

	$: checkRoute = (route: Route) => {
		const path = $page.url.pathname;

		if (route.exact) {
			return path === route.path;
		}

		return path.startsWith(route.path);
	};
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<a href="/"> Movie Diary </a>
	</svelte:fragment>
	<nav>
		<ul class="flex">
			{#each routes as route (route.path)}
				<li class="mx-2" aria-current={checkRoute(route) ? 'page' : undefined}>
					<a href={route.path}>{route.name}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<svelte:fragment slot="trail">
		{#if $page.data.user}
			<form action="/auth?/logout" method="post">
				<button class="btn">Log out</button>
			</form>
		{/if}
		<LightSwitch />
	</svelte:fragment>
</AppBar>

<style>
	*[aria-current='page'] {
		@apply text-primary-500;
	}
</style>
