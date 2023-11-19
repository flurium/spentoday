<script lang="ts">
  import { routes } from "$lib"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

{#if data.message != null}
  <main>
    <h1 class="text-center text-5xl font-bold my-10">
      Підтвердьте електронну адресу свого облікового запису
    </h1>

    <div
      class="p-4 bg-red-50 my-10 border-2 border-red-200 text-red-800 rounded-md max-w-4xl m-auto"
    >
      {data.message}
    </div>
  </main>
{:else}
  <main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6 text-center">
    <h1 class="text-4xl md:text-6xl font-bold">Вітаємо!</h1>
    <p class=" text-text-main mt-6 max-w-3xl m-auto">
      Ви успішно підтвердили свою електронну адресу
    </p>

    <a
      class="rounded bg-brand-violet text-white
      text-lg py-6 px-10 inline-block mt-10"
      href={routes.dashboard}>Мої магазини</a
    >
  </main>
{/if}
