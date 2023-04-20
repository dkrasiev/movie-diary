<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	let authFormElement: HTMLFormElement;
	let action: string = '?/login';

	function send(action: '?/login' | '?/register') {
		authFormElement.action = action;
		authFormElement.submit();
	}
</script>

<form class="flex flex-col" {action} method="post" bind:this={authFormElement}>
	<input name="email" type="email" required />
	<input name="password" type="password" required />
	<div class="flex justify-content">
		<button on:click|preventDefault={() => send('?/login')}>Log In</button>
		<div class="w-2" />
		<button on:click|preventDefault={() => send('?/register')}>Register</button>
	</div>
</form>

{#if form?.error}
	<h1 class="text-red-500">{form.error.status}: {form.error.data}</h1>
{/if}

{#if form?.result}
	<h1 class="text-green-500">Success</h1>
{/if}

<style>
	form > * {
		@apply mb-2;
	}

	button {
		@apply flex-1;
	}
</style>
