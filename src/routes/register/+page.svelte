<script lang="ts">
  import { goto } from "$app/navigation"
  import { z } from "zod"
  import { api, routes } from "$lib"

  const emailSchema = z.string().email()

  let name: string = ""
  let email: string = ""
  let password: string = ""
  let confirmPassword: string = ""

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
        if (element == "nonAlphanumeric") message = "Пароль вимагає спеціальні знаки"
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
  <title>Register at Spentoday</title>
  <meta name="description" content="Register at Spentoday to start earning money online." />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Register</h1>
  <p class="text-center text-gray-600 mt-6 max-w-3xl m-auto mb-10">
    By registering you accept our Terms of Servic and Privacy Policy. And get closer to making
    money.
  </p>

  <form on:submit|preventDefault={register} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
    {#if message}
      <div class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800">
        {message}
      </div>
    {/if}

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={name}
      placeholder="Your name"
    />

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

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={confirmPassword}
      type="password"
      placeholder="Confirm Password"
    />

    <button
      class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
      type="submit"
      disabled={isInvalid}
    >
      Register
    </button>
  </form>

  <a
    href={routes.login}
    class="underline decoration-primary-100 hover:decoration-primary-300 decoration-2
    mt-8 block text-center"
  >
    Already have an account? Login.
  </a>
</main>
