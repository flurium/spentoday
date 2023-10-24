<script lang="ts">
  import slugify from "@sindresorhus/slugify"
  import type { PageData } from "./$types"

  import { isValidSlug, routes } from "$lib"
  import Markdown from "$features/Markdown.svelte"
  import { call } from "$lib/fetch"
  import { toast } from "$features/toast"
  import { goto } from "$app/navigation"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import Arrow from "$features/landing/questions/Arrow.svelte"
  import MarkdownEditor from "$features/MarkdownEditor.svelte"
  export let data: PageData
  let newPageSlug: string = data.slug
  let newPageTitle: string = data.title
  let newPageContent: string = data.content
  let newPageDescription: string = data.description

  let status = "Збережено"
  let timer = 0

  export function debounceChange() {
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

<svelte:head>
  <title>Сторінка: {data.title} | Spentoday</title>
</svelte:head>

<div class="flex gap-2 my-10 items-center">
  <div class="cursor-pointer">
    <a href={routes.pages(data.shopId)}>
      <Arrow class="-rotate-90" />
    </a>
  </div>
  <h1 class="text-3xl font-semibold text-text-header">Редагувати сторінку</h1>
</div>

<span>{status}</span>
<DashboardSection class="my-4">
  <label class="text-2xl font-semibold text-text-header" for="slugInput">
    Slug
  </label>
  <input
    class="block border mt-2 mb-4 px-5 py-2 rounded-md border-secondary-200 w-full"
    id="slugInput"
    bind:value={newPageSlug}
    on:keyup={debounceChange}
    on:change={() => {
      newPageSlug = slugify(newPageSlug)
    }}
    placeholder="Slug, приклад: product-name"
  />
  <label class="text-2xl font-semibold text-text-header" for="titleInput">
    Заголовок
  </label>
  <input
    class="block border mt-2 mb-4 px-5 py-2 rounded-md border-secondary-200 w-full"
    id="titleInput"
    bind:value={newPageTitle}
    on:keyup={debounceChange}
    placeholder="Заголовок"
  />
  <label class="text-2xl font-semibold text-text-header" for="descInput">
    Опис
  </label>
  <textarea
    class="block border mt-2 mb-4 px-5 py-2 rounded-md border-secondary-200 w-full"
    id="descInput"
    bind:value={newPageDescription}
    on:keyup={debounceChange}
    placeholder="Опис"
    rows="4"
  />
  <label class="text-2xl font-semibold text-text-header" for="contentInput">
    Контент
  </label>
  <MarkdownEditor
    bind:content={newPageContent}
    externalCallback={debounceChange}
  />
</DashboardSection>

<div>
  <DashboardSection class="my-4">
    <Markdown content={newPageContent} />
  </DashboardSection>
</div>

<button
  class="px-5 py-3 rounded-md bg-red-200"
  on:click={() => deletePage(data.slug)}
>
  Видалити
</button>
