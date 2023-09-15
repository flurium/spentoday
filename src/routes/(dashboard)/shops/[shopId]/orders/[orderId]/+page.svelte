<script lang="ts">
  import { ukrDateString } from "$features/subscriptions"
  import { toast } from "$features/toast"
  import { call } from "$lib/fetch"
  import type { PageData } from "./$types"

  export let data: PageData

  let selected: any
  async function setStatus() {
    const response = await call(fetch, "client", {
      route: `/v1/site/order/${data.order.id}/status`,
      method: "POST",
      body: { status: selected }
    })
    if (!response) return toast.serverError()

    if (response.ok) {
      return
    }

    if (response.status == 403) {
      return toast.push({
        title: "Досягнуто обмеження",
        description: "Ви досягли максимальної кількості сторінок для вашого тарифу."
      })
    }

    return toast.serverError()
  }
</script>

<span class=" text-secondary-400 py-2 px-4 xl text-sm">
  Замовлення {data.order.id}
</span>

<div class="flex flex-row h-full">
  <div class="basis-1/2 h-full grid">
    <span class="text-2xl font-bold max-w-lg">Основні</span>
    <div>
      <span class="text-xl font-bold max-w-lg">Дата Створення:</span><br />
      {ukrDateString(new Date(data.order.date))}
    </div>
    <div class="row-span-3 md:row-span-4">
      <div>
        <span class="text-xl font-bold max-w-lg">Статус:</span><br />
        <select
          bind:value={selected}
          on:change={setStatus}
          class="w-5/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>{data.order.status}</option>
          <option value="Готується">Готується</option>
          <option value="Виконано">Виконано</option>
          <option value="Скасовано">Скасовано</option>
        </select>
      </div>
    </div>
    <div>
      <span class="text-xl font-bold max-w-lg">Замовник:</span><br />
      {data.order.fullName}
    </div>
  </div>
  <div class="basis-1/4">
    <span class="text-2xl font-bold max-w-lg">Платіж</span>
    <div class="w-full h-full grid gap-5">
      <p>
        {data.order.fullName} <br />
        {data.order.adress}
      </p>
      <p>
        <span class="text-xl font-bold max-w-lg">Email:</span><br />
        {data.order.email}
      </p>
      <p>
        <span class="text-xl font-bold max-w-lg">Телефон:</span><br />
        {data.order.phone}
      </p>
    </div>
  </div>
  <div class="basis-1/4">
    <span class="text-2xl font-bold">Доставка</span>
    <div class="w-full h-full grid gap-y-36">
      <p>
        {data.order.fullName} <br />
        {data.order.adress}
      </p>

      <p>
        <span class="text-xl font-bold max-w-lg">Телефон:</span><br />
        {data.order.phone}
      </p>
    </div>
  </div>
</div>

<div class="flex flex-row">
  <div class="basis-3/5">
    <table class="table-fixed w-full">
      <thead>
        <tr class=" text-secondary-400 text-sm">
          <th>Товар</th>
          <th>Вартість</th>
          <th>Кількість</th>
          <th>Загальна</th>
        </tr>
      </thead>

      <tbody>
        {#each data.order.details as detail}
          <tr class="mt-5 py-5 px-4 xl">
            <td class="text-center">{detail.name}</td>
            <td class="text-center">{detail.price}</td>
            <td class="text-center">{detail.amount}</td>
            <td class="text-center">{detail.price * detail.amount}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="basis-2/5">
    <span class="text-lg font-bold">Примітки до замовлення:</span><br />
    {data.order.comment}
  </div>
</div>
