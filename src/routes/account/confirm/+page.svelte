<script lang="ts">
  import type { PageData } from "./$types"

  let data: PageData
</script>

<main>
  <h1 class="text-center text-5xl font-bold my-10">Confirm your account email.</h1>

  <div class="p-4 bg-red-50 my-10 border-2 border-red-200 text-red-800 rounded-md max-w-4xl m-auto">
    {data.message}
  </div>
</main>
