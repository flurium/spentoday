<script lang="ts">
  import type { PageData } from "./$types"
  import type { DashboardShop } from "./+page"
  import { routes } from "$lib"
  import { call, callJson } from "$lib/fetch"
  import { toast } from "$features/toast"
  import DashboardLayout from "$features/dashboard/DashboardLayout.svelte"

  export let data: PageData
  let shops = data.shops

  let shopName = ""
  $: isInvalid = shopName.trim() == ""

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
        description:
          "Ви досягли максимальної кількості магазинів для вашого тарифу."
      })
    }

    return toast.serverError()
  }
</script>

<svelte:head>
  <title>Ваші магазини | Spentoday</title>
</svelte:head>

<DashboardLayout accountImage={data.account.img} bar={[]}>
  <div class="px-6 mt-20 mx-auto max-w-screen-xl w-full">
    <div
      class="flex flex-col md:flex-row gap-y-4 justify-between md:items-center"
    >
      <h1 class="text-text-header text-4xl font-extrabold">Мої сайти</h1>

      <form
        on:submit|preventDefault={addShop}
        class="flex flex-col md:flex-row md:items-center gap-4"
      >
        <input
          class="py-2 px-4 w-full rounded-md border border-gray-200"
          bind:value={shopName}
          placeholder="Назва магазину"
        />
        <button
          class="bg-brand-violet disabled:bg-gray-100 font-semibold px-6
          py-2 text-white disabled:text-text-main rounded-md w-full"
          type="submit"
          disabled={isInvalid}
        >
          Cтворити сайт
        </button>
      </form>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-11 gap-6">
      {#each shops as shop}
        <a
          class="border border-gray-200 rounded-lg overflow-hidden"
          href={routes.shop(shop.id)}
        >
          {#if shop.topBanner}
            <img class="w-full" src={shop.topBanner} alt={shopName} />
          {/if}

          <div class="pt-5 px-7 pb-5">
            <h5 class="font-bold text-text-header text-xl">{shop.name}</h5>
            <p class="break-words text-text-input">
              {shop.slug ?? ""}
            </p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</DashboardLayout>
