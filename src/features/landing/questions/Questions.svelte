<script lang="ts">
  import GreenStar from "$lib/assets/GreenStar.svelte"
  import Arrow from "./Arrow.svelte"

  type Question = {
    title: string
    answer: string
  }

  const questions: Question[] = [
    {
      title: "Як можливо налаштувати дизайн магазину?",
      answer:
        "Ви вже наблизилися до суті! Ми вже розробили готовий та стильний дизайн для магазинів нашої платформи Spentoday, щоб Ви могли миттєво створити привабливий інтернет-магазин, не витрачаючи час на дизайнерські аспекти. Проте ми розуміємо важливість брендових елементів. Тому Ви зможете легко налаштувати головний колір Вашого магазину так, щоб він відображав Ваш бренд. Окрім цього, у Вас буде можливість додати власні маркетингові банери для вигідного підкреслення акцій, нових товарів або будь-яких важливих подій."
    },
    {
      title: "Як можна отримувати платежі від своїх клієнтів?",
      answer:
        'Наразі у Вас є можливість використовувати популярний спосіб "Оплата при отриманні", який забезпечує надійність операцій. Щодо майбутнього, ми плануємо розширити варіанти отримання платежів, включаючи українські системи LiqPay, Monobank, Fondy. Також, ми підтримуватимемо міжнародні платіжні системи, такі як PayPal та Hyperswitch, для зручності наших клієнтів у всьому світі.'
    },
    {
      title:
        "Як можна зв'язатися з підтримкою, якщо виникнуть питання або проблеми?",
      answer:
        "Наша команда завжди готова допомогти Вам. Якщо у Вас виникли питання або технічні проблеми, задайте їх нижче або зверніться до нашої служби підтримки через електронну пошту support@spentoday.com. Ми працюємо 24/7, щоб забезпечити найкращий досвід користування нашою платформою та відповісти на всі Ваші питання."
    }
  ]
</script>

<section
  class="px-6 max-w-screen-xl m-auto py-24 md:mb-32 md:grid md:grid-cols-3"
  id="faq"
>
  <h2 class="text-4xl md:text-6xl font-bold mb-10 md:col-span-2 md:col-start-2">
    <span class="text-secondary-700"> ЗАЛИШИЛИСЯ </span>
    <span class="px-4 rounded-lg bg-brand-green text-white"> ПИТАННЯ? </span>
  </h2>

  {#each questions as question}
    <details class="bg-white mt-3 rounded-xl md:col-span-3 md:relative">
      <GreenStar
        class="hidden md:block absolute top-0 left-0 z-10 mt-8 ml-20 h-[70px] w-[70px]"
      />
      <summary
        class="text-secondary-600 px-10 pt-6 pb-6 font-bold text-xl cursor-pointer
        select-none flex justify-between items-center gap-4"
      >
        <div class="title pl-5">{question.title}</div>
        <div class="arrow transition-transform">
          <Arrow class="rotate-180" />
        </div>
      </summary>
      <p class="pb-12 px-14 text-secondary-500 question">
        {question.answer}
      </p>
    </details>
  {/each}
</section>

<style>
  summary {
    list-style-type: none;
  }
  summary::-webkit-details-marker {
    display: none !important;
  }

  details[open] .arrow {
    transform: rotate(180deg);
  }

  @media (min-width: 768px) {
    details[open] .title {
      margin-left: 30%;
    }

    details[open] .question {
      margin-left: 28%;
      margin-right: 16%;
    }
  }
</style>
