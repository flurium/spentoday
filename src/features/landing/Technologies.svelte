<script>
  import Star from "$lib/assets/Star.svelte"
</script>

<section class="px-6 max-w-screen-xl m-auto py-24 mb-24" id="technologies">
  <div class="md:flex md:justify-between">
    <div class="text-brand-violet text-lg md:text-xl mb-4">ТЕХНОЛОГІЇ</div>
    <h2
      class="text-4xl md:text-6xl font-bold px-2
      py-1 bg-brand-violet text-white rounded-md"
    >
      ШВИДКІСТЬ ТА СУЧАСНІСТЬ
    </h2>
  </div>
  <h2 class="text-4xl md:text-6xl font-bold text-secondary-700 mt-4">
    ТЕХНОЛОГІЙ ДЛЯ ВАШОГО МАГАЗИНУ
  </h2>

  <div class="flex flex-col gap-5 mt-16">
    <div
      class="rounded-full bg-white grid grid-cols-[auto_1fr] md:grid-cols-10"
    >
      <div
        class="md:col-span-1 rounded-full h-14 w-14 md:h-28
        md:w-28 bg-brand-dark grid place-content-center spin"
      >
        <Star color="violet" class="h-6 w-6 md:h-12 md:w-12" />
      </div>
      <div
        class="text-xs pl-2 md:text-xl h-fit place-self-center
        md:w-full md:col-span-7 md:col-start-4"
      >
        SVELTE ЗАБЕЗПЕЧУЄ ЗНАЧНО
        <span class="font-bold"> ШВИДШЕ ЗАВАНТАЖЕННЯ </span> ВЕБ-САЙТУ
      </div>
    </div>

    <div
      class="rounded-full bg-white grid grid-cols-[auto_1fr] md:grid-cols-10"
    >
      <div
        class="md:col-span-1 rounded-full h-14 w-14 md:h-28
        md:w-28 bg-brand-dark grid place-content-center spin"
      >
        <Star color="violet" class="h-6 w-6 md:h-12 md:w-12" />
      </div>
      <div
        class="text-xs pl-2 md:text-xl h-fit place-self-center md:w-full
        md:col-span-7 md:col-start-4"
      >
        ASP.NET <span class="font-bold">ЗАПОБІГАЄ</span> НЕПЕРЕДБАЧУВАНИМ
        <span class="font-bold">ПОМИЛКАМ</span>
      </div>
    </div>
    <div
      class="rounded-full bg-white grid grid-cols-[auto_1fr] md:grid-cols-10"
    >
      <div
        class="md:col-span-1 rounded-full h-14 w-14 md:h-28
        md:w-28 bg-brand-dark grid place-content-center spin"
      >
        <Star color="violet" class="h-6 w-6 md:h-12 md:w-12" />
      </div>
      <div
        class="text-xs pl-2 md:text-xl h-fit place-self-center md:w-full
        md:col-span-7 md:col-start-4"
      >
        SERVERLESS ІЗОЛЮЄ ОПЕРАЦІЇ: ВАШІ
        <span class="font-bold">ДАНІ У НАДІЙНІЙ БЕЗПЕЦІ </span>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .spin {
    animation: spin 7s linear infinite;
  }
</style>
