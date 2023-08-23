<script lang="ts">
  import { routes } from "$lib"
  import type { LayoutData } from "./$types"

  export let data: LayoutData

  const sidebar = [
    { name: "Головна", link: routes.shop(data.shopId) },
    { name: "Товари", link: "" },
    { name: "Замовлення", link: routes.shopOrders(data.shopId) },
    { name: "Налаштування", link: routes.shopSettings(data.shopId) }
  ]
</script>

<div class="grid grid-cols-[minmax(auto,_16rem)_1fr] p-8">
  <nav class="flex flex-col gap-2 pr-8">
    {#each sidebar as page}
      <a href={page.link} class="font-bold text-secondary-600 py-2 px-4 hover:bg-white rounded-lg">
        {page.name}
      </a>
    {/each}
  </nav>

  <div>
    <slot />
  </div>
</div>
