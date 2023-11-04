<script lang="ts">
  import SendQuestionStar from "$features/landing/footer/SendQuestionStar.svelte"
  import { toast } from "$features/toast"
  import { call } from "$lib/fetch"
  import { z } from "zod"

  let email = ""
  let question = ""
  let sending = false

  const emailSchema = z.string().email()

  async function submitQuestion() {
    const validation = await emailSchema.safeParseAsync(email)
    if (!validation.success) {
      return toast.push({ title: "Електронна пошта некоректна" })
    }

    if (email.trim() == "" || question.trim() == "") {
      return toast.push({
        title: "Порожнє поле",
        description:
          "Електронна пошта та текст питання не можуть бути порожніми."
      })
    }
    sending = true
    const response = await call(fetch, "client", {
      route: "/v1/site/questions",
      method: "POST",
      body: { email: email, content: question }
    })
    sending = false
    if (!response)
      return toast.push({ title: "Не можемо відправити ваше питання" })
    if (response.ok) {
      email = ""
      question = ""
      return toast.push({ title: "Скоро ми надамо відповідь" })
    }
    if (response.status == 400) {
      return toast.push({
        title: "Порожнє поле",
        description:
          "Електронна пошта та текст питання не можуть бути порожніми."
      })
    }
    return toast.push({ title: "Не можемо відправити ваше питання" })
  }

  let textarea: HTMLTextAreaElement
  function resizeTextarea() {
    textarea.style.height = "4px"
    textarea.style.height = textarea.scrollHeight + "px"
  }
</script>

<footer class="rounded-t-[2rem] bg-brand-violet text-white">
  <div class="px-6 max-w-screen-xl m-auto py-36">
    <div class="grid grid-cols-1 md:grid-cols-8 gap-12">
      <h3 class="md:col-span-6 font-bold text-4xl md:text-7xl">
        ВАШІ <span class="rounded-xl px-4 bg-brand-green">ЗАПИТАННЯ</span>,
        НАДАМО ВАМ ВІДПОВІДІ
      </h3>

      <form class="md:col-span-4 md:col-start-1" on:submit={submitQuestion}>
        <input
          bind:value={email}
          type="email"
          placeholder="E-mail"
          class="rounded-full bg-secondary-200 placeholder:text-brand-violet text-brand-violet
          bg-inherit px-5 py-3 w-full text-lg"
        />
        <textarea
          bind:this={textarea}
          bind:value={question}
          on:input={resizeTextarea}
          placeholder="Ваше питання"
          class="rounded-full bg-secondary-200 placeholder:text-brand-violet text-brand-violet
          bg-inherit px-5 py-3 w-full text-lg mt-4 overflow-hidden resize-none"
          rows={1}
        />
      </form>

      <button
        disabled={sending}
        class="md:col-span-3 md:col-start-6 place-self-center md:place-self-end"
        on:click={submitQuestion}
        aria-label="Відправити запитання"
      >
        <SendQuestionStar />
      </button>
    </div>

    <div class="mt-48 mb-14 md:flex justify-between grid grid-cols-2 gap-4">
      <div>
        <h4 class="text-3xl">Spentoday</h4>
        <p class="mt-2 md:mt-4 whitespace-nowrap">Для успішного бізнесу</p>
      </div>
      <div class="col-start-1 col-span-2 border-t border-t-white pt-3" />
      <div class="col-start-1 text-sm md:text-base md:flex md:flex-col gap-4">
        <a href="/#faq" class="block md:inline">FAQ</a>
        <a href="/#propositions" class="block md:inline">Що ми пропонуємо</a>
        <a href="/#technologies" class="block md:inline">Технології</a>
      </div>
      <div
        class="col-start-2 text-sm md:text-base md:flex md:flex-col gap-4 md:justify-end"
      >
        <p>КОНТАКТИ</p>
        <a href="mailto:support@spentoday.com" class="hover:underline">
          support@spentoday.com
        </a>
        <p>+380 66 738 44 09</p>
      </div>
    </div>
    <div class="justify-between border-t border-t-white pt-3">
      <span>Copyright 2023. Spentoday</span>
      <span />
    </div>
  </div>
</footer>
