<script lang="ts">
  import { goto } from "$app/navigation"
  import { api, routes } from "$lib"
  import { z } from "zod"

  const emailSchema = z.string().email()

  let email = ""
  let password = ""
  let message: string | null = null

  $: isEmailCorrect = emailSchema.safeParse(email).success

  async function login() {
    const loginStatus = await api.login(fetch, "client", email, password)

    if (loginStatus == "ok") {
      goto(routes.dashboard)
      return
    }

    if (loginStatus == "bad-password") {
      message = "Пароль не вірний"
      return
    }

    if (loginStatus == "email-not-found") {
      message = "Користувач із вказаною електронною адресою не знайдений."
      return
    }

    message = "Зараз ми не можемо увійти. Спробуйте пізніше!"
  }
</script>

<svelte:head>
  <title>Вхід | Spentoday</title>
  <meta
    name="description"
    content="Увійдіть на Spentoday, щоб почати заробляти гроші онлайн."
  />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Вхід</h1>
  <p class="text-center text-text-main mt-6 max-w-3xl m-auto">
    Увійшовши в систему, Ви приймаєте наші Умови обслуговування та Політику
    конфіденційності. І станете на крок ближче до заробітку грошей.
  </p>

  {#if message}
    <div class="text-xl text-red-500">
      {message}
    </div>
  {/if}

  <form
    on:submit|preventDefault={login}
    class="max-w-lg m-auto flex flex-col gap-4 mt-12 items-center"
  >
    <input
      class="block border my-2 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={email}
      type="email"
      placeholder="Електронна пошта"
    />

    <input
      class="block border mt-2 mb-0 px-5 py-4 rounded-md border-secondary-200 w-full"
      bind:value={password}
      type="password"
      placeholder="Пароль"
    />

    <a
      href={routes.accountForgot}
      class="underline decoration-primary-200 hover:decoration-primary-300 decoration-2
      my-6 block text-center text-md"
    >
      Забули пароль?
    </a>

    <button
      class="bg-brand-green disabled:bg-gray-100 font-semibold px-10 py-3 text-white
       hover:bg-primary-400 disabled:text-text-main rounded-full w-fit text-center"
      type="submit"
      disabled={password.trim() == "" || !isEmailCorrect}
    >
      ПОЧАТИ
    </button>
  </form>

  <div
    class="text-lg decoration-primary-200 hover:decoration-primary-300 decoration-2 mt-8 block text-center"
  >
    Немає облікового запису?
    <a
      class="underline
      mt-8 text-green-600"
      href={routes.register}
    >
      Зареєструватися!
    </a>
  </div>
</main>
