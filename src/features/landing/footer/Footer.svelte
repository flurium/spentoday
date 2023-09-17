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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <h3 class="md:col-span-2 font-bold text-5xl md:text-7xl">
        ЗАЛИШТЕ СВОЇ <span class="rounded-xl px-4 bg-brand-green">ПИТАННЯ,</span
        >
        МИ НАДАМО ВАМ ВІДПОВІДІ
      </h3>

      <form on:submit={submitQuestion}>
        <input
          bind:value={email}
          type="email"
          placeholder="E-mail"
          class="border-b border-b-secondary-100 placeholder:text-secondary-100
          bg-inherit py-3 w-full text-lg"
        />
        <textarea
          bind:this={textarea}
          bind:value={question}
          on:input={resizeTextarea}
          placeholder="Ваше питання"
          class="border-b border-b-secondary-100 placeholder:text-secondary-100
          bg-inherit py-3 w-full text-lg mt-4 overflow-hidden resize-none"
          rows={1}
        />
      </form>

      <button
        disabled={sending}
        class="place-self-end"
        on:click={submitQuestion}
      >
        <SendQuestionStar />
      </button>
    </div>

    <div class="mt-48 mb-14 flex justify-between">
      <div>
        <h4 class="text-3xl">Spentoday</h4>
        <p class="mt-4">Для успішного бізнесу</p>
      </div>
      <div class="flex flex-col gap-4">
        <a href="/#faq">FAQ</a>
        <a href="/#propositions">Що ми пропонуємо</a>
        <a href="/#technologies">Технології</a>
        <!-- <a href="/#price">Тарифи</a>
        <a href="/#faq">FAQ</a> -->
      </div>
      <div class="flex flex-col gap-4">
        <a href="/#benefits">Переваги</a>
        <a href="/#price">Тарифи</a>
      </div>
      <div class="flex flex-col gap-4">
        <p>КОНТАКТИ</p>
        <a href="mailto:support@spentoday.com" class="hover:underline">
          support@spentoday.com
        </a>
        <p>+380 66 727 49 05</p>
      </div>
    </div>
    <div class="justify-between border-t border-t-white pt-3">
      <span>Copyright 2023. Spentoday</span>
      <span />
    </div>
  </div>
</footer>
