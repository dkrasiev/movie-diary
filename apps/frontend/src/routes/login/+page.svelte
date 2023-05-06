<script lang="ts">
	export let form;
</script>

<h1>Вход</h1>

<div class="text-center mb-4">
	Если у Вас нет аккаунта, можете <a href="/register">зарегистрироваться</a>
</div>

<form class="max-w-md mx-auto [&>*]:mb-2" method="post">
	<label class="label">
		<span>Имя пользователя или почта</span>
		<input class="input" name="identity" type="text" required value={form?.data?.identity || ''} />
	</label>

	<label class="label">
		<span>Пароль</span>
		<input class="input" name="password" type="password" required />
	</label>

	<button class="btn w-full">Войти</button>
</form>

{#if form?.errors}
	{#each Object.entries(form.errors) as [key, message]}
		<div class="alert-message variant-ghost-error p-4 card my-2 max-w-xl mx-auto">
			<h3>{key}</h3>
			<p>{message}</p>
		</div>
	{/each}
{/if}
