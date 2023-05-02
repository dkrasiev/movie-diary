<script lang="ts">
	export let form;

	let username: string = '';
	let passwordConfim: string = '';
	let email: string = '';
	let password: string = '';
</script>

<h1>Register</h1>

<div>
	<a href="/login">Login</a>
</div>

<form class="max-w-md mx-auto [&>*]:mb-2" method="post">
	<label class="label">
		<span>Username</span>
		<input class="input" name="username" type="text" required bind:value={username} />
	</label>

	<label class="label">
		<span>Email</span>
		<input class="input" name="email" type="email" required bind:value={email} />
	</label>

	<label class="label">
		<span>Password</span>
		<input class="input" name="password" type="password" required bind:value={password} />
	</label>

	<label class="label">
		<span>Repeat password</span>
		<input
			class="input"
			name="passwordConfirm"
			type="password"
			required
			bind:value={passwordConfim}
		/>
	</label>

	<button class="btn w-full">Register</button>
</form>

{#if form?.errors}
	{#each Object.entries(form.errors) as [key, { message }]}
		<div class="alert-message variant-ghost-error p-4 card my-2 max-w-xl mx-auto">
			<h3>{key}</h3>
			<p>{message}</p>
		</div>
	{/each}
{/if}
