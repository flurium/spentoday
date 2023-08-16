<script lang="ts">
  import { routes } from "$lib"
  import { page } from "$app/stores"
  import type { LayoutData } from "./$types"

  export let data: LayoutData

  const links = [
    { name: "Продукти", href: routes.shop(data.shopId) },
    { name: "Замовлення", href: routes.shopOrders(data.shopId) },
    { name: "Категорії", href: routes.shopCategories(data.shopId) },
    { name: "Домени", href: routes.shopDomains(data.shopId) },
    { name: "Сторінки", href: routes.shopPages(data.shopId) },
    { name: "Налаштування", href: routes.shopSettings(data.shopId) }
  ]
</script>

<header class="p-6">
  <nav class="flex gap-2">
    {#each links as link}
      <a
        class="py-2 px-4 rounded {$page.url.pathname == link.href
          ? 'bg-primary-500 text-white'
          : 'hover:bg-gray-100'}"
        href={link.href}
      >
        {link.name}
      </a>
    {/each}
  </nav>
</header>

<main class="px-6">
  <slot />
</main>
