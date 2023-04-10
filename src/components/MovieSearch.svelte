<script lang="ts">
  function navigateToMovie(e: Event) {
    const movieId = (e.target as HTMLInputElement).value;
    if (!movieId) return;

    window.location.href = `/movies/${movieId}`;
  }
</script>

<input class="border rounded p-2" on:change={navigateToMovie} />
