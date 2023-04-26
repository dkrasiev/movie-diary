<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let form: ActionData;

	let email: string = '';
	let password: string = '';

	let tab = $page.url.searchParams.get('tab') || 'login';

	// TODO: @krasiev.da breaks tab on post
	// $: {
	// 	if (browser) {
	// 		$page.url.searchParams.set('tab', tab);
	// 		goto($page.url.href);
	// 	}
	// }
</script>

<TabGroup justify="justify-center">
	<Tab name="Login" value={'login'} bind:group={tab}>Login</Tab>
	<Tab name="Register" value={'register'} bind:group={tab}>Register</Tab>

	<svelte:fragment slot="panel">
		{#if tab === 'login'}
			<form class="max-w-sm mx-auto" action="?/login" method="post">
				<label class="label">
					<span>Email</span>
					<input class="input" name="email" type="email" required bind:value={email} />
				</label>

				<label class="label">
					<span>Password</span>
					<input class="input" name="password" type="password" required bind:value={password} />
				</label>

				<button class="btn w-full">Log In</button>
			</form>
		{:else if tab === 'register'}
			<form class="max-w-sm mx-auto" action="?/register" method="post">
				<label class="label">
					<span>Email</span>
					<input class="input" name="email" type="email" required bind:value={email} />
				</label>

				<label class="label">
					<span>Password</span>
					<input class="input" name="password" type="password" required bind:value={password} />
				</label>

				<button class="btn w-full">Register</button>
			</form>
		{/if}
	</svelte:fragment>
</TabGroup>

{#if form?.message}
	{#if form?.error}
		<div class={'max-w-md mx-auto card variant-soft-success p-4'}>
			{form.message}
		</div>
	{/if}

	{#if form?.success}
		<div class={'max-w-md mx-auto card variant-soft-success p-4'}>
			{form.message}
		</div>
	{/if}
{/if}
