<script>
  import Star from "$lib/assets/Star.svelte"
</script>

<section class="px-6 max-w-screen-xl m-auto py-24 mb-24" id="technologies">
 <div class="md:flex md:justify-between">
  <div class="text-brand-violet text-lg md:text-xl mb-4">ТЕХНОЛОГІЇ</div>
  <h2 class="text-4xl md:text-6xl font-bold px-2 py-1 bg-brand-violet text-white rounded-md">
    ШВИДКІСТЬ ТА СУЧАСНІСТЬ
  </h2>
</div>
<h2 class="text-4xl md:text-6xl font-bold text-secondary-700 mt-4">
  ТЕХНОЛОГІЙ ДЛЯ ВАШОГО МАГАЗИНУ
</h2>

  
  <div class="flex flex-col gap-5 mt-16">
   <div class="rounded-full bg-white grid grid-cols-[auto_1fr]">
  <div
    class="rounded-full h-14 w-14 md:h-28 md:w-28 bg-brand-dark grid place-content-center"
  >
    <Star color="violet" class="h-7 w-7 md:h-14 md:w-14" />
  </div>
  <div class="text-sm pl-1 md:text-xl h-fit place-self-center">
    SVELTE ЗАБЕЗПЕЧУЄ ЗНАЧНО <span class="font-bold"
      >ШВИДШЕ ЗАВАНТАЖЕННЯ</span
    > ВЕБ-САЙТУ
  </div>
</div>


    <div class="rounded-full bg-white grid grid-cols-[auto_1fr]">
      <div
        class="rounded-full h-14 w-14 md:h-28 md:w-28 bg-brand-dark grid place-content-center"
      >
        <Star color="violet" class="h-7 w-7 md:h-14 md:w-14" />
      </div>
      <div class="text-sm pl-1 md:text-xl h-fit place-self-center">
        ASP.NET <span class="font-bold">ЗАПОБІГАЄ</span> НЕПЕРЕДБАЧУВАНИМ
        <span class="font-bold">ПОМИЛКАМ</span>
      </div>
    </div>
    <div class="rounded-full bg-white grid grid-cols-[auto_1fr]">
      <div
        class="rounded-full h-14 w-14 md:h-28 md:w-28 bg-brand-dark grid place-content-center"
      >
        <Star color="violet" class="h-7 w-7 md:h-14 md:w-14" />
      </div>
     <div class="text-sm pl-1 md:text-xl h-fit place-self-center">
        SERVERLESS ІЗОЛЮЄ ОПЕРАЦІЇ: ВАША <span class="font-bold"
          >НАДІЙНІСТЬ У БЕЗПЕЦІ
        </span>
      </div>
    </div>
  </div>
</section>

