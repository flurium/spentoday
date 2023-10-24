<script lang="ts">
  import { goto } from "$app/navigation"
  import { api, routes } from "$lib"
  import { z } from "zod"

  const emailSchema = z.string().email()

  let email = ""

  let message: string | null = null

  $: isEmailCorrect = emailSchema.safeParse(email).success

  async function forgot() {
    const status = await api.forgot(fetch, "client", email)
    if (status == "ok") {
      goto(routes.login)
      return
    }
    if (status == "email-not-found") {
      message = "Такої адреси не існує"
      return
    }
    message = "Сервер не працює."
  }
</script>

<svelte:head>
  <title>Забули пароль?</title>
  <meta name="description" content="Forgot Password" />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">
    Забули пароль?
  </h1>
  <p class="text-center text-text-main mt-6 max-w-3xl m-auto">
    Надішлемо вам посилання для скидання пароля
  </p>

  <form
    on:submit|preventDefault={forgot}
    class="max-w-lg m-auto flex flex-col gap-4 mt-12"
  >
    {#if message}
      <div
        class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800"
      >
        {message}
      </div>
    {/if}
    <input
      class="block border mt-2 mb-3 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={email}
      type="email"
      placeholder="Електронна пошта"
    />

    <button
      class="bg-brand-green disabled:bg-gray-100 font-semibold px-10 py-3 text-white
       hover:bg-primary-400 disabled:text-text-main rounded-full w-fit mx-auto"
      type="submit"
      disabled={!isEmailCorrect}
    >
      Відправити
    </button>
  </form>
</main>
