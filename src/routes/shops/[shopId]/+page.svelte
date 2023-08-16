<script lang="ts">
  import slugify from "@sindresorhus/slugify"
  import type { PageData } from "./$types"
  import { routes } from "$lib"
  import { call, callJson } from "$lib/fetch"
  import { PUBLIC_API_URL } from "$env/static/public"
  import ScrollLoad from "$features/ScrollLoad.svelte"
  import { shopProducts, type Product } from "$lib/api"

  export let data: PageData
  let products = data.products

  let newProduct: string = ""

  async function add() {
    const name = newProduct.trim()
    if (name == "") {
      alert("Name can't be empty")
      return
    }

    const response = await call(fetch, "client", {
      route: "/v1/site/products",
      method: "POST",
      body: {
        name: name,
        seoSlug: slugify(name),
        shopId: data.shopId
      }
    })
    if (!response) return alert("Server oops!")

    const json = await callJson<Product>(response)
    if (!json) return alert("trcstecr")

    data.products.push(json)
    data = data
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

<form on:submit|preventDefault={add} class="flex gap-2 mt-8">
  <input
    class="flex-1 bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-l-full
     border border-gray-200"
    bind:value={newProduct}
    placeholder="Щоб додати новий продукт, введіть його назву"
  />

  <button class="bg-primary-500 text-white px-6 rounded-r-full" type="submit"> Add </button>
</form>

<div class="flex flex-col mt-8">
  {#each products as product (product.id)}
    <a
      class="flex justify-between items-center hover:bg-secondary-50 p-4 border-b border-secondary-200"
      href={routes.shopProduct(data.shopId, product.id)}
    >
      <span>
        {product.name}
      </span>

      {#if product.isDraft}
        <span
          class="bg-secondary-100 border border-secondary-400 text-secondary-800
          text-sm rounded-full py-1 px-2">Чернетка</span
        >
      {:else}
        <span
          class="bg-green-100 border border-green-400 text-green-800
          text-sm rounded-full py-1 px-2"
        >
          Активний
        </span>
      {/if}
    </a>
  {/each}
  <ScrollLoad load={loadProducts} />
</div>
