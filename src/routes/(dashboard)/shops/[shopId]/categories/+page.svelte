<script lang="ts">
  import type { PageData } from "./$types"
  import { call, callJson } from "$lib/fetch"
  import type { CategoryOutput } from "$lib/api"
  import autoAnimate from "@formkit/auto-animate"
  export let data: PageData
  $: categories = data.categories
  $: editCategories = data.categories
  let modal: HTMLDialogElement
  let editCategoryParentId: string | null = null
  let editCategoryName = ""
  let editId = ""
  let categoryInput = ""
  let parentInput: string | null = null
  let message = ""
  let search = ""
  let parentName = ""

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
    const id = await callJson<string>(response)
    if (id == null) return (message = "Щось не так")

    if (parentInput == null) {
      let newCategory: CategoryOutput = {
        id: id,
        level: 1,
        parentId: "",
        name: name
      }
      categories = [...categories, newCategory]
      return
    }

    const index = categories.findIndex((x) => x.id == parentInput)

    const parentCategory = categories[index]

    let newCategory: CategoryOutput = {
      id: id,
      level: parentCategory.level + 1,
      parentId: parentCategory.id,
      name: name
    }

    if (index !== -1) {
      categories = [
        ...categories.slice(0, index + 1),
        newCategory,
        ...categories.slice(index + 1)
      ]
    }
    categoryInput = ""
    parentInput = null
  }

  async function edit(id: string) {
    const category = categories.find((x) => x.id == id)
    if (category == null) return

    const name = editCategoryName.trim()
    if (name == "") {
      message = "Ім'я категорії не можу бути пустим."
      return
    }

    let body: { [key: string]: any } = { id: category.id }
    if (name != category.name) body.name = name
    if (editCategoryParentId != category.parentId)
      body.parentId = editCategoryParentId

    const response = await call(fetch, "client", {
      route: "/v1/site/categories",
      method: "PATCH",
      body: body
    })

    if (!response) {
      message = "Не можемо змінити."
    } else if (response.ok) {
      const json = await callJson<CategoryOutput[]>(response)
      if (!json) {
        message = "Щось не так"
        return
      }

      categories = json

      editCategoryParentId = null
      editCategoryName = ""
      modal.close()
    } else if (response.status == 404) {
      message = "Категорія не знайдена в базі данних."
    } else if (response.status == 403) {
      message = "Ви не маєте дозволу на це."
    } else {
      message = "Не можемо змінити."
    }
  }

  async function remove(id: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/categories/${id}`,
      method: "DELETE"
    })
    if (!response) {
      message = "Не можемо видалити."
    } else if (response.ok) {
      const json = await callJson<CategoryOutput[]>(response)
      if (!json) {
        message = "Щось не так"
        return
      }
      categories = json

      let drop = document.getElementById(`dropdown${id}`)
      if (drop == null) return
      else drop.style.display = "none"
    } else if (response.status == 404) {
      message = "Категорія не знайдена в базі данних."
    } else if (response.status == 403) {
      message = "Ви не маєте досволу на це."
    } else {
      message = "Не можемо видалити."
    }
  }

  async function searchCategory() {
    selectCategories(editId)
    if (search == "") return

    editCategories = editCategories.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    )
  }
  function selectCategories(id: string) {
    let temp: CategoryOutput[] = []
    let isChildren = false
    let lvl = 0

    categories.forEach((category) => {
      if (id == category.id) {
        isChildren = true
        lvl = category.level
        return
      }
      if (category.level <= lvl) {
        isChildren = false
      }
      if (!isChildren) {
        temp = [...temp, category]
      }
    })

    editCategories = temp
  }
  async function toEdit(category: CategoryOutput) {
    let parent = categories.find((x) => x.id == category.parentId)
    if (parent != undefined) {
      parentName = parent.name
      editCategoryParentId = parent.id
    }
    editCategoryName = category.name
    selectCategories(category.id)
    editId = category.id
    modal.showModal()

    let drop = document.getElementById(`dropdown${category.id}`)
    if (drop == null) return
    drop.style.display = "none"
  }
</script>

<main class="px-6 mt-20">
  <form on:submit|preventDefault={add} class="w-full 2xl:flex">
    <input
      class="w-full border border-secondary-200 px-5 py-2 rounded-md lg:flex-1 lg:w-1/2"
      bind:value={categoryInput}
      placeholder="Назва категорії: Toys"
    />

    <select
      id="parent"
      bind:value={parentInput}
      class="w-full border border-secondary-200 px-5 py-2 rounded-md lg:flex-2 lg:w-1/4"
    >
      <option selected value={null}>Top level category</option>
      {#each categories as category (category.id)}
        <option value={category.id}>{category.name}</option>
      {/each}
    </select>

    <button
      class="w-full px-[1.85rem] py-2 font-semibold bg-gray-900 text-white rounded-md lg:w-1/5"
      type="submit"
    >
      Додати
    </button>
  </form>

  <ul class="mt-10">
    {#each categories as category}
      <li

      style="margin-left: {(category.level - 1)}rem"
      class="p-2 text-sm flex justify-between text-secondary-800 border-b border-secondary-200 font-medium text-left bg-white"

      >
        <h3 class="my-auto">{category.name}</h3>

        <div class="me-5">
          <button
            id="dropdownButton{category.id}"
            on:click={() => {
              let drop = document.getElementById(`dropdown${category.id}`)
              if (drop == null) return
              if (drop.style.display == "none") drop.style.display = "block"
              else drop.style.display = "none"
            }}
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </button>

          <div
            id="dropdown{category.id}"
            style="display:none;"
            class="z-50 absolute text-base list-none bg-white divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          >
            <ul class="p-4">
              <li>
                <button
                  class="hover:text-secondary-500"
                  on:click={() => {
                    toEdit(category)
                  }}
                >
                  Редагувати
                </button>
              </li>
              <li>
                <button
                  class="text-red-500 hover:text-red-300"
                  on:click={() => remove(category.id)}
                >
                  Видалити
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>

      <dialog bind:this={modal} class="p-10 w-1/2 bg-white rounded-md">
        <div class="flex justify-between">
          <div class="text-2xl font-semibold text-text-header">Редагування</div>
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
        <input
          class="py-1 px-4 my-auto border rounded-xl w-full"
          bind:value={editCategoryName}
          placeholder="Назва категорії"
        />
        {#if parentName != undefined}
          <div class="text-secondary font-medium py-2">
            Поточна батьківська категорія: {parentName}
          </div>
        {/if}
        <button
          on:click={() => edit(editId)}
          class="py-1 px-4 w-full font-semibold hover:bg-gray-900 bg-gray-800 text-white rounded-md"
          type="submit"
        >
          Підтвердити
        </button>
        <div class="my-4">
          <div class="flex border border-secondary-200 rounded-xl ps-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 m-auto text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              class="py-1 px-4 my-auto w-full"
              on:keyup={searchCategory}
              bind:value={search}
              placeholder="Пошук..."
            />
          </div>

          <div class="grid grid-flow-row" use:autoAnimate>
            <button
                  class="p-2 text-sm text-secondary-800 border-b  border-secondary-200 font-medium text-left bg-white hover:bg-gray-100"
                  on:click={() =>{ 
                  editCategoryParentId = null
                  parentName = "Top level category"}}
                >
                  Top level category
                </button>

            {#if search == ""}
              {#each editCategories as parentCategory}
                <button
                  style="margin-left: {0.75 * parentCategory.level - 1}rem"

                  class="p-2 text-sm text-secondary-800 border-b border-secondary-200 font-medium text-left bg-white hover:bg-gray-100"
                  on:click={() =>{ 
                  editCategoryParentId = parentCategory.id
                  parentName = parentCategory.name}}

                >
                  {parentCategory.name}
                </button>
              {/each}
            {:else}
              {#each editCategories as parentCategory}

                  <button
                    class="p-2 text-sm border-b  border-secondary-200 font-medium text-left bg-white hover:bg-gray-100"
                    on:click={() => { 
                      editCategoryParentId = parentCategory.id
                      parentName = parentCategory.name
                      }}
                  >
                    {parentCategory.name}
                  </button>

              {/each}
            {/if}
          </div>
        </div>
      </dialog>
    {/each}
  </ul>
</main>
