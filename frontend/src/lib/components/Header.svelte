<script lang="ts">
	import { page } from '$app/stores';
	import type { UserDTO } from '$lib/dtos/user-dto';

	interface Route {
		name: string;
		path: string;
		exact?: boolean;
	}

	export let user: UserDTO | undefined;

	const routes: Route[] = [
		{ name: 'Home', path: '/', exact: true },
		{ name: 'Movies', path: '/movies' }
	];

	if (!user) {
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

<header>
	<div class="corner">
		{#if user?.activated === false}
			<div class="absolute left-0 p-2 flex align-middle">Your account is not activated</div>
		{/if}
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			{#each routes as route (route.path)}
				<li aria-current={checkRoute(route) ? 'page' : undefined}>
					<a href={route.path}>{route.name}</a>
				</li>
			{/each}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner cursor-pointer">
		{#if user}
			<form class="absolute right-0 p-2 flex align-middle" action="/auth?/logout" method="post">
				<button class="bg-transparent border-none">Log out</button>
			</form>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
