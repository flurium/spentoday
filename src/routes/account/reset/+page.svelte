<script lang="ts">
  import { goto } from "$app/navigation"
  import { api, routes } from "$lib"
  import type { PageData } from "./$types"

  export let data: PageData

  let password = ""
  let confirmPassword = ""

  let message: string | null = null

  $: isInvalid = confirmPassword.trim() == "" || password.trim() == ""

  async function reset() {
    if (password != confirmPassword) {
      message = "Паролі не збігаються, підтвердьте свій пароль."
      return
    }
    const result = await api.reset(fetch, "client", {
      email: data.user,
      token: data.token,
      password: password,
      confirmPassword: confirmPassword
    })
    if (result.status == "success") {
      goto(routes.login)
      return
    }

    if (result.status == "problem") {
      result.data.forEach((element) => {
        if (element == "password-too-short") message = "Пароль занадто короткий"
        if (element == "digit") message = "Пароль вимагає цифри"
        if (element == "lower") message = "Пароль вимагає нижній реєстр"
        if (element == "upper") message = "Пароль вимагає верхній реєстр"
        if (element == "nonAlphanumeric")
          message = "Пароль вимагає спеціальні знаки"
      })
      return
    }

    if (result.status == "password-mismatch") {
      message = "Паролі не збігаються, підтвердьте свій пароль."
      return
    }
    message = "Сервер впав. Зараз підіймемо."
  }
</script>

<svelte:head>
  <title>Відновлення пароля</title>
  <meta name="description" content="Reset password" />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto p-10 my-5 w-fit">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">
    Відновлення пароля
  </h1>
  <p class="text-center text-text-main mt-6 max-w-3xl m-auto mb-10">
    Створіть і підтвердьте новий пароль
  </p>

  <form
    on:submit|preventDefault={reset}
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
      class="block border mt-2 mb-3 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={password}
      type="password"
      placeholder="Пароль"
    />

    <input
      class="block border mt-2 mb-3 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={confirmPassword}
      type="password"
      placeholder="Підтвердити пароль"
    />

    <button
      class="bg-brand-green disabled:bg-gray-100 font-semibold px-10 py-3 text-white
       hover:bg-primary-400 disabled:text-text-main rounded-full w-fit mx-auto"
      type="submit"
      disabled={isInvalid}
    >
      Відновити доступ
    </button>
  </form>
</main>
