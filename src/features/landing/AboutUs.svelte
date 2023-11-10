<script>
  import WatchStar from "$lib/assets/WatchStar.svelte"

  let hidden = true
</script>

<section
  class="px-5 md:px-6 py-[35px] md:py-[100px] max-w-screen-xl m-auto"
  id="aboutUs"
>
  <div class="md:flex md:justify-between">
    <div class="text-brand-violet text-lg md:text-xl md:mb-4">ПРО НАС</div>
    <h2
      class="text-4xl md:text-6xl font-bold md:px-2 py-1 text-secondary-700 rounded-md"
    >
      МИ НАДАЄМО МОЖЛИВІСТЬ
    </h2>
  </div>

  <h2 class="text-4xl md:text-6xl font-bold text-secondary-700">
    <span class="px-0 md:px-2 bg-brand-violet text-white rounded-md"
      >ШВИДКО</span
    > ЗАПУСТИТИ ОНЛАЙН БІЗНЕС
  </h2>

  <div class="mt-[15px] md:mt-[30px] flex justify-center items-center relative">
    {#if hidden}
      <img
        src="aboutUs.jpg"
        alt=""
        class="w-full lg:rounded-bl-[15rem] rounded-xl"
      />
      <div
        class="absolute inset-0 bg-[#597F9B] opacity-50 lg:rounded-bl-[15rem] rounded-xl z-20"
      />
      <button
        class="text-center absolute z-30 flex justify-center items-center"
        on:click={() => (hidden = false)}
        aria-label="Подивитися відео"
      >
        <WatchStar class="h-[100px] w-[100px] md:h-[170px] md:w-[170px]" />
      </button>
    {:else}
      <iframe
        class="w-full aspect-video lg:rounded-bl-[15rem]
        lg:hover:rounded-bl-xl rounded-xl transition-all"
        src="https://www.youtube.com/embed/5OAzOoMlUQM?si=GOnjbiEOblz_XtgT"
        title="Spentoday промо"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
        gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    {/if}
  </div>
</section>
