<script lang="ts">
  import autoAnimate from "@formkit/auto-animate"
  import ClickableCategories from "./ClickableCategories.svelte"
  import { toast } from "$features/toast"
  import { call, callJson } from "$lib/fetch"
  import type { CategoryOutput } from "."

  export let shopId: string
  export let categories: CategoryOutput[]
  export let pushCategoryToList: (
    id: string,
    name: string,
    parentId: string | null
  ) => void

  let categoryInput = ""
  let search = ""

  $: filteredCategories =
    search == ""
      ? categories
      : categories.filter((x) =>
          x.name.toLocaleLowerCase().includes(search.toLowerCase())
        )

  let parent: { id: string | null; name: string } = { id: null, name: "" }

  let modal: HTMLDialogElement

  async function postCategoryToApi() {
    const name = categoryInput.trim()
    if (name == "") {
      toast.push({ title: "Ім'я категорії не можу бути пустим" })
      return
    }

    const response = await call(fetch, "client", {
      route: "/v1/site/categories",
      method: "POST",
      body: {
        name: name,
        shopId: shopId,
        parentId: parent.id
      }
    })
    if (!response || !response.ok) return toast.serverError()

    const id = await callJson<string>(response)
    if (id == null) return toast.jsonError()

    pushCategoryToList(id, name, parent.id)

    categoryInput = ""
    search = ""
    parent = { id: null, name: "" }
  }
</script>

<div class="flex flex-col md:flex-row gap-4">
  <input
    class="w-full border border-secondary-200 px-6 py-2 rounded-md flex-1"
    bind:value={categoryInput}
    placeholder="Назва категорії: Іграшки"
  />

  <button
    class="px-6 py-2 bg-brand-violet text-white rounded-md"
    on:click={() => modal.showModal()}
  >
    {parent.name == "" ? "Без батьківської категорії" : parent.name}
  </button>

  <dialog bind:this={modal} class="p-10 w-full max-w-4xl bg-white rounded-md">
    <div class="flex justify-between">
      <div class="text-sm sm:text-2xl font-semibold text-text-header">
        Батьківська категорія
      </div>
      <button on:click={() => modal.close()} type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    {#if parent.name != ""}
      <div class="text-secondary font-medium py-2">
        Поточна батьківська категорія: {parent.name}
      </div>
    {/if}

    <div
      class="flex items-center border border-secondary-200
        rounded-md overflow-hidden ps-3 mt-4 mb-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-gray-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        class="py-2 px-3 flex-1"
        bind:value={search}
        placeholder="Пошук..."
      />
    </div>

    <div class="flex flex-col text-text-main mt-2" use:autoAnimate>
      {#if search == ""}
        <button
          class="p-3 border-b border-secondary-100
        text-left hover:bg-secondary-100"
          on:click={() => {
            parent = { id: null, name: "" }
          }}
        >
          Без батьківської категорії
        </button>
      {/if}
      <ClickableCategories
        isTree={search == ""}
        categories={filteredCategories}
        onClick={(x) => {
          parent = { id: x.id, name: x.name }
        }}
      />
    </div>
  </dialog>

  <button
    on:click={async () => {
      modal.close()
      await postCategoryToApi()
    }}
    class="px-6 py-2 bg-brand-dark text-white rounded-md"
    type="submit"
  >
    Додати
  </button>
</div>
