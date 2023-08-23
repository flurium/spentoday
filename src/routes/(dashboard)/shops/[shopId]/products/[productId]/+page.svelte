<script lang="ts">
  import slugify from "@sindresorhus/slugify"
  import type { PageData } from "./$types"
  import { api, imageSize } from "$lib"
  import { toast } from "$features/toast"

  export let data: PageData
  $: images = data.product.images
  $: categories = data.categories
  let isDraft = data.product.isDraft

  let name: string = data.product.name
  let price: number = data.product.price
  let amount: number = data.product.amount
  let description: string = data.product.description
  let seoTitle: string = data.product.seoTitle
  let seoDescription: string = data.product.seoDescription
  let seoSlug: string = data.product.seoSlug

  let status: string = "Збережено"
  let timer: number = 0

  function debounceChange() {
    status = "Пишеться"
    clearTimeout(timer)
    timer = setTimeout(change, 700)
  }

  async function change() {
    const input: api.UpdateProductInput = { id: data.productId }

    if (data.product.seoSlug != seoSlug) input.seoSlug = seoSlug.slice()
    if (data.product.seoTitle != seoTitle) input.seoTitle = seoTitle.slice()
    if (data.product.seoDescription != seoDescription) {
      input.seoDescription = seoDescription.slice()
    }
    if (data.product.name != name) input.name = name.slice()
    if (data.product.price != price) input.price = price
    if (data.product.amount != amount) input.amount = amount
    if (data.product.description != description) input.description = description

    if (Object.keys(input).length <= 1) {
      status = "Збережене"
      return
    }

    status = "Зберігається..."
    const updated = await api.updateProduct(fetch, "client", input)
    if (!updated) {
      status = "Не зберіглося"
      return
    }

    status = "Збережене"
    if (input.seoSlug) data.product.seoSlug = input.seoSlug
    if (input.seoTitle) data.product.seoTitle = input.seoTitle
    if (input.seoDescription) data.product.seoDescription = input.seoDescription
    if (input.name) data.product.name
    if (input.price) data.product.price = input.price
    if (input.amount) data.product.amount = input.amount
    if (input.description) data.product.description = input.description
  }

  async function uploadImage(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    const file = event.currentTarget.files?.item(0)
    if (!file) return

    const { width, height } = await imageSize(file)
    if (width != height) {
      return toast.push({
        title: "Лише квадратні зображення",
        description:
          "Для збереження стильного дизайну вашого магазину ми використовуємо квадратні зображення."
      })
    }

    const result = await api.uploadProductImage(fetch, "client", {
      productId: data.productId,
      file: file
    })
    if (result.status == "ok") {
      images = [result.data, ...images]
      return
    }

    if (result.status == "count-limit-reached") {
      return toast.push({
        title: "Досягнуто ліміту",
        description: "Ви вже досягли максимальної кількості зображень для цього продукту."
      })
    }

    return toast.serverError()
  }

  async function deleteImage(imageId: string) {
    const deleted = await api.deleteProductImage(fetch, "client", imageId)
    if (!deleted) return alert("Не можемо видалити зображення!")
    images = images.filter((x) => x.id != imageId)
  }

  async function publish() {
    const result = await api.publishProduct(fetch, "client", data.productId)
    if (result == "ok") {
      data.product.isDraft = false
      isDraft = false
      return
    }

    if (result == "not-found") return alert("Не можемо знайти продукт")
    alert("Не можемо опублікувати продукт")
  }

  let categoryIdToChange: string | null = data.categoryId ?? null
  async function changeCategory() {
    const changed = await api.changeProductCategory(fetch, "client", {
      productId: data.productId,
      categoryId: categoryIdToChange
    })

    if (!changed) return alert("AAAAA")
  }
</script>

<h1 class="text-3xl text-center my-10 font-semibold">Редагувати продукт</h1>

<div
  class="py-3 sticky flex justify-between top-0 max-w-3xl m-auto bg-white border-b border-gray-100"
>
  <span>{status}</span>

  {#if data.product.isDraft}
    <button
      class="underline decoration-2 decoration-secondary-300 hover:decoration-primary-400"
      on:click={publish}
    >
      Publish
    </button>
  {/if}
</div>

<section class="flex flex-col gap-4 max-w-3xl m-auto">
  <select
    bind:value={categoryIdToChange}
    on:change={changeCategory}
    class="bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
  >
    <option value={null}>No category</option>
    {#each categories as category}
      <option value={category.id}>
        {category.name}
      </option>
    {/each}
  </select>

  <div class="grid grid-cols-4 gap-2 my-4">
    {#each images as image (image.id)}
      <div>
        <img class="p-2 rounded-t bg-gray-50" src={api.imageUrl(image)} alt="Product" />
        <button
          on:click={() => deleteImage(image.id)}
          class="w-full rounded-b p-2 bg-red-100 hover:bg-red-200 text-red-800"
        >
          Delete
        </button>
      </div>
    {/each}

    {#if images.length < 12}
      <label
        for="dropzone-file"
        class="flex items-center justify-center bg-gray-100 hover:bg-gray-50
        border border-gray-300 border-dashed rounded cursor-pointer"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 font-semibold">Click to upload image</p>
        </div>
        <input
          on:change={uploadImage}
          id="dropzone-file"
          accept="image/*"
          type="file"
          class="hidden"
        />
      </label>
    {/if}
  </div>

  <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={name}
    on:keyup={debounceChange}
    placeholder="Name"
  />
  <textarea
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={description}
    on:keyup={debounceChange}
    placeholder="Опис"
    rows="10"
  />
  <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={price}
    on:keyup={debounceChange}
    type="number"
    placeholder="Price"
  />
  <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={amount}
    on:keyup={debounceChange}
    type="number"
    placeholder="Amount"
  />

  <h3 class="mt-4 text-2xl">SEO - search engine optimizations</h3>
  <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={seoSlug}
    on:keyup={debounceChange}
    on:input={() => {
      seoSlug = slugify(seoSlug.replace(" ", "-"), {
        preserveTrailingDash: true
      })
    }}
    on:change={() => {
      seoSlug = slugify(seoSlug)
    }}
    placeholder="Slug, приклад: product-name"
  />
  <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={seoTitle}
    on:keyup={debounceChange}
    placeholder="Назва"
  />
  <textarea
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={seoDescription}
    on:keyup={debounceChange}
    placeholder="Опис"
    rows="10"
  />
</section>
