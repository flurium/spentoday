<script lang="ts">
  import type { LayoutData } from "./$types"
  import { page } from "$app/stores"
  import { routes } from "$lib"

  export let data: LayoutData

  const sidebar = [
    { name: "Головна", link: routes.shop(data.shopId) },
    { name: "Товари", link: "" },
    { name: "Замовлення", link: routes.shopOrders(data.shopId) },
    { name: "Сторінки", link: routes.shopPages(data.shopId) },
    { name: "Налаштування", link: routes.shopSettings(data.shopId) }
  ]
</script>

<div class="grid grid-cols-[minmax(auto,_16rem)_1fr] p-8">
  <nav class="flex flex-col gap-2 pr-8">
    {#each sidebar as section}
      <a
        href={section.link}
        class="font-bold text-secondary-600 py-2 px-4 hover:bg-white rounded-lg
        {$page.url.pathname == section.link ? 'bg-white' : ''}"
      >
        {section.name}
      </a>
    {/each}
  </nav>

  <div>
    <slot />
  </div>
</div>
