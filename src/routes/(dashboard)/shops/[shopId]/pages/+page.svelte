<script lang="ts">
  import { isValidSlug, routes } from "$lib"
  import type { PageData } from "./$types"
  import slugify from "@sindresorhus/slugify"
  import { call, callJson } from "$lib/fetch"
  import { toast } from "$features/toast"

  type Page = {
    slug: string
    title: string
    updatedAt: Date
  }

  export let data: PageData
  $: pages = data.pages
  let newPageSlug: string = ""
  let newPageModal: HTMLDialogElement
  let slugValid: boolean = true
  let shopId: string = data.shopId

  function slugInput() {
    newPageSlug = slugify(newPageSlug)
  }

  async function createPage() {
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

    const json = await callJson<Page>(response)
    if (!json) return toast.jsonError()

    pages = [...pages, json]
  }
</script>

<button
  class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
  on:click={() => newPageModal.showModal()}>Add new</button
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
        class="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-md"
        on:click={() => newPageModal.close()}
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
        type="submit"
      >
        Add
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
      <span>{page.slug}</span>
      <span
        >{page.updatedAt.getDay()}/{page.updatedAt.getMonth()}/{page.updatedAt.getFullYear()}</span
      >
      <a
        class="inline-block rounded bg-indigo-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
        href={routes.shopPage(shopId, page.slug)}
      >
        to Page
      </a>
    </div>
  {/each}
</div>
