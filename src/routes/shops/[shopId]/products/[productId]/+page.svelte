<script lang="ts">
  import type { PageData } from "./$types"
  import { api, imageSize, routes } from "$lib"
  import { toast } from "$features/toast"
  import { slug } from "$lib/slug"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import Arrow from "$features/landing/questions/Arrow.svelte"
  import { convertToWebP } from "$features/dashboard/settings/webp"
  import { call } from "$lib/fetch"
  import autoAnimate from "@formkit/auto-animate"
  import PropertyEdit from "$features/dashboard/products/PropertyEditList.svelte"
  import {
    deleteProductImage,
    publishProduct,
    unpublishProduct,
    updateProduct,
    uploadProductImage,
    type UpdateProductInput
  } from "$features/dashboard/products/api"
  import ClickableCategories from "$features/dashboard/categories/ClickableCategories.svelte"

  export let data: PageData

  let modal: HTMLDialogElement
  let images = data.product.images
  let categories = data.categories
  let currentCategory = data.category
  let isDraft = data.product.isDraft
  let search = ""
  let name = data.product.name
  let price = data.product.price
  let discountPrice = data.product.discountPrice
  let isDiscount = data.product.isDiscount
  let amount = data.product.amount
  let description: string = data.product.description
  let seoTitle: string = data.product.seoTitle
  let seoDescription: string = data.product.seoDescription
  let seoSlug = data.product.seoSlug

  let savingStatus = "Збережено"
  let savingTimer = 0

  function debounceChange() {
    savingStatus = "Пишеться"
    clearTimeout(savingTimer)
    savingTimer = setTimeout(change, 700)
  }

  async function change() {
    const input: UpdateProductInput = {
      id: data.productId,
      isDiscount: isDiscount
    }

    if (data.product.seoSlug != seoSlug) input.seoSlug = seoSlug.slice()
    if (data.product.seoTitle != seoTitle) input.seoTitle = seoTitle.slice()
    if (data.product.seoDescription != seoDescription) {
      input.seoDescription = seoDescription.slice()
    }
    if (data.product.name != name) input.name = name.slice()
    if (data.product.price != price) input.price = price
    if (data.product.discountPrice != discountPrice)
      input.discountPrice = discountPrice
    if (data.product.amount != amount) input.amount = amount
    if (data.product.description != description) input.description = description

    if (Object.keys(input).length <= 1) {
      savingStatus = "Збережене"
      return
    }

    savingStatus = "Зберігається..."
    const updated = await updateProduct(fetch, "client", input)
    if (!updated) {
      savingStatus = "Не зберіглося"
      return
    }

    savingStatus = "Збережене"
    if (input.seoSlug) data.product.seoSlug = input.seoSlug
    if (input.seoTitle) data.product.seoTitle = input.seoTitle
    if (input.seoDescription) data.product.seoDescription = input.seoDescription
    if (input.name) data.product.name
    if (input.price) data.product.price = input.price
    if (input.discountPrice) data.product.discountPrice = input.discountPrice
    if (input.amount) data.product.amount = input.amount
    if (input.description) data.product.description = input.description
    data.product.isDiscount = isDiscount
  }

  async function uploadImage(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
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

    let fileToUpload: File
    try {
      fileToUpload = await convertToWebP(file)
    } catch {
      fileToUpload = file
    }

    const result = await uploadProductImage(fetch, "client", {
      productId: data.productId,
      file: fileToUpload
    })
    if (result.status == "ok") {
      images = [result.data, ...images]
      return
    }

    if (result.status == "count-limit-reached") {
      return toast.push({
        title: "Досягнуто ліміту",
        description:
          "Ви вже досягли максимальної кількості зображень для цього продукту."
      })
    }

    return toast.serverError()
  }

  async function deleteImage(imageId: string) {
    const deleted = await deleteProductImage(fetch, "client", imageId)
    if (!deleted) return alert("Не можемо видалити зображення!")
    images = images.filter((x) => x.id != imageId)
  }

  async function publish() {
    const result = await publishProduct(fetch, "client", data.productId)
    if (result == "ok") {
      data.product.isDraft = false
      isDraft = false
      return
    }

    if (result == "not-found") return alert("Не можемо знайти продукт")
    alert("Не можемо опублікувати продукт")
  }

  async function unpublish() {
    const result = await unpublishProduct(fetch, "client", data.productId)
    if (result == "ok") {
      data.product.isDraft = true
      isDraft = true
      return
    }

    if (result == "not-found") return alert("Не можемо знайти продукт")
    alert("Не можемо опублікувати продукт")
  }

  async function searchCategory() {
    categories = data.categories.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    )
    if (search == "") categories = data.categories
  }

  async function setCategory(categoryId: string) {
    const response = await call(fetch, "load", {
      route: `/v1/site/products/categories`,
      method: "PATCH",
      body: {
        productId: data.productId,
        categoryId: categoryId
      }
    })
    if (!response) return
    currentCategory = categories.filter((x) => x.id == categoryId)[0]
  }
