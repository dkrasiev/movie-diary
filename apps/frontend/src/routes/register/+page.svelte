<script lang="ts">
	export let form;
</script>

<h1>Регистрация</h1>

<div>
	Если у Вас уже есть аккаунт, можете <a href="/login">войти</a>
</div>

<form class="max-w-md mx-auto [&>*]:mb-2" method="post">
	<label class="label">
		<span>Имя пользователя</span>
		<input class="input" name="username" type="text" required value={form?.data?.username || ''} />
	</label>

	<label class="label">
		<span>Email</span>
		<input class="input" name="email" type="email" required value={form?.data?.email || ''} />
	</label>

	<label class="label">
		<span>Пароль</span>
		<input
			class="input"
			name="password"
			type="password"
			required
			value={form?.data?.password || ''}
		/>
	</label>

	<label class="label">
		<span>Подтвердите пароль</span>
		<input class="input" name="passwordConfirm" type="password" required />
	</label>

	<button class="btn w-full">Зарегистрироваться</button>
</form>

{#if form?.errors}
	{#each Object.entries(form.errors) as [key, message]}
		<div class="alert-message variant-ghost-error p-4 card my-2 max-w-xl mx-auto">
			<h3>{key}</h3>
			<p>{message}</p>
		</div>
	{/each}
{/if}
