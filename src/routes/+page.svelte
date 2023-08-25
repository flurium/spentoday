<script>
  import Technologies from "$features/landing/Technologies.svelte"
  import Flower from "$lib/assets/Flower.svelte"
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

<main class="min-h-[70vh]">
  <section class="px-6 py-20 max-w-screen-xl m-auto">
    <h1
      class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold
      grid grid-cols-3 gap-5 mt-10"
    >
      <span class="col-span-3">ВІД ІДЕЇ</span>
      <span class="col-span-3">
        ДО
        <span class="rounded-xl bg-brand-green px-4">УСПІХУ</span>
        -
      </span>
      <span class="col-span-3 justify-self-end">ОДИН ДЕНЬ<span /></span>
    </h1>
  </section>

  <section class="py-8 bg-brand-pink flex justify-around">
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

  <section
    class="px-6 max-w-screen-xl m-auto py-10
    grid grid-cols-3 md:grid-rows-[auto_1fr] md:grid-cols-9 gap-x-3"
    id="benefits"
  >
    <div class="col-start-3 rounded-t-lg bg-white h-7" />
    <div
      class="col-start-3 md:row-start-1 md:col-start-6
      rounded-t-lg bg-brand-green h-7"
    />
    <div class="col-start-3 md:col-start-9 rounded-t-lg bg-brand-violet h-7" />

    <div
      class="row-start-2 col-span-3
      bg-white mb-3 rounded-b-lg rounded-tl-lg p-7"
    >
      <span class="text-4xl font-bold">365</span>
      <h3 class="font-bold text-xl pt-10">ПІДТРИМКА 24/7</h3>
      <p class="pt-2">Якщо ви наш клієнт і позвоните в Новій Рік, то ми відповімо.</p>
    </div>

    <div
      class="row-start-4 md:row-start-2 col-span-3 mb-3
      text-white bg-brand-green rounded-b-lg rounded-tl-lg p-7"
    >
      <span class="text-4xl font-bold">120+</span>
      <h3 class="font-bold text-xl pt-10">НОВИХ МАГАЗИНІВ</h3>
      <p class="pt-2">
        Онлайн магазини відкриваються швидко та з мінімальними витратами кожен день.
      </p>
    </div>

    <div
      class="row-start-6 md:row-start-2 col-span-3 mb-3
      text-white bg-brand-violet rounded-b-lg rounded-tl-lg p-7"
    >
      <span class="text-4xl font-bold">100%</span>
      <h3 class="font-bold text-xl pt-10">ЗАДОВОЛЕНИХ КЛІЄНТІВ</h3>
      <p class="pt-2">Ми робимо швідкі та красиві магазини, ви заробляєте гроші.</p>
    </div>
  </section>

  <Technologies />

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
          Ми запрошуємо вас випробувати всі можливості платформи абсолютно безкоштовно на 14 днів.
          Почніть свій шлях до успіху вже сьогодні!
        </p>

        <StartFreeStar
          class="col-start-3 row-start-3 row-span-2 justify-self-end aspect-square w-full"
        />
      </div>
    </div>

    <div
      class="overflow-hidden bg-white py-2 my-40 flex justify-around items-center
      text-lg sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl"
    >
      <Star />
      <span class="font-bold text-brand-violet">ШВИДКІСТЬ</span>
      <Star />
      <span class="font-bold text-brand-violet">РЕЗУЛЬТАТИ</span>
      <Star />
      <span class="font-bold text-brand-violet">ДОСВІД</span>
      <Star />
    </div>

    <div class="max-w-screen-xl m-auto grid grid-cols-3 gap-3 text-lg text-white">
      <div
        class="rounded-full aspect-square m-7 p-14 bg-brand-pink
        grid place-content-center text-center"
      >
        Ми пропонуємо безпеку вашим клієнтам та захист даних
      </div>
      <div
        class="rounded-full aspect-square p-14 border border-white border-dashed
        grid place-content-center text-center"
      >
        Запускайте свій магазин легко та швидко: наші інструменти допоможуть вам
      </div>
      <div
        class="rounded-full aspect-square m-7 p-14 bg-brand-green
        grid place-content-center text-center"
      >
        Ми надаємо не тільки платформу, але й підтримку для досягнення цілей
      </div>
    </div>
  </section>

  <section class="py-10 grid md:grid-cols-3 gap-3 px-6 max-w-screen-xl m-auto" id="price">
    <h2 class="md:col-start-2 md:col-span-2 text-4xl md:text-6xl font-bold mb-10">
      <span class="px-4 rounded-lg bg-brand-pink text-white"> ПРИСКОРІТЬ </span>
      <span class="text-secondary-700"> РОЗВИТОК </span>
    </h2>

    <div class="p-8 bg-white rounded-xl grid grid-rows-[auto_1fr_auto]">
      <header>
        <h3 class="text-secondary-700 text-5xl font-bold">Хобі</h3>
        <p class="text-secondary-500 font-bold text-4xl mt-2">$0/місяць</p>
      </header>

      <ul class="list-disc list-inside text-lg mt-14">
        <li>1 магазин</li>
        <li>10 товарів</li>
      </ul>

      <footer class="mt-8">
        <a
          class="block w-fit rounded-full py-4 px-9 bg-brand-dark
       text-white font-bold"
          href="/login"
        >
          ПОЧАТИ
        </a>
      </footer>
    </div>
    <div class="p-8 bg-brand-dark rounded-xl grid grid-rows-[auto_1fr_auto]">
      <header>
        <h3 class="text-white text-5xl font-bold">Про</h3>
        <p class="text-secondary-400 font-bold text-4xl mt-2">$20/місяць</p>
      </header>

      <ul class="list-disc list-inside text-secondary-50 text-lg mt-14">
        <li>3 магазини</li>
        <li>500 товарів</li>
        <li>Сповіщення електронною поштою</li>
      </ul>

      <footer class="mt-8">
        <a
          class="block w-fit rounded-full py-4 px-9 bg-white
          text-brand-dark font-bold"
          href="/login"
        >
          ПОЧАТИ
        </a>
      </footer>
    </div>
    <div class="p-8 bg-brand-pink rounded-xl grid grid-rows-[auto_1fr_auto]">
      <header>
        <h3 class="text-white text-5xl font-bold">Бізнес</h3>
        <p class="text-secondary-100 font-bold text-4xl mt-2">$100/місяць</p>
      </header>

      <ul class="list-disc list-inside text-secondary-50 text-lg mt-14">
        <li>Необмежена кількість магазинів</li>
        <li>Необмежена кількість товарів</li>
        <li>Сповіщення електронною поштою</li>
      </ul>

      <footer class="mt-8">
        <a
          class="block w-fit rounded-full py-4 px-9 bg-brand-dark
          text-white font-bold"
          href="/login"
        >
          ПОЧАТИ
        </a>
      </footer>
    </div>
  </section>

  <section class="px-6 max-w-screen-xl m-auto my-20">
    <h2 class="text-4xl md:text-6xl font-bold mb-10">
      <span class="text-secondary-700"> ЗАЛИШИЛИСЯ </span>
      <span class="px-4 rounded-lg bg-brand-green text-white"> ПИТАННЯ? </span>
    </h2>

    <form on:submit|preventDefault={() => {}} class="grid md:grid-cols-2 gap-3 text-lg">
      <input type="text" class="py-6 px-8 w-full rounded-xl" placeholder="Ваше ім'я" />
      <input
        type="text"
        class="py-6 px-8 w-full rounded-xl"
        placeholder="Електронна пошта або телефон"
      />
      <textarea
        rows={10}
        class="py-6 px-8 w-full rounded-xl md:col-span-2"
        placeholder="Питання, ми відповімо цього ж дня."
      />
    </form>
  </section>
</main>

<footer class="rounded-t-[3rem] bg-brand-violet text-white">
  <div class="px-6 max-w-screen-xl m-auto py-36">
    <div class="grid grid-cols-3 gap-3">
      <Flower />
      <h3 class="col-span-2 font-bold text-5xl md:text-7xl">
        ЗАЛИШТЕ СВІЙ EMAIL ТА ОТРИМУЙТЕ ОСОБЛИВІ ПРОПОЗИЦІЇ
      </h3>
    </div>
  </div>
</footer>
