<script lang="ts">
  import type { PageData } from "./$types"
  import type { DashboardShop } from "./+page"
  import { routes } from "$lib"
  import { call, callJson } from "$lib/fetch"
  import { toast } from "$features/toast"

  export let data: PageData
  let shops = data.shops

  let shopName: string = ""
  $: isInvalid = shopName.trim() == ""

  async function addShop() {
    const response = await call(fetch, "client", {
      route: "/v1/dashboard/addshop",
      method: "POST",
      body: { shopName: shopName }
    })
    if (!response || !response.ok) return toast.serverError()

    const shop = await callJson<DashboardShop>(response)
    if (!shop) return toast.jsonError()

    shops = [...shops, shop]
    return
  }

  async function deleteShop(shopId: string) {
    const response = await call(fetch, "client", {
      route: `/v1/dashboard/delete/${shopId}`,
      method: "DELETE"
    })
    if (!response || !response.ok) return toast.serverError()
    shops = shops.filter((x) => x.id != shopId)
  }
</script>

<form on:submit|preventDefault={addShop} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
  <input
    class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
    bind:value={shopName}
    placeholder="Shop name"
  />

  <button
    class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
    type="submit"
    disabled={isInvalid}
  >
    Add
  </button>
</form>

<div>
  <div>your shops:</div>
  <div class="flex flex-wrap justify-center mt-10">
    {#each shops as shop}
      <div
        class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
          {shop.name}
        </h5>
        <button
          class="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          on:click={() => deleteShop(shop.id)}
        >
          Delete
        </button>
        <a
          class="inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          href={routes.shop(shop.id)}
        >
          to Shop
        </a>
      </div>
    {/each}
  </div>
</div>
