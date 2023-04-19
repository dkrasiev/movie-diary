<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="flex flex-col" action="?/login" method="post">
	<input name="email" type="email" required />
	<input name="password" type="password" required />
	<button>Log In</button>
</form>

<pre>{JSON.stringify(form, undefined, 2)}</pre>

<style>
	form > * {
		@apply mb-2;
	}
</style>
