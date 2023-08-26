<script lang="ts">
  import { goto } from "$app/navigation"
  import { api } from "$lib"
  import { z } from "zod"

  const emailSchema = z.string().email()

  let email = ""

  let message: string | null = null

  $: isEmailCorrect = emailSchema.safeParse(email).success

  async function forgot() {
    const status = await api.forgot(fetch, "client", email)
    if (status == "ok") {
      goto("/dashboard")
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
  <title>Forgot password</title>
  <meta name="description" content="Forgot Password" />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Forgot password</h1>
  <p class="text-center text-gray-600 mt-6 max-w-3xl m-auto">
    Send you a link for password reset
  </p>

  <form
    on:submit|preventDefault={forgot}
    class="max-w-lg m-auto flex flex-col gap-4 mt-12"
  >
    {#if message}
      <div class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800">
        {message}
      </div>
    {/if}
    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={email}
      type="email"
      placeholder="Email address..."
    />

    <button
      class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
      type="submit"
      disabled={!isEmailCorrect}
    >
      Send
    </button>
  </form>
</main>
