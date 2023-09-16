<script lang="ts">
  import type { PageData } from "./$types"
  import { api, routes } from "$lib"
  import { ukrDateString } from "$features/subscriptions"
  import { goto } from "$app/navigation"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"

  export let data: PageData

  let productName: string = ""
  let timer: number

  $: orders = data.orders ?? []
  function filter(status: string) {
    if (status == "Всі") {
      orders = data.orders
      return
    }
    orders = data.orders.filter((x) => x.status == status)
  }
</script>

<main class="h-full w-full">
  <h1 class="font-bold text-2xl text-secondary-700 mb-8">Ваші замовлення</h1>
  <DashboardSection animate class="m-2 p-10">
    <div class="flex flex-row mb-7">
      <button
        on:click={() => filter("Всі")}
        class="hover:bg-gray-300 hover:text-purple-800 rounded-lg p-2 border-none me-5"
        >Всі</button
      >
      <button
        on:click={() => filter("Готується")}
        class="hover:bg-gray-300 hover:text-purple-800 rounded-lg p-2 border-none me-5"
      >
        Готується
      </button>
      <button
        on:click={() => filter("Виконано")}
        class="hover:bg-gray-300 hover:text-purple-800 rounded-lg p-2 border-none me-5"
        >Виконано</button
      >
      <button
        on:click={() => filter("Скасовано")}
        class="hover:bg-gray-300 hover:text-purple-800 rounded-lg p-2 border-none me-5"
        >Скасовано</button
      >
    </div>

    <div class="grid grid-cols-5 gap-4 w-full text-sm">
      <div class="text-secondary-300 text-center">Замовлення</div>
      <div class="text-secondary-300 text-center">Дата</div>
      <div class="text-secondary-300 text-center">Статус</div>
      <div class="text-secondary-300 text-center">Кількість</div>
      <div class="text-secondary-300 text-center">Ціна</div>
    </div>

    {#each orders as order}
      <button
        on:click={() => goto(routes.order(data.shopId, order.id))}
        class=" w-full grid grid-cols-5 gap-4 border-t pt-3"
      >
        <div class="text-center break-words">{order.id}</div>
        <div class="text-center">{ukrDateString(new Date(order.date))}</div>

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

        <div class="text-center">{order.amount}</div>
        <div class="text-center">{order.total}</div>
      </button>
    {/each}
  </DashboardSection>
</main>
