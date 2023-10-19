<script lang="ts">
  import { goto } from "$app/navigation"
  import { api } from "$lib"

  export let open: boolean
  export let email: string

  $: {
    console.log(open)
    if (dialog) {
      if (open) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }
  }

  let emailInput = ""
  let passwordInput = ""
  let message: string | null = null
  let dialog: HTMLDialogElement

  async function deleteUserAccount() {
    if (email != emailInput) {
      message = "Невірно введений E-mail"
      return
    }

    const result = await api.deleteAccount(fetch, "client", {
      email: email,
      password: passwordInput
    })
    if (result == "success") {
      goto("/")
    } else if (result == "not-found") {
      message = "Користувача не існує"
    } else {
      message = "невірний Пароль або E-mail"
    }
  }
</script>

<dialog bind:this={dialog} class="p-8 rounded-lg text-lg max-w-2xl">
  <form
    class="flex gap-8 flex-col"
    on:submit|preventDefault={deleteUserAccount}
  >
    <p>
      Прикро що Ви лишаєте нас. Для підтвердження введіть свою електронну адресу
      і пароль.
    </p>
    {#if message != null}
      <p class="border-red-800 rounded-md p-3 px-4 bg-red-50 text-red-800">
        {message}
      </p>
    {/if}
    <input
      class="bg-transprent px-6 py-4 rounded-md border border-gray-200"
      bind:value={emailInput}
      placeholder="email"
    />

    <input
      class="bg-transprent px-6 py-4 rounded-md border border-gray-200"
      bind:value={passwordInput}
      placeholder="password"
    />

    <div class="flex gap-4 justify-end">
      <button
        type="reset"
        class="px-4 py-2 bg-brand-dark text-white rounded-md"
        on:click={() => (open = false)}
      >
        Скасувати
      </button>
      <button class="px-4 py-2 rounded-md bg-secondary-300" type="submit">
        Видалити
      </button>
    </div>
  </form>
</dialog>
