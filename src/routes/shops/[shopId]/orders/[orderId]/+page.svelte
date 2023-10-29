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

  const statuses = ["Виконано", "Готується", "Скасовано"]
</script>

<svelte:head>
  <title>Замовлення: {data.order.id} | Spentoday</title>
</svelte:head>

<h1 class="text-3xl font-semibold text-text-header mb-8">
  Редагувати замовлення
</h1>

<DashboardSection>
  <h1 class="text-lg font-medium text-text-header mb-8">
    Замовлення #{data.order.id}
  </h1>
  <div class="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2">
    <div>
      <p class="text-text-input mb-2">Дата Створення:</p>
      <p>{ukrDateString(new Date(data.order.date))}</p>

      <p class="text-text-input mt-5 mb-2">Статус:</p>
      <select
        bind:value={selected}
        on:change={setStatus}
        class="border px-5 py-3 rounded-md border-secondary-200 w-full bg-inherit"
      >
        {#each statuses as status}
          <option selected={status == data.order.status} value="Виконано">
            {status}
          </option>
        {/each}
      </select>

      <p class="text-text-input mt-5 mb-2">Замовник:</p>
      {data.order.fullName}
    </div>

    <div>
      <p class="text-text-input mb-2">Адреса:</p>
      <p>{data.order.adress}</p>

      <p class="text-text-input mt-5 mb-2">Email:</p>
      {data.order.email}

      <p class="text-text-input mt-5 mb-2">Телефон:</p>
      {data.order.phone}
    </div>
  </div>
</DashboardSection>

<div class="flex flex-col md:flex-row gap-4 mt-4">
  <DashboardSection class="md:basis-3/5">
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

  <DashboardSection class="md:basis-2/5">
    <p class="text-text-header font-medium text-lg mb-2">
      Примітки до замовлення
    </p>
    {data.order.comment}
  </DashboardSection>
</div>