</script>

<svelte:head>
  <title>Продукт: {data.product.name} | Spentoday</title>
</svelte:head>

<div class="flex gap-2 my-10 items-center">
  <div class="cursor-pointer">
    <a href={routes.products(data.shopId)}>
      <Arrow class="-rotate-90" />
    </a>
  </div>
  <h1 class="text-3xl font-semibold text-text-header">Редагувати продукт</h1>
</div>

<span>{savingStatus}</span>
<div class="grid grid-cols-1 xl:grid-cols-3 gap-4 my-4">
  <div class="col-span-2">
    <DashboardSection class="mb-4">
      <label class="text-2xl font-semibold text-text-header" for="nameInput">
        Назва
      </label>
      <input
        class="block border my-4 px-5 py-2 rounded-md border-secondary-200 w-full"
        id="nameInput"
        bind:value={name}
        on:keyup={debounceChange}
        placeholder="Назва"
      />

      <label class="text-2xl font-semibold text-text-header" for="descInput">
        Опис
      </label>
      <textarea
        class="block border my-4 px-5 py-2 rounded-md border-secondary-200 w-full"
        id="descInput"
        bind:value={description}
        on:keyup={debounceChange}
        placeholder="Опис"
        rows="10"
      />
    </DashboardSection>

    <PropertyEdit
      class="mb-4"
      properties={data.properties}
      productId={data.productId}
    />

    <DashboardSection class="my-4">
      <label class="text-2xl font-semibold text-text-header" for="mediaInput">
        Медіа
      </label>
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-2 my-4 items-center justify-center"
        id="mediaInput"
      >
        {#each images as image (image.id)}
          <div>
            <img
              class="p-2 rounded-t bg-gray-50"
              src={api.imageUrl(image)}
              alt="Product"
            />
            <button
              on:click={() => deleteImage(image.id)}
              class="w-full rounded-b p-2 bg-red-100 hover:bg-red-200 text-red-800"
            >
              Видалити
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
                class="w-8 h-8 mb-4 text-text-main"
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
              <p class="mb-2 text-sm text-text-main font-semibold">
                Додати фото
              </p>
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
    </DashboardSection>

    <DashboardSection class="my-4">
      <div class="flex flex-col gap-4 max-w-3xl">
        <label
          class="text-2xl font-semibold text-text-header"
          for="categorySelect"
        >
          Організація товарів
        </label>

        <div class="flex justify-between">
          <div class="text-sm text-secondary-400">
            Шукайте та встановлюйте категорії для продукту
          </div>
          <button on:click={() => modal.showModal()} class="w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="purple-700"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        {#if currentCategory != undefined}
          <div
            class="py-2 px-4 text-sm text-white bg-brand-violet border-none rounded-3xl w-fit"
          >
            {currentCategory.name}
          </div>
        {/if}
      </div>
    </DashboardSection>

    <dialog bind:this={modal} class="p-10 w-full max-w-4xl bg-white rounded-md">
      <div class="flex justify-between">
        <h3 class="text-2xl font-semibold text-text-header">Категорії</h3>
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

      <div class="flex flex-col" use:autoAnimate>
        {#if currentCategory != undefined}
          <p class="font-medium py-3 border-b border-secondary-100">
            Поточна категорія: {currentCategory.name}
          </p>
        {/if}

        <ClickableCategories
          isTree={search == ""}
          onClick={(x) => setCategory(x.id)}
          {categories}
        />
      </div>
    </dialog>

    <DashboardSection class="my-4">
      <div class="flex flex-col gap-4 max-w-3xl" id="seo">
        <label class="text-2xl font-semibold my-3 text-text-header" for="seo">
          SEO
        </label>

        <label
          class="text-1xl font-semibold text-text-header"
          for="seoSlugInput"
        >
          Slug/Посилання
        </label>
        <input
          class="block border mb-4 px-5 py-2 rounded-md border-secondary-200 w-full"
          id="seoSlugInput"
          on:keyup={debounceChange}
          use:slug={seoSlug}
          placeholder="Slug, приклад: product-name"
        />
        <!-- <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    on:keyup={debounceChange}
    bind:value={seoSlug}
    use:slugUpdate={(val) => (seoSlug = val)}
    placeholder="Slug, приклад: product-name"
   /> -->
        <label
          class="text-1xl font-semibold text-text-header"
          for="seoNameInput"
        >
          Назва
        </label>
        <input
          class="block border mb-4 px-5 py-2 rounded-md border-secondary-200 w-full"
          id="seoNameInput"
          bind:value={seoTitle}
          on:keyup={debounceChange}
          placeholder="Назва"
        />
        <label
          class="text-1xl font-semibold text-text-header"
          for="seoDescInput"
        >
          Опис
        </label>
        <textarea
          class="block border mb-4 px-5 py-2 rounded-md border-secondary-200 w-full"
          id="seoDescInput"
          bind:value={seoDescription}
          on:keyup={debounceChange}
          placeholder="Опис"
          rows="10"
        />
      </div>
      <section class="flex flex-col gap-4 max-w-3xl m-auto" />
    </DashboardSection>
  </div>

  <div class="flex flex-col gap-4">
    <DashboardSection>
      <div class="flex flex-col gap-4 max-w-3xl" id="statusRadio">
        <label
          class="text-2xl font-semibold text-text-header"
          for="statusRadio"
        >
          Статус товару
        </label>
        <label>
          <input
            type="radio"
            checked={!isDraft}
            on:change={publish}
            value="false"
            name="productStatus"
          />
          Активний
        </label>
        <label>
          <input
            type="radio"
            checked={isDraft}
            on:change={unpublish}
            value="true"
            name="productStatus"
          />
          Чернетка
        </label>
      </div>
    </DashboardSection>

    <DashboardSection>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="text-2xl font-semibold text-text-header">
        Кількість товару
      </label>
      <div
        class="grid grid-cols-1 grid-flow-row-dense md:grid-cols-3 mt-6 items-center gap-4"
      >
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="text-1xl text-text-input">Залишилося</label>
        <div class="flex items-center justify-end col-span-2">
          <input
            class="w-full px-6 py-3 rounded-md border border-secondary-200"
            on:input={debounceChange}
            bind:value={amount}
            on:change={debounceChange}
            min="0"
            type="number"
            placeholder="Кількість"
          />
        </div>
      </div>
    </DashboardSection>

    <DashboardSection>
      <h3 class="text-2xl font-semibold text-text-header">Вартість</h3>
      <div
        class="grid grid-cols-1 grid-flow-row-dense md:grid-cols-3 my-5 py-3 items-center gap-4"
      >
        <label class="text-1xl text-text-input" for="priceInput">
          Базова ціна
        </label>
        <div
          class="flex items-center justify-end md:col-span-2"
          id="priceInput"
        >
          <span class="h-12 inline-block py-3 px-3 bg-gray-200 rounded-l-md">
            &#8372;
          </span>
          <input
            class="w-full px-4 py-3 rounded-r-lg border border-secondary-200"
            bind:value={price}
            on:input={debounceChange}
            on:change={debounceChange}
            min="0"
            step="0.01"
            type="number"
            placeholder="Ціна"
          />
        </div>

        <label class="text-1xl text-text-input" for="promPriceInput">
          Акційна ціна
        </label>
        <div
          class="flex items-center justify-end md:col-span-2"
          id="promPriceInput"
        >
          <span class="h-12 inline-block py-3 px-3 bg-gray-200 rounded-l-md">
            &#8372;
          </span>
          <input
            class="w-full px-4 py-3 rounded-r-lg border border-secondary-200"
            bind:value={discountPrice}
            on:change={debounceChange}
            on:input={debounceChange}
            min="0"
            step="0.01"
            type="number"
            placeholder="Акційна ціна"
          />
        </div>
      </div>

      <input
        bind:checked={isDiscount}
        type="checkbox"
        id="myCheckbox"
        on:click={debounceChange}
        class="-my-1 mx-1 peer relative h-5 w-5 appearance-none rounded border
        after:absolute after:left-0 after:top-0 after:h-full after:w-full
        checked:bg-purple-400 checked:border-purple-400 hover:cursor-pointer
        focus:outline-none
        after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-['']"
      />
      <label class="" for="myCheckbox">Зробити товар акційним</label>
    </DashboardSection>
  </div>
</div>
