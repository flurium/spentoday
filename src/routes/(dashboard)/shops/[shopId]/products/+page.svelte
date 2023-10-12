<script lang="ts">
  import slugify from "@sindresorhus/slugify"
  import type { PageData } from "./$types"
  import { routes } from "$lib"
  import { call, callJson } from "$lib/fetch"
  import { shopProducts, type Product } from "$lib/api"
  import { toast } from "$features/toast"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import autoAnimate from "@formkit/auto-animate"
  import { createScrollLoader, scrollLoader } from "$features/loader"

  export let data: PageData
  let products = data.products
  let start = data.products.length

  let newProduct = ""

  async function add() {
    const name = newProduct.trim()
    if (name == "") {
      return toast.push({
        title: "Назва продукту не може бути порожньою.",
        description:
          "Введіть початкову назву продукту, яка буде відрізнятися від інших. Ви зможете її змінити в майбутньому."
      })
    }

    const response = await call(fetch, "client", {
      route: "/v1/site/products",
      method: "POST",
      body: { name: name, seoSlug: slugify(name), shopId: data.shopId }
    })
    if (!response) return toast.serverError()

    if (response.ok) {
      const json = await callJson<Product>(response)
      if (!json) return toast.jsonError()

      products = [json, ...products]
      return
    }

    if (response.status == 403) {
      return toast.push({
        title: "Досягнуто обмеження",
        description:
          "Ви досягли максимальної кількості продуктів для вашого тарифу."
      })
    }

    return toast.serverError()
  }

  const loader = createScrollLoader(loadMore)

  async function loadMore(version: number) {
    let items = await shopProducts(fetch, "client", {
      shopId: data.shopId,
      start: start,
      count: 10
    })
    if (items == null || loader.versionChanged(version)) return true

    items = items.filter((x) => !products.some((p) => p.id == x.id))
    if (items.length == 0) return false

    start += items.length
    products = [...products, ...items]
    return true
  }
</script>

<svelte:head>
  <title>Продукти | Spentoday</title>
</svelte:head>

<h1 class="font-bold text-3xl text-text-header mb-8">Ваші товари</h1>

<form on:submit|preventDefault={add} class="flex gap-2">
  <input
    class="flex-1 border border-secondary-200 rounded-lg px-5 py-3"
    bind:value={newProduct}
    placeholder="Для додавання нового продукту введіть його назву."
  />

  <button class="bg-brand-violet rounded-lg text-white px-8" type="submit">
    Додати товар
  </button>
</form>

<DashboardSection class="mt-8">
  <div class="flex flex-col gap-3" use:autoAnimate>
    {#each products as product, i (product.id)}
      <a
        class="flex justify-between items-center rounded-lg py-3 px-5
      {i < products.length - 1 ? 'border-b border-b-secondary-100' : ''}"
        href={routes.product(data.shopId, product.id)}
      >
        <span>
          {product.name}
        </span>

        {#if product.isDraft}
          <span
            class="bg-secondary-600 text-white text-sm rounded-full py-1 px-2"
          >
            Чернетка
          </span>
        {:else}
          <span
            class="bg-brand-green text-white text-sm rounded-full py-1 px-2"
          >
            Активний
          </span>
        {/if}
      </a>
    {/each}
    <div use:scrollLoader={loader} />
  </div>
</DashboardSection>
