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
      message = "Password is incorrect."
      return
    }

    if (loginStatus == "email-not-found") {
      message = "User with provided email isn't found."
      return
    }

    message = "We can't login you right now. Try later!"
  }
</script>

<svelte:head>
  <title>Login to Spentoday</title>
  <meta
    name="description"
    content="Login to Spentoday to start earning money online."
  />
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto pt-20 px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Login</h1>
  <p class="text-center text-gray-600 mt-6 max-w-3xl m-auto">
    By login you accept our Terms of Servic and Privacy Policy. And get closer
    to making money.
  </p>

  {#if message}
    <div class="text-xl text-red-500">
      {message}
    </div>
  {/if}

  <form
    on:submit|preventDefault={login}
    class="max-w-lg m-auto flex flex-col gap-4 mt-12"
  >
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
      class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
      type="submit"
      disabled={password.trim() == "" || !isEmailCorrect}
    >
      Login
    </button>
  </form>

  <a
    href={routes.register}
    class="underline decoration-primary-200 hover:decoration-primary-300 decoration-2
      mt-8 block text-center"
  >
    Don't have an account? Register.
  </a>

  <a
    href={routes.accountForgot}
    class="underline decoration-primary-200 hover:decoration-primary-300 decoration-2
      mt-8 block text-center"
  >
    Forgot Password
  </a>
</main>
