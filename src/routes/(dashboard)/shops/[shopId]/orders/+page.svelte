<script lang="ts">
  import type { PageData } from "./$types"
  import { api, routes } from "$lib"
  import { ukrDateString } from "$features/subscriptions"
  import { goto } from "$app/navigation"

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

<main>
  <div class="flex flex-row">
    <button on:click={() => filter("Всі")} class="border-none me-5">Всі</button>
    <button on:click={() => filter("Готується")} class="border-none me-5">
      Готується
    </button>
    <button on:click={() => filter("Виконано")} class="border-none me-5">
      Виконано
    </button>
    <button on:click={() => filter("Скасовано")} class="border-none me-5">
      Скасовано
    </button>
  </div>
  <table class="table-fixed w-full text-sm">
    <thead>
      <tr class=" text-secondary-400">
        <th>Замовлення</th>
        <th>Дата</th>
        <th>Статус</th>
        <th>Кількість</th>
        <th>Ціна</th>
      </tr>
    </thead>

    <tbody>
      {#each orders as order}
        <tr
          class=" cursor-pointer"
          on:click={() => goto(routes.order(data.shopId, order.id))}
        >
          <td class="text-center">{order.id}</td>
          <td class="text-center">{ukrDateString(new Date(order.date))}</td>
          <td class="text-center">{order.status}</td>
          <td class="text-center">{order.amount}</td>
          <td class="text-center">{order.total}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>
