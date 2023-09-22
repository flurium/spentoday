<script lang="ts">
  import type { PageData } from "./$types"

  let data: PageData
</script>

{#if data.message}
  <main>
    <h1 class="text-center text-5xl font-bold my-10">
      Confirm your account email.
    </h1>

    <div
      class="p-4 bg-red-50 my-10 border-2 border-red-200 text-red-800 rounded-md max-w-4xl m-auto"
    >
      {data.message}
    </div>
  </main>
{:else}
  <main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
    <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">
      Congratulations!
    </h1>
    <p class="text-center text-text-main mt-6 max-w-3xl m-auto">
      You have successfully verified your email
    </p>
  </main>
{/if}
