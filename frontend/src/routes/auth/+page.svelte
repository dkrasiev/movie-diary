<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col max-w-md mx-auto" method="post">
	<label for="email">Email</label>
	<input id="email" name="email" type="email" required />

	<label for="password">Password</label>
	<input id="password" name="password" type="password" required />

	<div class="flex justify-content">
		<button formaction="?/login">Log In</button>
		<div class="w-2" />
		<button formaction="?/register">Register</button>
	</div>
</form>

{#if form?.error}
	<p class="text-red-500 text-center">{form.error.status}: {form.error.data}</p>
{/if}

<style>
	form > * {
		@apply mb-2;
	}

	button {
		@apply flex-1;
	}
</style>
