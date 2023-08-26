<script lang="ts">
  import { goto } from "$app/navigation"
  import { routes, api } from "$lib"
  import type { PageData } from "./$types"

  export let data: PageData

  let name: string = ""

  let currentPassword: string = ""
  let newPassword: string = ""
  let confirmPassword: string = ""

  let message: string | null = null
  let messageName: string | null = null
  let messagePassword: string | null = null
  let messageImage: string | null = null

  $: isInvalidName = name.trim() == ""

  $: isInvalidPassword =
    confirmPassword.trim() == "" ||
    newPassword.trim() == "" ||
    currentPassword.trim() == ""

  async function changeName() {
    const status = await api.changeName(fetch, "client", name)

    if (status == "success") {
      message = "Ім'я успішно змінено"
      messageName = ""
      goto(routes.accountSettings)
      return
    }

    if (status == "not-found") {
      messageName = "Користувач не знайдений"
      return
    }

    if (status == "fail") {
      messageName = "Сервер не відповідає"
      return
    }

    messageName = "Щось пішло не так"
  }

  async function changePassword() {
    if (newPassword != confirmPassword) {
      messagePassword = "Паролі не співпадають"
      return
    }

    const status = await api.changePassword(
      fetch,
      "client",
      currentPassword,
      newPassword,
      confirmPassword
    )

    if (status == "success") {
      message = "Пароль успішно змінений"
      messagePassword = ""
      goto(routes.accountSettings)
      return
    }

    if (status == "not-found") {
      messagePassword = "Користувач не знайдений"
      return
    }

    if (status == "fail") {
      messagePassword = "Сервер не відповідає"
      return
    }

    if (status == "passwords-mismatch") {
      messagePassword = "Паролі не співпадають"
    }

    messagePassword = "Щось пішло не так"
  }

  async function setUserImage(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const file = event.currentTarget.files?.item(0)
    if (!file) return alert("Can't upload")

    const result = await api.uploadUserImage(fetch, "client", {
      file: file
    })

    if (result.status == "success") {
      console.log(result.data)
      message = "Зображення профілю успішно змінене"
      return
    }

    if (result.status == "not-found") {
      messageImage = "Користувач не знайдений"
      return
    }

    if (result.status == "not-image") {
      messageImage = "Не зображення"
      return
    }
    messageImage = "Щось пішло не так"
  }
</script>

<svelte:head>
  <title>Налаштування</title>
</svelte:head>

<main class="min-h-[70vh] max-w-screen-xl m-auto px-6">
  <h1 class="text-4xl md:text-6xl text-center m-auto font-bold">Налаштування</h1>
  <p class="text-center text-gray-600 mt-6 max-w-3xl m-auto mb-10">
    Налаштування профілю
  </p>

  {#if message}
    <div class="px-5 py-3 border border-green-200 bg-green-100 rounded-md text-green-800">
      {message}
    </div>
  {/if}

  <form
    on:submit|preventDefault={changeName}
    class="max-w-lg m-auto flex flex-col gap-4 mt-2"
  >
    {#if messageName}
      <div class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800">
        {messageName}
      </div>
    {/if}

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={name}
      placeholder={data.name}
    />

    <button
      class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
      type="submit"
      disabled={isInvalidName}
    >
      Change name
    </button>
  </form>

  <form
    on:submit|preventDefault={changePassword}
    class="max-w-lg m-auto flex flex-col gap-4 mt-2"
  >
    {#if messagePassword}
      <div class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800">
        {messagePassword}
      </div>
    {/if}

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={currentPassword}
      type="password"
      placeholder="Enter current password"
    />

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPassword}
      type="password"
      placeholder="New Password"
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
      disabled={isInvalidPassword}
    >
      Change password
    </button>
  </form>
  <div class="max-w-lg m-auto flex flex-col gap-4 mt-2 text-center">
    <img src={data.imageUrl} alt="user-img" />
    <p>Встановити зображення профілю</p>
    <input on:change={setUserImage} id="dropzone-file" accept="image/*" type="file" />
  </div>

  <div class="max-w-sm m-auto flex flex-col gap-4 mt-2">
    <a
      title="Хочете видалити свій аккаунт? Вже залишаєте нас?"
      href={routes.accountDelete}
      class="px-8 py-2 rounded-full bg-red-400 text-center">Видалити аккаунт</a
    >
  </div>
</main>
