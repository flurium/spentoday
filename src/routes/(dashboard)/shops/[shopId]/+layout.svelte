<script lang="ts">
  import type { LayoutData } from "./$types"
  import { page } from "$app/stores"
  import { routes } from "$lib"

  export let data: LayoutData

  const sidebar = [
    { name: "Головна", link: routes.shop(data.shopId) },
    { name: "Товари", link: routes.products(data.shopId) },
    { name: "Замовлення", link: routes.orders(data.shopId) },
    { name: "Підписки", link: routes.subscriptions(data.shopId) },
    { name: "Сторінки", link: routes.pages(data.shopId) },
    { name: "Категорії", link: routes.categories(data.shopId) },
    { name: "Домени", link: routes.domains(data.shopId) },
    { name: "Налаштування", link: routes.settings(data.shopId) }
  ]
</script>

<div class="grid grid-cols-[minmax(auto,_16rem)_1fr] flex-1">
  <nav class="flex flex-col gap-2 p-8 bg-secondary-50">
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

  <div class="p-8">
    <slot />
  </div>
</div>
