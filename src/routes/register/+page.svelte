<script lang="ts">
  import { goto } from "$app/navigation"
  import { z } from "zod"
  import { api, routes } from "$lib"

  const emailSchema = z.string().email()

  let name = ""
  let email = ""
  let password = ""
  let confirmPassword = ""

  let message: string | null = null

  $: isInvalid =
    confirmPassword.trim() == "" ||
    password.trim() == "" ||
    name.trim() == "" ||
    !emailSchema.safeParse(email).success

  async function register() {
    if (password != confirmPassword) {
      message = "Паролі не співпадають"
      return
    }

    const result = await api.register(fetch, "client", {
      name,
      email,
      password,
      confirmPassword
    })

    if (result.status == "success") {
      goto("/dashboard")
      return
    }

    if (result.status == "problem") {
      result.data.forEach((element) => {
        if (element == "email") message = `Адреса ${email} вже зайнята`
        if (element == "password-too-short") message = "Пароль занадто короткий"
        if (element == "@") message = `Адреса ${email} некоректна`
        if (element == "digit") message = "Пароль вимагає цифри"
        if (element == "lower") message = "Пароль вимагає нижній реєстр"
        if (element == "upper") message = "Пароль вимагає верхній реєстр"
        if (element == "nonAlphanumeric")
          message = "Пароль вимагає спеціальні знаки"
      })
      return
    }

    if (result.status == "password-mismatch") {
      message = "Паролі не співпадають"
      return
    }

    message = "Щось пішло не так"
  }
</script>

<svelte:head>
  <title>Реєстрація в Spentoday</title>
  <meta
    name="description"
    content="Register at Spentoday to start earning money online."
  />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Реєстрація</h1>
  <p class="text-center text-text-main mt-6 max-w-3xl m-auto mb-10">
    Реєструючись, Ви приймаєте наші Умови обслуговування та Політику
    конфіденційності. І станете на крок ближче до заробітку грошей.
  </p>

  <form
    on:submit|preventDefault={register}
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
      class="block border my-2 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={name}
      placeholder="Ваше ім'я"
    />

    <input
      class="block border my-2 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={email}
      type="email"
      placeholder="Електронна пошта"
    />

    <input
      class="block border my-2 px-5 py-4 rounded-md border-secondary-200 w-full"
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
       hover:bg-primary-400 disabled:text-text-main rounded-full w-fit mx-auto text-center"
      type="submit"
      disabled={isInvalid}
    >
      ПОЧАТИ
    </button>
  </form>

  <div
    class="text-lg decoration-primary-200 hover:decoration-primary-300 decoration-2 my-6 block text-center"
  >
    Вже маєте аккаунт?
    <a
      class="underline
      mt-8 text-green-600"
      href={routes.login}
    >
      Увійти!
    </a>
  </div>
</main>
