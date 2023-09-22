<script lang="ts">
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import { ukrDateString } from "$features/subscriptions"
  import { toast } from "$features/toast"
  import { call } from "$lib/fetch"
  import autoAnimate from "@formkit/auto-animate"
  import type { PageData } from "./$types"
  export let data: PageData

  let selected: string
  async function setStatus() {
    const response = await call(fetch, "client", {
      route: `/v1/site/order/${data.order.id}/status`,
      method: "POST",
      body: { status: selected }
    })
    if (!response) return toast.serverError()
  }
</script>

<DashboardSection>
  <span class="xl text-lg font-bold">
    Замовлення <span class="text-sm">{data.order.id}</span>
  </span>

  <div class="flex flex-row h-full mt-4">
    <div class="basis-1/2 h-full grid grid-row gap-5">
      <span class="text-lg font-bold">Основні</span>
      <div>
        <span class="text-sm font-bold max-w-lg">Дата Створення:</span><br />
        {ukrDateString(new Date(data.order.date))}
      </div>
      <div class="row-span-3">
        <div>
          <span class="text-sm font-bold max-w-lg">Статус:</span><br />
          <select
            bind:value={selected}
            on:change={setStatus}
            class="w-5/6 bg-gray-50 border border-gray-300 text-text-header text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {#if data.order.status == "Виконано"}
              <option selected value="Виконано">Виконано</option>
              <option value="Готується">Готується</option>
              <option value="Скасовано">Скасовано</option>
            {:else if data.order.status == "Готується"}
              <option selected value="Готується">Готується</option>
              <option value="Виконано">Виконано</option>
              <option value="Скасовано">Скасовано</option>
            {:else}
              <option selected value="Скасовано">Скасовано</option>
              <option value="Виконано">Виконано</option>
              <option value="Готується">Готується</option>
            {/if}
          </select>
        </div>
      </div>
      <div>
        <span class="text-sm font-bold max-w-lg">Замовник:</span><br />
        {data.order.fullName}
      </div>
    </div>

    <div class="basis-1/2 grid grid-cols-2 gap-4">
      <span class="text-lg font-bold max-w-lg">Платіж</span>
      <span class="text-lg font-bold">Доставка</span>

      <div class="text-sm">
        {data.order.fullName} <br />
        {data.order.adress}
      </div>

      <div class="text-sm">
        {data.order.fullName} <br />
        {data.order.adress}
      </div>

      <div>
        <span class="text-sm font-bold max-w-lg">Email:</span><br />
        {data.order.email}
      </div>

      <div />

      <div>
        <span class="text-sm font-bold max-w-lg">Телефон:</span><br />
        {data.order.phone}
      </div>

      <div>
        <span class="text-sm font-bold max-w-lg">Телефон:</span><br />
        {data.order.phone}
      </div>
    </div>
  </div>
</DashboardSection>

<div class="flex flex-row gap-4 mt-4">
  <DashboardSection class="basis-3/5">
    <table class="w-full">
      <thead>
        <tr class="text-text-input">
          <td class="py-3">Товар</td>
          <td>Вартість</td>
          <td>Кількість</td>
          <td>Загальна ціна</td>
        </tr>
      </thead>

      <tbody use:autoAnimate>
        {#each data.order.details as detail}
          <tr class="border-t border-secondary-100">
            <td class="py-3">{detail.name}</td>
            <td>{detail.price} грн</td>
            <td>{detail.amount}</td>
            <td>{detail.price * detail.amount} грн</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </DashboardSection>

  <DashboardSection class="basis-2/5">
    <span class="text-lg font-bold">Примітки до замовлення</span><br />
    {data.order.comment}
  </DashboardSection>
</div>
