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
  import AboutUs from "$features/landing/AboutUs.svelte"
  import WorkProcess from "$features/landing/WorkProcess.svelte"
  import Header from "$features/landing/Header.svelte"
</script>

<svelte:head>
  <title>Spentoday</title>
  <meta
    name="description"
    content="Заробляйте більше, працюй меньше з онлайн магазином"
  />
</svelte:head>

<img
  src="headband.png"
  alt=""
  class="absolute top-0 left-0 right-0 bottom-0 lg:w-full object-cover
  lg:h-[800px] md:w-auto md:h-[750px] w-auto h-[550px] -z-10"
/>

<Header />

<main class="min-h-[70vh]">
  <section class="px-4 md:px-6 max-w-screen-xl m-auto pt-10 pb-20">
    <h1
      class="text-5xl md:text-8xl lg:text-9xl z-2
      font-bold grid grid-cols-3 gap-5 mt-10 text-white"
    >
      <p class="col-span-3">ВІД ІДЕЇ</p>
      <p class="col-span-3">
        ДО
        <span
          class="rounded md:rounded-xl bg-brand-green px-2 md:px-4 text-white"
        >
          УСПІХУ
        </span>
        —
      </p>
      <p class="col-span-3 md:col-start-2">ОДИН ДЕНЬ</p>
    </h1>
    <div
      class="grid grid-cols-[1fr_auto] md:grid-cols-3 gap-8 mt-8 md:mt-12 text-white"
    >
      <div class="md:col-start-2 grid grid-cols-2 gap-4">
        <img src="/people.png" alt="Люди" />
        <div>
          <p class="font-bold">100+</p>
          <p>Активних</p>
          <p>користувачів</p>
        </div>
      </div>
      <div>
        <p class="font-bold">5+</p>
        <p>Надійних</p>
        <p>партнерів</p>
      </div>
    </div>
  </section>

  <div class="bg-secondary-100">
    <Partners
      class="py-0 mb-10 bg-brand-pink flex justify-around md:mb-24 md:py-8"
    />
    <Benefits />

    <AboutUs />

    <WorkProcess />

    <Technologies />

    <Strip />

    <Propositions />

    <section class="bg-brand-violet py-9 md:py-28 mb-9 md:mb-28">
      <div class="px-4 md:px-6">
        <div
          class="bg-brand-dark text-white max-w-screen-xl m-auto p-5 md:p-16
          rounded-3xl md:rounded-[3rem] grid grid-cols-3 gap-4"
        >
          <h2
            class="text-3xl md:text-6xl lg:text-8xl font-bold row-start-1 col-span-3"
          >
            <span class="px-2 md:px-4 bg-brand-pink text-white rounded-xl">
              ЗРОБІТЬ КРОК
            </span>
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
            class="text-lg col-start-1 col-span-3 row-start-4 md:col-start-2 md:col-span-1 lg:pb-28 text-left"
          >
            Ми запрошуємо Вас випробувати всі можливості платформи абсолютно
            безкоштовно протягом 14 днів. Почніть свій шлях до успіху вже
            сьогодні!
          </p>

          <div
            class="md:col-start-3 md:row-start-3 row-start-5 mt-1 col-start-2
            md:row-span-2 justify-self-end aspect-square
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
  </div>
</main>
