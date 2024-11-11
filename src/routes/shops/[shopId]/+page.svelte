<script lang="ts">
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import autoAnimate from "@formkit/auto-animate"
  import { routes } from "$lib"
  import type { PageData } from "./$types"

  export let data: PageData
  const products = data.popularProducts
</script>

<svelte:head>
  <title>Магазин | Spentoday</title>
</svelte:head>

<h1 class="font-bold text-3xl text-text-header mb-8">Аналітика маназину</h1>

<DashboardSection>
  <h3 class="text-text-header text-xl font-bold">Дохід</h3>
  <p class="text-sm text-text-input mb-2">*Сума вартості виконаних замовлень</p>

  <p>Загальний дохід: {data.totalMoney} грн</p>
  <p>За останній місяць: {data.lastMonthMoney} грн</p>
</DashboardSection>

<DashboardSection class="mt-8">
  <h3 class="text-text-header text-xl font-bold mb-2">Кількість замовлень</h3>

  <p>Загальна: {data.totalOrders}</p>
  <p>За останній місяць: {data.ordersLastMonth}</p>
</DashboardSection>

<DashboardSection class="mt-8">
  <h3 class="text-text-header text-xl font-bold">Найпопулярніші продукти</h3>

  <div class="mt-8 flex flex-col gap-3" use:autoAnimate>
    {#each products as product, i (product.id)}
      <a
        class="flex justify-between items-center rounded-lg py-3 px-5
        {i < products.length - 1 ? 'border-b border-b-secondary-100' : ''}"
        href={routes.product(data.shopId, product.id)}
      >
        <span>
          {product.name}
        </span>

        <span>
          {product.price} грн
        </span>
      </a>
    {/each}
  </div>
</DashboardSection>
