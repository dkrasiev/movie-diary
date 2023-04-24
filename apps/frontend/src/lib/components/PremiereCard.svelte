<script lang="ts">
	import type { Premiere } from '@prisma/client';

	export let premiere: Premiere;

	function onClick() {
		window.location.href = `/movies/${premiere.id}`;
	}
</script>

<div
	style={`background-image: url('${premiere.posterUrlPreview}')`}
	class="block rounded-md border bg-cover aspect-[2/3] cursor-pointer"
	on:click|preventDefault={onClick}
	on:keypress={onClick}
/>
