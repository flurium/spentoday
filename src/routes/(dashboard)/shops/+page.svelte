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

  let activeDropdownShopId: string | null = null;

  function toggleDropdown(shopId: string) {
    activeDropdownShopId = activeDropdownShopId === shopId ? null : shopId;
  }

  async function addShop() {
    const response = await call(fetch, "client", {
      route: "/v1/site/dashboard/addshop",
      method: "POST",
      body: { shopName: shopName }
    })
    if (!response) return toast.serverError()

    if (response.ok) {
      const shop = await callJson<DashboardShop>(response)
      if (!shop) return toast.jsonError()

      shops = [...shops, shop]
      return
    }

    if (response.status == 403) {
      return toast.push({
        title: "Досягнуто обмеження",
        description: "Ви досягли максимальної кількості магазинів для вашого тарифу."
      })
    }

    return toast.serverError()
  }
</script>

<div class="px-32 text-center">
  <div class="mt-20 flex justify-between items-center">
    <span class="text-4xl font-extrabold dark:bg-gray-800 text-left pl-2">Мої сайти</span>
    <form on:submit|preventDefault={addShop} class="flex items-center pr-5">
      <input
        class="focus:bg-gray-50 mx-3 p-2 w-72 rounded-md border border-gray-200"
        bind:value={shopName}
        placeholder="Назва магазину"
      />
      <button
        class="bg-purple-600 disabled:bg-gray-100 font-semibold px-4 py-2 text-white
          hover:bg-purple-400 disabled:text-gray-400 rounded-md"
        type="submit"
        disabled={isInvalid}
      >
        Cтворити сайт
      </button>
    </form>
  </div>
  <div class="mt-5 flex flex-wrap -m-2">
    {#each shops as shop}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="max-w-sm m-5 pb-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
      {activeDropdownShopId === shop.id ? 'bg-gray-100' : ''} static"
      on:click={() => toggleDropdown(shop.id)}
    >
      {#if shop.topBanner}
      <div class=" w-full h-56 relative {activeDropdownShopId === shop.id ? 'p-4 rounded-t-lg' : ''}">
        <img
          class="w-full h-full rounded-t-lg {activeDropdownShopId === shop.id ? 'brightness-50' : ''}"
          src={shop.topBanner}
          alt="Shop"
        />

        {#if activeDropdownShopId === shop.id}
        <div class="absolute inset-0 flex justify-center items-center">
          <a href={routes.shop(shop.id)} class="bg-purple-600 text-white px-4 py-2 rounded-lg">Управляти</a>
        </div>
        {/if}
      </div>
      {/if}

      <h5 class="mt-2 ml-4 text-base font-semibold text-gray-900 md:text-xl dark:text-white text-left">
        {shop.name}
      </h5>
      <div class="flex justify-between items-center">
        <p class="break-words whitespace-normal text-gray-500 text-15 text-left mt-1 ml-4">
          {shop.slug}
        </p>
      </div>
    </div>
    {/each}
  </div>
</div>
