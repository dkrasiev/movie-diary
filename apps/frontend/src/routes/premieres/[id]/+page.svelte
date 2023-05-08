<script lang="ts">
	import { page } from '$app/stores';

	import dayjs from 'dayjs';
	import 'dayjs/locale/ru';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	dayjs.extend(localizedFormat);

	export let data;

	const premiere = data.premiere;
	const movie = data.premiere.expand?.movie;

	const released = movie ? dayjs().diff(premiere?.premiereRu) > 0 : false;
	const name = movie?.nameRu || movie?.nameEn || movie?.nameOriginal || 'Название не найдено';

	const properties: [string, string | number | undefined][] = [
		['Год производства', movie?.year],
		['Оригинальное название', movie?.nameOriginal],
		['Слоган', movie?.slogan],
		['Описание', movie?.description],
		[
			released ? 'Вышел в кино' : 'Выходит в кино',
			dayjs(premiere.premiereRu).locale('ru').format('LL')
		],
		['Продолжительность фильма', movie?.filmLength ? `${movie.filmLength} мин.` : '']
	];
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

{#if movie}
	<div class="sm:grid sm:grid-cols-[20rem_auto] sm:gap-x-8">
		<img
			class="mb-8 aspect-[2/3] rounded-container-token"
			src={movie.posterUrl}
			alt={`${name} poster`}
		/>

		<div>
			<h1 class="text-left">{name}</h1>

			{#if $page.data.user && movie && released === false}
				<form class="mb-4" method="post">
					<button
						class="btn variant-filled-primary"
						formaction={data.subscription ? '?/unsubscribe' : '?/subscribe'}
					>
						{data.subscription ? 'Отписаться' : 'Подписаться'}
					</button>
				</form>
			{/if}

			<div>
				<div class="mb-4">
					<p>
						<a href={`https://kinopoisk.ru/film/${movie.kinopoiskId}`} target="_blank">
							Страница на КиноПоиск
						</a>
					</p>
				</div>

				{#each properties.filter((data) => data.every(Boolean)) as [name, value]}
					<div class="mb-4">
						<p class="font-bold">{name}</p>
						<p>{value}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<h1>Премьера не найдена</h1>
{/if}
