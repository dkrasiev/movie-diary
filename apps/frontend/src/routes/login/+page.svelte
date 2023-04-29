<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	let email: string = '';
	let password: string = '';
</script>

<h1>Login</h1>

<div>
	<a href="/register">Sign up</a>
</div>

<form class="max-w-md mx-auto [&>*]:mb-2" method="post">
	<label class="label">
		<span>Username or email</span>
		<input class="input" name="identity" type="text" required bind:value={email} />
	</label>

	<label class="label">
		<span>Password</span>
		<input class="input" name="password" type="password" required bind:value={password} />
	</label>

	<button class="btn w-full">Log In</button>
</form>

{#if form?.errors}
	{#each Object.entries(form.errors) as [key, { message }]}
		<div class="alert-message variant-ghost-error p-4 card my-2 max-w-xl mx-auto">
			<h3>{key}</h3>
			<p>{message}</p>
		</div>
	{/each}
{/if}
