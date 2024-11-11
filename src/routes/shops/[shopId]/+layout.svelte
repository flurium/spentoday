<script lang="ts">
  import type { LayoutData } from "./$types"
  import { page } from "$app/stores"
  import { routes } from "$lib"
  import DashboardLayout from "$features/dashboard/DashboardLayout.svelte"

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

<DashboardLayout accountImage={data.accountImage} bar={sidebar}>
  <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] flex-1">
    <nav class="hidden md:flex flex-col gap-2 p-8 bg-secondary-50 w-full">
      {#each sidebar as section}
        <a
          href={section.link}
          class="font-medium py-2 ps-4 pe-12 hover:bg-white rounded-lg
          {$page.url.pathname == section.link ? 'bg-white' : ''}"
        >
          {section.name}
        </a>
      {/each}
    </nav>

    <div class="p-4 md:p-8 w-full">
      <slot />
    </div>
  </div>
</DashboardLayout>
