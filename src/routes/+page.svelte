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

  let isMenuOpen = false

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }
</script>

<svelte:head>
  <title>Spentoday</title>
  <meta
    name="description"
    content="Заробляйте більше, працюй меньше з онлайн магазином"
  />
</svelte:head>

<header class="px-5 py-8 bg-secondary-100">
  <div class="flex justify-between items-center max-w-screen-xl m-auto">
    <nav class="basis-1/4">
      <a class="text-brand-violet font-bold text-lg md:text-2xl" href="/"
        >Spentoday</a
      >
    </nav>

    <nav class="hidden md:flex flex-1 justify-center gap-5">
      <a class="text-xs md:text-base" href="/#benefits">Переваги</a>
      <a class="text-xs md:text-base" href="/#price">Ціна</a>
      <a class="text-xs md:text-base" href="/#faq">FAQ</a>
    </nav>

    <nav class="basis-1/2 md:basis-1/4 text-right">
      <a
        class="px-6 py-2 md:px-8 md:py-3 rounded-full bg-brand-violet text-white text-xs md:text-base"
        href="/shops"
      >
        Почати
      </a>
    </nav>

    <button
      on:click={toggleMenu}
      class="md:hidden inline-flex items-center justify-center p-2
      w-10 h-10 text-secondary-500 rounded-lg"
      aria-expanded={isMenuOpen}
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>

    {#if isMenuOpen}
      <div class="fixed top-0 left-0 w-full h-full bg-brand-violet z-50">
        <div class="my-8 mx-5 text-white">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-3xl bold pb-3">SPENTODAY</h2>
              <a href="mailto:support@spentoday.com" class="hover:underline">
                support@spentoday.com
              </a>
            </div>
            <button
              on:click={toggleMenu}
              class="text-5xl text-white p-2 h-10 w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M1 1L15 15" stroke="white" />
                <path d="M15 1L1 15" stroke="white" />
              </svg>
            </button>
          </div>
          <div class="text-5xl bold absolute bottom-8">
            <a class="block pb-6" on:click={toggleMenu} href="/login">
              Почати
            </a>
            <a class="block pb-6" on:click={toggleMenu} href="/#benefits">
              Переваги
            </a>
            <a class="block pb-6" on:click={toggleMenu} href="/#price">Ціна</a>
            <a class="block pb-6" on:click={toggleMenu} href="/#faq">FAQ</a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</header>

<main class="min-h-[70vh] bg-secondary-100">
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

  <Partners
    class="py-0 mb-10 bg-brand-pink flex justify-around md:mb-24 md:py-8"
  />

  <Benefits />

  <Technologies />

  <Strip />

  <Propositions />

  <section class="bg-brand-violet py-32">
    <div class="px-4 md:px-6">
      <div
        class="bg-brand-dark text-white max-w-screen-xl m-auto p-5 md:p-16
      rounded-3xl md:rounded-[3rem] grid grid-cols-3 gap-4"
      >
        <h2
          class="text-3xl md:text-6xl lg:text-8xl font-bold row-start-1 col-span-3"
        >
          <span class="px-2 md:px-4 bg-brand-pink text-white rounded-xl"
            >ЗРОБІТЬ КРОК</span
          >
        </h2>
        <h2
          class="text-3xl md:text-6xl lg:text-8xl font-bold row-start-2 col-span-3"
        >
          ДО БІЗНЕСУ РАЗОМ
        </h2>
        <h2
          class="text-3xl md:text-6xl lg:text-8xl font-bold col-start-1 row-start-3 col-span-3 md:col-start-2"
        >
          З НАМИ
        </h2>

        <p
          class="text-lg col-start-1 col-span-3 row-start-4 md:col-start-2 md:col-span-1 text-left"
        >
          Ми запрошуємо Вас випробувати всі можливості платформи абсолютно
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
