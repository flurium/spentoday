<script lang="ts">
  import Arrow from "./Arrow.svelte"

  type Question = {
    title: string
    answer: string
  }

  const questions: Question[] = [
    {
      title: "Як можливо налаштувати дизайн магазину?",
      answer:
        "Ви вже наблизилися до суті! Ми вже розробили готовий та стильний дизайн для магазинів нашої платформи Spentoday, щоб ви могли миттєво створити привабливий інтернет-магазин, не витрачаючи час на дизайнерські аспекти. Проте ми розуміємо важливість ваших брендових елементів. Тому ви зможете легко налаштувати головний колір вашого магазину так, щоб він відображав ваш бренд. Крім цього, у вас буде можливість додати власні маркетингові банери для вигідного підкреслення акцій, нових товарів або будь-яких важливих подій."
    },
    {
      title: "Як я можу отримувати платежі від своїх клієнтів?",
      answer:
        'Наразі у вас є можливість використовувати популярний спосіб "Оплата при отриманні", який забезпечує надійність операцій. Щодо майбутнього, ми плануємо розширити варіанти отримання платежів, включаючи українські системи LiqPay, Monobank, Fondy. Також, ми підтримуватимемо міжнародні платіжні системи, такі як PayPal та Hyperswitch, для зручності наших клієнтів у всьому світі.'
    },
    {
      title:
        "Як можна зв'язатися з підтримкою, якщо виникнуть питання або проблеми?",
      answer:
        "Наша команда завжди готова допомогти вам. Якщо у вас виникли питання або технічні проблеми, ви можете задати питання нижче або звернутися до нашої служби підтримки через електронну пошту support@spentoday.com. Ми працюємо 24/7, щоб забезпечити найкращий досвід користування нашою платформою та відповісти на всі ваші запитання."
    }
  ]
</script>

<section class="px-6 max-w-screen-xl m-auto py-24 mb-32" id="faq">
  <h2 class="text-4xl md:text-6xl font-bold mb-10">
    <span class="text-secondary-700"> ЗАЛИШИЛИСЯ </span>
    <span class="px-4 rounded-lg bg-brand-green text-white"> ПИТАННЯ? </span>
  </h2>

  {#each questions as question}
    <details class="bg-white mt-3 rounded-xl">
      <summary
        class="text-secondary-600 px-10 py-6 font-bold text-xl cursor-pointer
        select-none flex justify-between items-center gap-4"
      >
        {question.title}
        <div class="arrow transition-transform">
          <Arrow class="rotate-180" />
        </div>
      </summary>
      <p class="pb-12 px-10 text-secondary-500">
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
</style>
