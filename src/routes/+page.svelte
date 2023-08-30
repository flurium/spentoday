<script>
  import Benefits from "$features/landing/Benefits.svelte"
  import Pricing from "$features/landing/Pricing.svelte"
  import Propositions from "$features/landing/Propositions.svelte"
  import Questions from "$features/landing/questions/Questions.svelte"
  import Strip from "$features/landing/Strip.svelte"
  import Technologies from "$features/landing/Technologies.svelte"
  import Footer from "$features/landing/footer/Footer.svelte"
  import Fondy from "$lib/assets/Fondy.svelte"
  import Hyperswitch from "$lib/assets/Hyperswitch.svelte"
  import Liqpay from "$lib/assets/Liqpay.svelte"
  import Monobank from "$lib/assets/Monobank.svelte"
  import Paypal from "$lib/assets/Paypal.svelte"
  import Star from "$lib/assets/Star.svelte"
  import StartFreeStar from "$lib/assets/StartFreeStar.svelte"
</script>

<svelte:head>
  <title>Spentoday</title>
  <meta
    name="description"
    content="Заробляйте більше, працюй меньше з онлайн магазином"
  />
</svelte:head>

<header class="px-5 py-8 max-w-screen-xl m-auto flex justify-between items-center">
  <nav class="basis-1/4">
    <a class="text-brand-violet font-bold text-2xl" href="/">Spentoday</a>
  </nav>

  <nav class="flex-1 justify-center flex gap-5">
    <a href="/#benefits">Переваги</a>
    <a href="/#price">Ціна</a>
    <a href="/#faq">FAQ</a>
  </nav>

  <nav class="basis-1/4 text-right">
    <a class="px-8 py-3 rounded-full bg-brand-violet text-white" href="/login">Почати</a>
  </nav>
</header>

<main class="min-h-[70vh]">
  <section class="px-6 pt-10 pb-36">
    <h1
      class="max-w-screen-xl m-auto text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold
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

  <section class="py-8 bg-brand-pink flex justify-around mb-24">
    <Fondy />
    <Star />
    <Liqpay />
    <Star />
    <Monobank />
    <Star />
    <Paypal />
    <Star />
    <Hyperswitch />
  </section>

  <Benefits />

  <Technologies />

  <Propositions />

  <Strip />

  <section class="bg-brand-violet py-32">
    <div class="px-6">
      <div
        class="bg-brand-dark text-white max-w-screen-xl m-auto p-16 rounded-[3rem]
      grid grid-cols-3 gap-4"
      >
        <h2 class="text-6xl lg:text-8xl font-bold col-span-3">
          <span class="px-4 bg-brand-pink text-white rounded-xl">ЗРОБІТЬ</span>
        </h2>
        <h2 class="text-6xl lg:text-8xl font-bold col-span-3">ДО БІЗНЕСУ РАЗОМ</h2>
        <h2 class="text-6xl lg:text-8xl font-bold col-start-2">З НАМИ</h2>

        <p class="col-start-2 row-start-4">
          Ми запрошуємо вас випробувати всі можливості платформи абсолютно безкоштовно на
          14 днів. Почніть свій шлях до успіху вже сьогодні!
        </p>

        <div
          class="col-start-3 row-start-3 row-span-2 justify-self-end aspect-square
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
