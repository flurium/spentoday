<script lang="ts">
  import type { PageData } from "./$types"
  import { api, routes } from "$lib"
  import { ukrDateString } from "$features/subscriptions"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import autoAnimate from "@formkit/auto-animate"
  import { goto } from "$app/navigation"
  import { createScrollLoader, scrollLoader } from "$features/loader"

  export let data: PageData
  let orders = data.orders
  let start = data.orders.length

  let status = "Всі"
  $: filteredOrders =
    status == "Всі" ? orders : orders.filter((x) => x.status == status)

  const loader = createScrollLoader(loadMore)

  async function loadMore(version: number) {
    let items = await api.queryOrders(fetch, "client", {
      shopId: data.shopId,
      start: start
    })
    if (!items || loader.versionChanged(version)) return true

    items = items.filter((x) => !orders.some((o) => x.id == o.id))
    if (items.length == 0) return false

    start += items.length
    orders = [...orders, ...items]
    return true
  }
</script>

<h1 class="font-bold text-2xl text-secondary-700 mb-8">Ваші замовлення</h1>
<DashboardSection>
  <div class="flex flex-row mb-7">
    <button
      on:click={() => (status = "Всі")}
      class="hover:bg-secondary-50 border border-white p-2 me-5
        hover:border-secondary-300 hover:text-brand-violet rounded-lg"
    >
      Всі
    </button>
    <button
      on:click={() => (status = "Готується")}
      class="hover:bg-secondary-50 border border-white p-2 me-5
        hover:border-secondary-300 hover:text-brand-violet rounded-lg"
    >
      Готується
    </button>
    <button
      on:click={() => (status = "Виконано")}
      class="hover:bg-secondary-50 border border-white p-2 me-5
        hover:border-secondary-300 hover:text-brand-violet rounded-lg"
    >
      Виконано
    </button>
    <button
      on:click={() => (status = "Скасовано")}
      class="hover:bg-secondary-50 border border-white p-2 me-5
        hover:border-secondary-300 hover:text-brand-violet rounded-lg"
    >
      Скасовано
    </button>
  </div>

  <div
    class="py-3 grid grid-cols-[2fr_1fr_1fr_1fr_1fr]
    gap-x-8 text-secondary-400 w-full text-left"
  >
    <span>Замовлення</span>
    <span>Дата</span>
    <span>Статус</span>
    <span>Кількість</span>
    <span>Ціна</span>
  </div>

  <div use:autoAnimate>
    {#each filteredOrders as order (order.id)}
      <button
        class="py-5 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-x-8
        border-t border-secondary-100 w-full text-left"
        on:click={() => goto(routes.order(data.shopId, order.id))}
      >
        <span class="break-all">{order.id}</span>
        <span class="break-all">{ukrDateString(new Date(order.date))} </span>
        <div>
          <span
            class="text-white rounded-full py-1 px-3
              {order.status == 'Виконано'
              ? 'bg-green-600'
              : order.status == 'Скасовано'
              ? 'bg-red-600'
              : 'bg-blue-600'}"
          >
            {order.status}
          </span>
        </div>
        <span>{order.amount}</span>
        <span>{order.total} грн</span>
      </button>
    {/each}

    <div use:scrollLoader={loader} />
  </div>
</DashboardSection>
