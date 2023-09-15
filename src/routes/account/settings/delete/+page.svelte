<script lang="ts">
  import { goto } from "$app/navigation"
  import { z } from "zod"
  import { api } from "$lib"

  const emailSchema = z.string().email()

  let email: string = ""
  let password: string = ""

  let message: string | null = null

  $: isInvalid = password.trim() == "" || !emailSchema.safeParse(email).success

  async function deleteAccount() {
    const status = await api.deleteAccount(fetch, "client", email, password)

    if (status == "success") {
      goto("/login")
      return
    }

    if (status == "not-found") {
      message = "Користувач не знайдений"
      return
    }

    if (status == "fail") {
      message = "Сервер не відповідає"
      return
    }

    message = "Щось пішло не так"
  }
</script>

<svelte:head>
  <title>Видалити аккаунт</title>
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Видалити</h1>
  <p class="text-center text-gray-600 mt-6 max-w-3xl m-auto mb-10">
    Прикро що Ви лишаєте нас. Для підтвердження введіть свою електронну адресу і
    пароль.
  </p>

  <form
    on:submit|preventDefault={deleteAccount}
    class="max-w-lg m-auto flex flex-col gap-4 mt-2"
  >
    {#if message}
      <div
        class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800"
      >
        {message}
      </div>
    {/if}

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={email}
      type="email"
      placeholder="Email address..."
    />

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={password}
      type="password"
      placeholder="Password"
    />

    <button
      class="bg-red-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-red-300 disabled:text-gray-400 rounded-md"
      type="submit"
      disabled={isInvalid}
    >
      Видалити аккаунт
    </button>
  </form>
</main>
