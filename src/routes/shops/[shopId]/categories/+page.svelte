<script lang="ts">
  import type { PageData } from "./$types"
  import { call, callJson } from "$lib/fetch"
  import autoAnimate from "@formkit/auto-animate"

  import ClickableCategories from "$features/dashboard/categories/ClickableCategories.svelte"
  import type { Category } from "$features/dashboard/categories"
  import AddCategoryForm from "$features/dashboard/categories/AddCategoryForm.svelte"
  import CategoriesList from "$features/dashboard/categories/CategoriesList.svelte"
  import { toast } from "$features/toast"

  export let data: PageData

  let categories = data.categories
  let editCategories = data.categories
  let modal: HTMLDialogElement
  let editCategoryParentId: string | null = null
  let editCategoryName = ""
  let editId = ""
  let search = ""
  let parentName = ""

  async function edit(id: string) {
    const category = categories.find((x) => x.id == id)
    if (category == null) return

    const name = editCategoryName.trim()
    if (name == "") {
      toast.push({ title: "Ім'я категорії не можу бути пустим." })
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

    if (!response) return toast.push({ title: "Не можемо змінити." })

    if (response.ok) {
      const json = await callJson<Category[]>(response)
      if (!json) return toast.jsonError()

      categories = json

      editCategoryParentId = null
      editCategoryName = ""
      modal.close()
      return
    }
    if (response.status == 404) {
      return toast.push({ title: "Категорія не знайдена в базі данних." })
    }
    if (response.status == 403) {
      return toast.push({ title: "Ви не маєте дозволу на це." })
    }
    return toast.push({ title: "Не можемо змінити." })
  }

  async function remove(id: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/categories/${id}`,
      method: "DELETE"
    })
    if (!response) return toast.push({ title: "Не можемо видалити." })

    if (response.ok) {
      const json = await callJson<Category[]>(response)
      if (!json) return toast.jsonError()

      categories = json
      editCategories = json
      let drop = document.getElementById(`dropdown${id}`)
      if (drop == null) return
      else drop.style.display = "none"
      return
    }
    if (response.status == 404) {
      return toast.push({ title: "Категорія не знайдена в базі данних." })
    }
    if (response.status == 403) {
      return toast.push({ title: "Ви не маєте досволу на це." })
    }
    return toast.push({ title: "Не можемо видалити." })
  }

  async function searchCategory() {
    selectCategories(editId)
    if (search == "") return

    editCategories = editCategories.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    )
  }
  function selectCategories(id: string) {
    let temp: Category[] = []
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
  async function toEdit(category: Category) {
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

  function addCategory(id: string, name: string, parentId: string | null) {
    if (parentId == null) {
      categories = [
        ...categories,
        {
          id,
          level: 1,
          parentId: "",
          name
        }
      ]
      return
    }

    const index = categories.findIndex((x) => x.id == parentId)
    const parentCategory = categories[index]

    let newCategory: Category = {
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
  }
</script>

<h1 class="font-bold text-3xl text-text-header mb-8">Категорії</h1>

<AddCategoryForm
  shopId={data.shopId}
  pushCategoryToList={addCategory}
  {categories}
/>

<CategoriesList {categories} edit={toEdit} {remove} />

<dialog bind:this={modal} class="p-10 w-full max-w-4xl bg-white rounded-md">
  <div class="flex justify-between mb-4">
    <div class="text-2xl font-semibold text-text-header">Редагування</div>
    <button on:click={() => modal.close()}>
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
    class="px-5 py-2 my-auto border rounded-md w-full"
    bind:value={editCategoryName}
    placeholder="Назва категорії"
  />

  {#if parentName == ""}
    <p class="py-4">Без батьківської категорії</p>
  {:else}
    <p class="py-4">
      Батьківська категорія: {parentName}
    </p>
  {/if}

  <button
    on:click={() => edit(editId)}
    class="py-2 px-4 w-full bg-brand-green text-white rounded-md"
    type="submit"
  >
    Підтвердити
  </button>

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
      on:keyup={searchCategory}
      bind:value={search}
      placeholder="Пошук..."
    />
  </div>

  <div class="flex flex-col text-text-main" use:autoAnimate>
    <ClickableCategories
      isTree={search == ""}
      categories={editCategories}
      onClick={(x) => {
        editCategoryParentId = x.id
        parentName = x.name
      }}
    />
  </div>
</dialog>
