<script lang="ts">
  import slugify from "@sindresorhus/slugify"
  import type { PageData } from "./$types"

  import { isValidSlug, routes } from "$lib"
  import Markdown from "$features/Markdown.svelte"
  import { call } from "$lib/fetch"
  import { toast } from "$features/toast"
  import { goto } from "$app/navigation"
  export let data: PageData
  let newPageSlug: string = data.slug
  let newPageTitle: string = data.title
  let newPageContent: string = data.content
  let newPageDescription: string = data.description

  let status: string = "Збережено"
  let timer: number = 0

  function debounceChange() {
    status = "Пишеться"
    clearTimeout(timer)
    timer = setTimeout(change, 1000)
  }
  async function change() {
    let updatedSlug: string | null = null
    let updatedTitle: string | null = null
    let updatedDescription: string | null = null
    let updatedContent: string | null = null

    newPageSlug = slugify(newPageSlug)
    if (
      data.slug != newPageSlug &&
      isValidSlug(newPageSlug) &&
      newPageSlug != ""
    )
      updatedSlug = newPageSlug.slice()
    if (data.title != newPageTitle) updatedTitle = newPageTitle.slice()
    if (data.description != newPageDescription) {
      updatedDescription = newPageDescription.slice()
    }
    if (data.content != newPageContent) updatedContent = newPageContent.slice()

    status = "Зберігається..."
    const updated = await call(fetch, "client", {
      route: `/v1/site/dashboard/${data.shopId}/page/${data.slug}`,
      method: "PATCH",
      body: {
        slug: updatedSlug,
        title: updatedTitle,
        description: updatedDescription,
        content: updatedContent
      }
    })

    if (!updated) {
      status = "Не зберіглося"
      return
    }

    status = "Збережене"

    if (updatedSlug) data.slug = updatedSlug
    if (updatedTitle) data.title = updatedTitle
    if (updatedDescription) data.description = updatedDescription
    if (updatedContent) {
      data.content = updatedContent
    }
  }

  async function deletePage(slug: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/dashboard/${data.shopId}/page/${slug}`,
      method: "DELETE"
    })
    if (!response || !response.ok) return toast.serverError()
    goto(routes.pages(data.shopId))
  }
</script>

<div>
  <span>{status}</span>

  <form class="flex gap-8 flex-col">
    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPageSlug}
      on:keyup={debounceChange}
      on:change={() => {
        newPageSlug = slugify(newPageSlug)
      }}
      placeholder="Slug, приклад: product-name"
    />
    <input
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPageTitle}
      on:keyup={debounceChange}
      placeholder="Заголовок"
    />
    <textarea
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPageDescription}
      on:keyup={debounceChange}
      placeholder="Опис"
    />
    <textarea
      class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
      bind:value={newPageContent}
      on:keyup={debounceChange}
      placeholder="Контент, ви можете використовувати markdown"
    />
  </form>
</div>

<div>
  <Markdown content={newPageContent} />
</div>

<button
  class="px-5 py-3 rounded-md bg-red-200"
  on:click={() => deletePage(data.slug)}
>
  Видалити
</button>
