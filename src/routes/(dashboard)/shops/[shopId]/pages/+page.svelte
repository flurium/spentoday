<script lang="ts">
  import { isValidSlug, routes } from "$lib"
  import type { PageData } from "./$types"
  import slugify from "@sindresorhus/slugify"
  import { call, callJson } from "$lib/fetch"
  import { toast } from "$features/toast"
  import { ukrDateString } from "$features/subscriptions"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import InfinityLoader from "$features/InfinityLoader.svelte"
  import autoAnimate from "@formkit/auto-animate"

  type InfoPage = {
    slug: string
    title: string
    updatedAt: string
  }

  export let data: PageData
  let pages: InfoPage[] = []
  let start = pages.length

  let newPageSlug = ""
  let newPageModal: HTMLDialogElement
  let slugValid = true

  function slugInput() {
    slugValid = isValidSlug(newPageSlug)
  }

  async function createPage() {
    newPageSlug = slugify(newPageSlug)
    if (!isValidSlug(newPageSlug)) {
      slugValid = false
      return
    }

    const response = await call(fetch, "client", {
      route: `/v1/site/dashboard/${data.shopId}/page`,
      method: "POST",
      body: { slug: newPageSlug }
    })
    if (!response) return toast.serverError()

    if (response.ok) {
      const json = await callJson<InfoPage>(response)
      if (!json) return toast.jsonError()

      pages = [json, ...pages]
      newPageModal.close()
      return
    }

    if (response.status == 403) {
      return toast.push({
        title: "Досягнуто обмеження",
        description:
          "Ви досягли максимальної кількості сторінок для вашого тарифу."
      })
    }

    return toast.serverError()
  }

  async function loadPages(): Promise<"stop" | "continue"> {
    const response = await call(fetch, "load", {
      route: `/v1/site/dashboard/${data.shopId}/pages?start=${start}`,
      method: "GET"
    })
    if (response == null) return "continue"
    const json = await callJson<InfoPage[]>(response)
    if (!json) return "continue"
    if (json.length == 0) return "stop"

    start += json.length
    pages = [...pages, ...json]
    return "continue"
  }
</script>

<button
  class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
  on:click={() => newPageModal.showModal()}>Створити нову</button
>

<dialog
  bind:this={newPageModal}
  class="p-10 bg-white text-lg rounded-md max-w-2xl"
>
  <form class="flex gap-8 flex-col" on:submit|preventDefault={createPage}>
    <h3>
      Щоб додати нову сторінку, введіть посилання/шлях, наприклад:
      privacy-policy. Його буде видно в URL-адресі сторінки.
    </h3>

    {#if !slugValid}
      <p class="border-red-800 rounded-md p-3 px-4 bg-red-50 text-red-800">
        Посилання/шлях може містити лише малі англійські символи, цифри та мінус
        (-)
      </p>
    {/if}

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPageSlug}
      on:input={slugInput}
      placeholder="new-page-slug"
    />
    <div class="gap-4 items-end">
      <button
        type="reset"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-md"
        on:click={() => newPageModal.close()}
      >
        Скасувати
      </button>
      <button
        class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
        type="submit"
      >
        Додати
      </button>
    </div>
  </form>
</dialog>

<DashboardSection class="mt-5">
  <div class="grid grid-cols-3 gap-x-8 px-5 py-3 text-secondary-400">
    <span>Посилання</span>
    <span>Заголовок</span>
    <span>Коли оновлено</span>
  </div>

  <div use:autoAnimate>
    {#each pages as page (page.slug)}
      <a
        href={routes.page(data.shopId, page.slug)}
        class="grid grid-cols-3 gap-x-8 px-5 py-5 border-t border-secondary-100"
      >
        <span>{page.slug}</span>
        <span>{page.title}</span>
        <span>{ukrDateString(new Date(page.updatedAt))}</span>
      </a>
    {/each}
    <InfinityLoader load={loadPages} />
  </div>
</DashboardSection>
