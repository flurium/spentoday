<script lang="ts">
  import { page } from "$app/stores"
</script>

<main>
  <div>
    {$page.error?.message}
  </div>
</main>
