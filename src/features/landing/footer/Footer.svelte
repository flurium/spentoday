<script>
  import SendQuestionStar from "$features/landing/footer/SendQuestionStar.svelte"
  import { toast } from "$features/toast"
  import { call } from "$lib/fetch"
  import { z } from "zod"

  let email = ""
  let question = ""

  const emailSchema = z.string().email()

  async function submitQuestion() {
    const validation = await emailSchema.safeParseAsync(email)
    if (!validation.success) {
      return toast.push({ title: "Електронна пошта некоректна" })
    }

    if (email.trim() == "" || question.trim() == "") {
      return toast.push({
        title: "Порожнє поле",
        description: "Електронна пошта та текст питання не можуть бути порожніми."
      })
    }
    const response = await call(fetch, "client", {
      route: "/v1/site/questions",
      method: "POST",
      body: { email: email, content: question }
    })
    if (!response) return toast.push({ title: "Не можемо відправити ваше питання" })
    if (response.ok) return toast.push({ title: "Скоро ми надамо відповідь" })
    if (response.status == 400) {
      return toast.push({
        title: "Порожнє поле",
        description: "Електронна пошта та текст питання не можуть бути порожніми."
      })
    }
    return toast.push({ title: "Не можемо відправити ваше питання" })
  }
</script>

<footer class="rounded-t-[2rem] bg-brand-violet text-white">
  <div class="px-6 max-w-screen-xl m-auto py-36">
    <div class="grid grid-cols-2 gap-12">
      <h3 class="col-span-2 font-bold text-5xl md:text-7xl">
        ЗАЛИШТЕ СВОЇ <span class="rounded-xl px-4 bg-brand-green">ПИТАННЯ,</span>
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
        <input
          bind:value={question}
          type="text"
          placeholder="Ваше питання"
          class="border-b border-b-secondary-100 placeholder:text-secondary-100
          bg-inherit py-3 w-full text-lg mt-4"
        />
      </form>

      <button class=" place-self-end" on:click={submitQuestion}>
        <SendQuestionStar />
      </button>
    </div>
  </div>
</footer>
