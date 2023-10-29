<script lang="ts">
  import { page } from "$app/stores"

  let message =
    $page.error?.message ?? "Щось неочікуване сталося. Зараз полагодимо"
</script>

<a href="/shops">
  <main class="h-[90vh] overflow-hidden grid place-content-center px-6">
    <h1
      class="uppercase text-center text-4xl md:text-6xl font-bold text-secondary-800"
    >
      {message}
    </h1>
  </main>
</a>
