<script lang="ts">
  import { goto } from "$app/navigation"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import { routes, api } from "$lib"
  import { deleteAccount } from "$lib/api"
  import { call } from "$lib/fetch"
  import type { PageData } from "./$types"

  export let data: PageData
  let name = data.name

  let fileInput: any

  let message: string | null = null
  let messageName: string | null = null
  let messageImage: string | null = null
  let messageDelete: string | null = null

  let timer = 0

  let accountDeleteEmailConfirm = ""
  let accountDeletePasswordConfirm = ""

  let newPageModal: HTMLDialogElement

  function debounceChange() {
    clearTimeout(timer)
    timer = setTimeout(changeName, 1000)
  }

  async function changeName() {
    const status = await api.changeName(fetch, "client", name)

    if (status == "success") {
      message = "Ім'я успішно змінено"
      messageName = ""
      data.name = name
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

  async function setUserImage(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const file = event.currentTarget.files?.item(0)
    if (!file) return alert("Can't upload")

    const result = await api.uploadUserImage(fetch, "client", {
      file: file
    })

    if (result.status == "success") {
      data.imageUrl = result.data
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

  async function deleteUserImage() {
    const result = await call(fetch, "client", {
      route: `/v1/site/account/image`,
      method: `DELETE`
    })

    if (result == null) {
      message = "Щось пішло не так"
      return
    }

    if (result.ok) {
      data.imageUrl = ""
      message = "Зображення профілю успішно видалене"
      return
    }

    message = "Щось пішло не так"
  }
  async function deleteUserAccount() {
    if (data.email != accountDeleteEmailConfirm) {
      messageDelete = "Невірно введений E-mail"
      return
    }

    const result = await deleteAccount(
      fetch,
      "client",
      data.email,
      accountDeletePasswordConfirm
    )

    if (result == "not-found") {
      messageDelete = "Користувача не існує"
      return
    }

    if (result == "fail") {
      messageDelete = "невірний Пароль або E-mail"
      return
    }

    if (result == "success") {
      goto("/")
    }
  }
</script>

<svelte:head>
  <title>Налаштування</title>
</svelte:head>

<div class="max-w-screen-xl m-auto px-6 pt-8 pb-16">
  <button
    on:click={() => window.history.back()}
    class=" w-full mt-6 text-3xl inline-flex md:text-3xl text-center m-auto font-bold border-b border-gray-300"
  >
    <div class="m-6 mr-0 ml-0">
      <span class="h-8 w-8 self-center font-sans">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-10 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
    </div>
    <div class="m-6 ml-0">Налаштування профілю</div>
  </button>

  {#if message}
    <div
      class="py-5 px-6 my-8 text-sm text-text-header bg-brand-green
      bg-opacity-50 rounded-xl w-full"
    >
      {message}
    </div>
  {/if}

  <DashboardSection class="mt-7">
    <div class="mx-auto text-center w-fit grid grid-row-2 gap-4">
      <div class="relative inline-block">
        <img
          class="inline-block object-cover w-40 h-40 rounded-full bg-slate-600"
          src={data.imageUrl}
          alt="user-img"
        />
        <button
          on:click={() => fileInput.click()}
          class="absolute bottom-3 right-3 inline-block bg-white border-white rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 relative h-6 m-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
          <input
            bind:this={fileInput}
            on:change={setUserImage}
            class="hidden"
            id="dropzone-file"
            accept="image/*"
            type="file"
          />
        </button>
      </div>
      <button
        on:click={deleteUserImage}
        class="w-fit mx-auto mb-1 px-3 py-1 bg-transprent text-xs font-bold text-brand-violet uppercase"
      >
        Видалити фото
      </button>
    </div>

    <div class="border-b border-secondary-100 w-full my-7" />

    <div class="flex flex-col gap-3">
      {#if messageName}
        <div
          class="px-5 py-3 border border-red-200 bg-red-100 rounded-md text-red-800"
        >
          {messageName}
        </div>
      {/if}

      <label for="name" class="text-secondary-400">Ваше Ім'я</label>
      <input
        id="name"
        class="px-6 py-4 rounded-md border border-secondary-200"
        on:change={debounceChange}
        bind:value={name}
        placeholder="Ваше Ім'я"
      />
    </div>

    <div class="border-b border-secondary-100 w-full my-7" />

    <p class="text-secondary-400 mb-3">E-mail</p>
    <p>
      {data.email}
    </p>

    <div class="border-b border-secondary-100 w-full my-7" />

    <p class="text-secondary-400 mb-3">Пароль</p>
    <div class="flex justify-between">
      <span>**********</span>
      <a
        href="/account/reset"
        class="border-b border-brand-violet font-semibold text-brand-violet"
      >
        Змінити
      </a>
    </div>

    <div class="border-b border-secondary-100 w-full my-7" />

    <div class="grid gap-4 grid-row-2 md:grid-cols-2">
      <div>
        <p class="text-xl font-bold text-secondary-700">Ваші магазини</p>
        <p class="text-secondary-400">
          Перегляд і доступ до магазинів, підключених до вашого Spentoday ID
        </p>
      </div>

      <div class="border border-secondary-200 rounded-xl p-5">
        <a
          href={routes.dashboard}
          class="font-bold text-brand-dark
          border-b border-brand-dark"
        >
          Подивитися всі магазини
        </a>
      </div>
    </div>

    <div class="border-b border-secondary-100 w-full my-7" />

    <button
      on:click={() => newPageModal.showModal()}
      class="border-b border-brand-violet font-bold text-brand-violet"
    >
      Видалити аккаунт
    </button>
  </DashboardSection>

  <dialog
    bind:this={newPageModal}
    class="p-10 bg-white text-lg rounded-md max-w-2xl"
  >
    <form
      class="flex gap-8 flex-col"
      on:submit|preventDefault={deleteUserAccount}
    >
      <h3>
        Щоб видалити цей аккаунт вам треба ввести свій E-mail та Пароль від
        цього аккаунту.
      </h3>
      {#if messageDelete != null}
        <p class="border-red-800 rounded-md p-3 px-4 bg-red-50 text-red-800">
          {messageDelete}
        </p>
      {/if}
      <input
        class="bg-transprent px-6 py-4 rounded-md border border-gray-200"
        bind:value={accountDeleteEmailConfirm}
        placeholder="email"
      />

      <input
        class="bg-transprent px-6 py-4 rounded-md border border-gray-200"
        bind:value={accountDeletePasswordConfirm}
        placeholder="password"
      />

      <div class="gap-4 items-end">
        <button
          type="reset"
          class="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-md"
          on:click={() => newPageModal.close()}
        >
          Скасувати
        </button>
        <button
          class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
          type="submit"
        >
          Видалити
        </button>
      </div>
    </form>
  </dialog>
</div>
