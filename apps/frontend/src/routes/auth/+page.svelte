<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="max-w-sm mx-auto" method="post">
	<label class="label">
		<span> Email </span>
		<input class="input" name="email" type="email" required />
	</label>

	<label class="label">
		<span>Password</span>
		<input class="input" name="password" type="password" required />
	</label>

	<div class="btn-group flex">
		<button class="btn flex-1" formaction="?/login">Log In</button>
		<button class="btn flex-1" formaction="?/register">Register</button>
	</div>
</form>

{#if form?.error}
	<p class="text-error-300">{form.error.status}: {form.error.data}</p>
{/if}

<style>
	form > * {
		@apply mb-2;
	}
</style>
