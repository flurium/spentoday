<script lang="ts">
  import { goto } from "$app/navigation"
  import { api } from "$lib"
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
    const status = await api.reset(fetch, "client", {
      email: data.user,
      token: data.token,
      password: password,
      confirmPassword: confirmPassword
    })
    if (status == "ok") {
      goto("/login")
      return
    }
    if (status == "email-not-found") {
      message = "Такої адреси не існує"
      return
    }
    if (status == "passwords-mismatch") {
      message = "Паролі не збігаються, підтвердьте свій пароль."
      return
    }
    message = "Сервер впав. Зараз підіймемо."
  }
</script>

<main class="min-h-[70vh] max-w-screen-xl m-auto px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">
    Reset Password
  </h1>
  <p class="text-center text-text-main mt-6 max-w-3xl m-auto mb-10">
    Create and confirm your new password
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
         hover:bg-primary-400 disabled:text-text-input rounded-md"
      type="submit"
      disabled={isInvalid}
    >
      Ok
    </button>
  </form>
</main>
