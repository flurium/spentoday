<svelte:head>
  <title>Spentoday</title>
  <meta name="description" content="Заробляйте більше, працюй меньше з онлайн магазином" />
</svelte:head>

<header class="px-5 py-8 max-w-screen-xl m-auto flex justify-between items-center">
  <nav class="basis-1/4">
    <a class="text-primary-500 font-bold text-2xl" href="/">Spentoday</a>
  </nav>

  <nav class="flex-1 justify-center flex gap-5">
    <a href="/#benefits">Переваги</a>
    <a href="/#price">Ціна</a>
    <a href="/#faq">FAQ</a>
  </nav>

  <nav class="basis-1/4 text-right">
    <a class="px-8 py-2 rounded-full bg-primary-400" href="/login">Почати</a>
  </nav>
</header>

<main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
  <h1 class="text-4xl md:text-6xl text-center mt-10 font-bold">
    ІДЕАЛЬНИЙ <span class="text-primary-500">СТАРТ</span> ОНЛАЙН-БІЗНЕСУ
  </h1>

  <section class="py-10" id="benefits">
    <h3>Чому ми?</h3>

    <ul class="flex flex-col gap-10">
      <li class="flex gap-10 border-b border-b-black pb-4">
        <div class="border border-black aspect-square h-24" />
        <div>
          <h4 class="text-4xl font-semibold">Унікальний дизайн</h4>
          <p class="mt-2 max-w-md">
            Наші дизайнери створять дизайн, який виділяється серед конкурентів і відображає ваш
            бренд.
          </p>
        </div>
      </li>
      <li class="flex gap-10 border-b border-b-black pb-4">
        <div class="border border-black aspect-square h-24" />
        <div>
          <h4 class="text-4xl font-semibold">Користувацький досвід</h4>
          <p class="mt-2 max-w-md">
            Наша платформа забезпечує зручну навігацію, швидке завантаження і просте замовлення
            товарів.
          </p>
        </div>
      </li>
      <li class="flex gap-10 border-b border-b-black pb-4">
        <div class="border border-black aspect-square h-24" />
        <div>
          <h4 class="text-4xl font-semibold">Простота</h4>
          <p class="mt-2 max-w-md">
            Ми об'єднали інструменти Shopify і Rozetka для зрозумілості і легкості використання.
          </p>
        </div>
      </li>
    </ul>
  </section>

  <section class="py-10" id="faq">
    <h3>FAQ</h3>
  </section>

  <section class="py-10" id="price">
    <h3>Price</h3>
  </section>
</main>
