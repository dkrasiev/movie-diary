<script lang="ts">
	import type { ExpandedPremiereResponse } from '@dkrasiev/movie-diary-core';

	export let premiere: ExpandedPremiereResponse;
</script>

<a
	style={`background-image: url('${premiere.expand?.movie?.posterUrlPreview}')`}
	class="card bg-cover rounded-token aspect-[2/3] cursor-pointer"
	href={`/premieres/${premiere.id}`}
>
	<!---->
</a>
