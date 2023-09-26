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
  export let data: PageData
  let newPageSlug: string = data.slug
  let newPageTitle: string = data.title
  let newPageContent: string = data.content
  let newPageDescription: string = data.description

  let status = "Збережено"
  let timer = 0

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
  <form class="flex gap-8 flex-col">
    <div class="grid grid-cols-2 gap-4 my-4">
      <div class="">
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
      </div>
      <div class="flex-col gap-4 max-w-3xl">
        <label
          class="text-2xl font-semibold text-text-header"
          for="contentInput"
        >
          Контент
        </label>
        <div class="flex items-center mt-2">
          <div
            class="relative group rounded-md text-xs bg-blue-500 text-white p-1 m-1"
          >
            Заголовки
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>
# Заголовок першого рівня
## Заголовок другого рівня
### Заголовок третього рівня</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-orange-500 text-white p-1 m-1"
          >
            Виділення тексту
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>
*курсив* _курсив_ 
**жирний** __ жирний __ 
***жирний курсив*** ___жирний курсив ___ 
~~закреслений~~</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-green-500 text-white p-1 m-1"
          >
            Списки
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>
Нумерований список: Маркований список:
1. Пункт перший     - Пункт перший
2. Пункт другий     - Пункт другий</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-violet-500 text-white p-1 m-1"
          >
            Посилання
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>[Текст посилання](https://www.example.com)</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-fuchsia-500 text-white p-1 m-1"
          >
            Зображення
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>![Текст опису](https://www.example.com/image.jpg)</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-yellow-500 text-white p-1 m-1"
          >
            Блоки коду
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>
`Рядок коду`
```
Блок коду
```</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-rose-500 text-white p-1 m-1"
          >
            Цитати
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>
> Перший рівень цитування
>> Другий рівень цитування
>>> Третій рівень цитування</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-purple-500 text-white p-1 m-1"
          >
            Таблиці
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <pre>
| Заголовок 1 | Заголовок 2 |
| ----------- | ----------- |
| Осередок 1  | Осередок 2  |
| Осередок 3  | Осередок 4  |</pre>
            </div>
          </div>
          <div
            class="relative group rounded-md text-xs bg-teal-500 text-white p-1 m-1"
          >
            Горизонтальна лінія
            <div
              class="bg-gray-800 text-white p-2 rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ---
            </div>
          </div>
        </div>
        <textarea
          class="block border my-4 px-5 py-2 rounded-md border-secondary-200 w-full"
          id="contentInput"
          bind:value={newPageContent}
          on:keyup={debounceChange}
          placeholder="Контент, ви можете використовувати markdown"
          rows="10"
        />
      </div>
    </div>
  </form>
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
