<script lang="ts">
  import type { PageData } from "./$types"
  import type { ShopCategory } from "./+page"
  import { call, callJson } from "$lib/fetch"

  export let data: PageData
  $: categories = data.categories

  let editCategoryId: string | null = null
  let categoryInput: string = ""
  let parentInput: string | null = null
  let message: string = ""

  async function submit() {
    if (editCategoryId == null) add()
    else edit()
  }

  async function add() {
    const name = categoryInput.trim()
    if (name == "") {
      message = "Ім'я категорії не можу бути пустим."
      return
    }

    const response = await call(fetch, "client", {
      route: "/v1/site/categories",
      method: "POST",
      body: {
        name: name,
        shopId: data.shopId,
        parentId: parentInput
      }
    })
    if (!response || !response.ok) {
      message = "Щось не так"
      return
    }

    const json = await callJson<ShopCategory>(response)
    if (!json) {
      message = "Щось не так"
      return
    }

    categories.push(json)
    categories = categories
    editCategoryId = null
    categoryInput = ""
    parentInput = ""
  }

  async function edit() {
    const category = categories.find((x) => x.id == editCategoryId)
    if (category == null) return

    const name = categoryInput.trim()
    if (name == "") {
      message = "Ім'я категорії не можу бути пустим."
      return
    }

    let body: { [key: string]: any } = { id: category.id }
    console.log(name, category.name)
    if (name != category.name) body.name = name
    if (parentInput != category.parentId) body.parentId = parentInput

    const response = await call(fetch, "client", {
      route: "/v1/site/categories",
      method: "PATCH",
      body: body
    })

    if (!response) {
      message = "Не можемо змінити."
    } else if (response.ok) {
      const json = await callJson<ShopCategory>(response)
      if (!json) {
        message = "Щось не так"
        return
      }
      category.name = json.name
      category.parentId = json.parentId
      categories = categories
    } else if (response.status == 404) {
      message = "Категорія не знайдена в базі данних."
    } else if (response.status == 403) {
      message = "Ви не маєте досволу на це."
    } else {
      message = "Не можемо змінити."
    }
  }

  async function turnEdit(id: string) {
    const category = categories.find((x) => x.id == id)
    if (category == null) return

    editCategoryId = id
    categoryInput = category.name
    parentInput = category.parentId
  }

  async function remove(id: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/categories/${id}`,
      method: "DELETE"
    })
    if (!response) {
      message = "Не можемо видалити."
    } else if (response.ok) {
      categories = categories.filter((x) => x.id != id)
    } else if (response.status == 404) {
      message = "Категорія не знайдена в базі данних."
    } else if (response.status == 403) {
      message = "Ви не маєте досволу на це."
    } else {
      message = "Не можемо видалити."
    }
  }
</script>

<header />
<main class="px-6 mt-20">
  <form on:submit|preventDefault={submit} class="max-w-xl m-auto flex flex-col gap-6">
    <h3>{editCategoryId ? "Edit" : "Add new category"}</h3>
    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
      bind:value={categoryInput}
      placeholder="Category name: Toys"
    />
    <div>
      <label class="block mb-2" for="parent">Parent:</label>

      <select
        id="parent"
        bind:value={parentInput}
        class="bg-gray-100 block w-full focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
      >
        <option selected value={null}>Top level category</option>
        {#each categories as category (category.id)}
          {#if category.id != editCategoryId}
            <option value={category.id}>{category.name}</option>
          {/if}
        {/each}
      </select>
    </div>
    <button
      class="px-6 py-3 font-semibold hover:bg-gray-900 bg-gray-800 text-white rounded-md"
      type="submit"
    >
      {editCategoryId ? "Confirm" : "Add"}
    </button>
  </form>

  <ul class="mt-10">
    {#each categories as category}
      <li class="p-4 mb-4 border-2 rounded-md border-gray-100 flex justify-between">
        <h3>{category.name}</h3>
        {#if category.parentId}
          <span>
            parent:
            {categories.find((x) => x.id == category.parentId)?.name}
          </span>
        {/if}
        <button
          class="underline decoration-2 decoration-yellow-300 hover:decoration-yellow-500"
          on:click={() => turnEdit(category.id)}
        >
          Edit
        </button>
        <button
          class="underline decoration-2 decoration-red-300 hover:decoration-red-500"
          on:click={() => remove(category.id)}
        >
          Delete
        </button>
      </li>
    {/each}
  </ul>
</main>
