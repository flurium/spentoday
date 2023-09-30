<script>
  import Benefits from "$features/landing/Benefits.svelte"
  import Pricing from "$features/landing/Pricing.svelte"
  import Propositions from "$features/landing/Propositions.svelte"
  import Questions from "$features/landing/questions/Questions.svelte"
  import Strip from "$features/landing/Strip.svelte"
  import Technologies from "$features/landing/Technologies.svelte"
  import Footer from "$features/landing/footer/Footer.svelte"
  import StartFreeStar from "$lib/assets/StartFreeStar.svelte"
  import Partners from "$features/landing/Partners.svelte"
</script>

<svelte:head>
  <title>Spentoday</title>
  <meta
    name="description"
    content="Заробляйте більше, працюй меньше з онлайн магазином"
  />
</svelte:head>

<header class="px-5 py-8 bg-secondary-100">
  <div class="flex justify-between items-center max-w-screen-xl m-auto ">
    <nav class="basis-1/4 ">
      <a class="text-brand-violet font-bold text-lg md:text-2xl" href="/">Spentoday</a>
    </nav>

    <nav class="flex-1 justify-center flex gap-5">
      <a class="text-xs md:text-base" href="/#benefits">Переваги</a>
      <a class="text-xs md:text-base" href="/#price">Ціна</a>
      <a class="text-xs md:text-base" href="/#faq">FAQ</a>
    </nav>

    <nav class="basis-1/4 text-right">
      <a
        class="px-4 py-2 md:px-8 md:py-3 rounded-full bg-brand-violet text-white text-xs md:text-base"
        href="/login"
      >
        Почати
      </a>
    </nav>
  </div>
</header>


<main class="min-h-[70vh] bg-secondary-100 ">
  <section class="px-6 pt-10 pb-28 md:pb-36">
    <h1
      class="max-w-screen-xl m-auto text-4xl md:text-8xl lg:text-9xl font-bold
      grid grid-cols-3 gap-5 mt-10"
    >
      <span class="col-span-3">ВІД ІДЕЇ</span>
      <span class="col-span-3">
        ДО
        <span class="rounded-xl bg-brand-green px-4 text-white">УСПІХУ</span>
        —
      </span>
      <span class="col-span-3 justify-self-end">ОДИН ДЕНЬ<span /></span>
    </h1>
  </section>


  <Partners class="py-0 mb-10 bg-brand-pink flex justify-around md:mb-24 md:py-8" />

  <Benefits />

  <Technologies />

  <Propositions />

  <Strip />

 <section class="bg-brand-violet py-32">
  <div class="px-4 md:px-6">
    <div
      class="bg-brand-dark text-white max-w-screen-xl m-auto p-5 md:p-16 rounded-[3rem]
      grid grid-cols-3 gap-4"
    >
      <h2 class="text-3xl md:text-6xl lg:text-8xl font-bold row-start-1 col-span-3">
        <span class="px-2 md:px-4 bg-brand-pink text-white rounded-xl">ЗРОБІТЬ КРОК</span>
      </h2>
      <h2 class="text-3xl md:text-6xl lg:text-8xl font-bold row-start-2 col-span-3">
        ДО БІЗНЕСУ РАЗОМ
      </h2>
      <h2 class="text-3xl md:text-6xl lg:text-8xl font-bold col-start-1 row-start-3 col-span-3 md:col-start-2">З НАМИ</h2>

       <p class="text-lg  col-start-1 col-span-3 row-start-4 md:col-start-2 md:col-span-1 text-left ">
        Ми запрошуємо вас випробувати всі можливості платформи абсолютно
        безкоштовно на 14 днів. Почніть свій шлях до успіху вже сьогодні!
      </p>

      <div
        class="md:col-start-3 md:row-start-3 row-start-5 mt-1 col-start-2 md:row-span-2 justify-self-end aspect-square
        w-full h-full grid place-content-center"
      >
        <a href="/login" aria-label="Почни зараз">
          <StartFreeStar />
        </a>
      </div>
    </div>
  </div>
</section>

  <Pricing />

  <Questions />

  <Footer />
</main>