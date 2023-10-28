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
  <div class="grid grid-cols-[minmax(auto,_16rem)_1fr] flex-1">
    <nav
      class="flex flex-col gap-2 p-8 bg-secondary-50 z-[-1] md:z-10 md:static absolute w-full md:w-auto md:opacity-100 opacity-0
    top-[-400px] transition-all ease-in duration-500"
    >
      {#each sidebar as section}
        <a
          href={section.link}
          class="font-medium py-2 px-4 hover:bg-white rounded-lg
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
</DashboardLayout>
