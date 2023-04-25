<script lang="ts">
	import { page } from '$app/stores';
	import type { Premiere } from '@prisma/client';

	export let premiere: Premiere;
</script>

<a
	style={`background-image: url('${premiere.posterUrlPreview}')`}
	class="card bg-cover rounded aspect-[2/3] cursor-pointer"
	href={`/premieres/${premiere.id}`}
>
	<!---->
</a>
