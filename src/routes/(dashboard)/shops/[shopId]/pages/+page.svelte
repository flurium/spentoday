<script lang="ts">
  import { isValidSlug, routes } from "$lib"
  import type { PageData } from "./$types"
  import slugify from "@sindresorhus/slugify"
  import { call, callJson } from "$lib/fetch"
  import { toast } from "$features/toast"
  import type { Page } from "./+page"

  export let data: PageData
  $: pages = data.pages ?? []
  let newPageSlug: string = ""
  let newPageModal: HTMLDialogElement
  let slugValid: boolean = true
  let shopId: string = data.shopId

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
      const json = await callJson<Page>(response)
      if (!json) return toast.jsonError()

      pages = [...pages, json]
      newPageModal.close()
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

  async function deletePage(slug: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/dashboard/${data.shopId}/page/${slug}`,
      method: "DELETE"
    })
    if (!response || !response.ok) return toast.serverError()

    pages = pages.filter((x) => x.slug != slug)
    return
  }
</script>

<button
  class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
  on:click={() => newPageModal.showModal()}>Створити нову</button
>

<dialog bind:this={newPageModal} class="p-10 bg-white text-lg rounded-md max-w-2xl">
  <form class="flex gap-8 flex-col" on:submit|preventDefault={createPage}>
    <h3>
      To add new page enter page slug/path, like: privacy-policy. Slug will be seen in url
      of page.
    </h3>

    {#if !slugValid}
      <p class="border-red-800 rounded-md p-3 px-4 bg-red-50 text-red-800">
        Slug/path can only contain lowercase english symbols, numbers and minus (-)
      </p>
    {/if}

    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPageSlug}
      on:input={slugInput}
      placeholder="New page slug"
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

<div class="flex flex-wrap justify-center mt-10">
  {#each pages as page}
    <div
      class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        {page.title}
      </h5>
      <span>{page.slug}</span><br />
      <span>{page.updatedAt}</span><br />
      <a
        class="inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
        href={routes.shopPage(shopId, page.slug)}
      >
        до Сторінки
      </a>
      <button
        class="inline-block rounded bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
        on:click={() => deletePage(page.slug)}
      >
        Видалити
      </button>
    </div>
  {/each}
</div>
