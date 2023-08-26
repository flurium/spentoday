<script lang="ts">
  import slugify from "@sindresorhus/slugify"
  import type { PageData } from "./$types"
  import { routes } from "$lib"
  import { call, callJson } from "$lib/fetch"
  import ScrollLoad from "$features/ScrollLoad.svelte"
  import { shopProducts, type Product } from "$lib/api"
  import { toast } from "$features/toast"

  export let data: PageData
  let products = data.products

  let newProduct: string = ""

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

    const json = await callJson<Product>(response)
    if (!json) return toast.jsonError()

    products = [...products, json]
  }

  let start = data.products.length
  let isLoading = false

  async function loadProducts(): Promise<"skip" | "stop" | "continue"> {
    if (isLoading) return "skip"

    isLoading = true
    const loadProducts = await shopProducts(fetch, "client", {
      shopId: data.shopId,
      start: start,
      count: 10
    })
    if (!loadProducts) {
      isLoading = false
      return "continue"
    }
    if (loadProducts.length == 0) return "stop"

    start += loadProducts.length
    products = [...products, ...loadProducts]
    isLoading = false
    return "continue"
  }
</script>

<h1 class="font-bold text-3xl text-secondary-700 mb-8">Ваші товари</h1>

<form on:submit|preventDefault={add} class="flex gap-2">
  <input
    class="flex-1 bg-white rounded-lg px-4 py-3"
    bind:value={newProduct}
    placeholder="Для додавання нового продукту введіть його назву."
  />

  <button class="bg-brand-violet rounded-lg text-white px-8" type="submit">
    Додати товар
  </button>
</form>

<div class="flex flex-col gap-3 mt-8 rounded-xl bg-white p-8">
  {#each products as product (product.id)}
    <a
      class="flex justify-between items-center rounded-lg hover:bg-secondary-50 py-3 px-5 bg-secondary-50"
      href={routes.shopProduct(data.shopId, product.id)}
    >
      <span>
        {product.name}
      </span>

      {#if product.isDraft}
        <span class="bg-secondary-600 text-white text-sm rounded-full py-1 px-2"
          >Чернетка</span
        >
      {:else}
        <span
          class="bg-brand-green text-white
          text-sm rounded-full py-1 px-2"
        >
          Активний
        </span>
      {/if}
    </a>
  {/each}
  <ScrollLoad load={loadProducts} />
</div>
