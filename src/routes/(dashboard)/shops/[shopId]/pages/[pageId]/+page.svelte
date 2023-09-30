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

  let textAreaRef: HTMLTextAreaElement

  const addHeading = () => {
    newPageContent += "# Heading\n"
  }

  function addBold() {
    let position = textAreaRef.selectionStart
    newPageContent = `${newPageContent.slice(
      0,
      position
    )}**Bold Text**${newPageContent.slice(position)}`

    position = textAreaRef.selectionStart - 2 // Устанавливаем курсор на два символа назад
    textAreaRef.focus()
    textAreaRef.setSelectionRange(position, position)
  }

  function setCursorPosition() {
    const position = textAreaRef.value.length - 2 // Устанавливаем курсор на два символа назад
    textAreaRef.focus()
    textAreaRef.setSelectionRange(position, position)
  }

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
  <div class="flex items-center mt-2">
    <div class="relative group rounded-md text-xs bg-blue-500 text-white p-1">
      Заголовки
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        # Заголовок першого рівня <br />
        ## Заголовок другого рівня <br />
        ### Заголовок третього рівня
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-orange-500 text-white p-1 m-1"
    >
      Виділення тексту
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        *курсив* _курсив_ <br />
        **жирний** __ жирний __ <br />
        ***жирний курсив*** ___жирний курсив ___ <br />
        ~~закреслений~~
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-green-500 text-white p-1 m-1"
    >
      Списки
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Нумерований список: Маркований список: <br />
        1. Пункт перший - Пункт перший <br />
        2. Пункт другий - Пункт другий <br />
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-violet-500 text-white p-1 m-1"
    >
      Посилання
      <p
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        [Текст посилання](https://www.example.com)
      </p>
    </div>
    <div
      class="relative group rounded-md text-xs bg-fuchsia-500 text-white p-1 m-1"
    >
      Зображення
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <pre>![Текст опису](https://www.example.com/image.jpg)</pre>
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-yellow-500 text-white p-1 m-1"
    >
      Блоки коду
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        `Рядок коду`<br />
        ```<br />
        Блок коду<br />
        ```
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-rose-500 text-white p-1 m-1"
    >
      Цитати
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {"> Перший рівень цитування"}<br />
        {">> Другий рівень цитування"}<br />
        {" >>> Третій рівень цитування"}<br />
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-purple-500 text-white p-1 m-1"
    >
      Таблиці
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        | Заголовок 1 | Заголовок 2 |<br />
        | ----------- | ----------- |<br />
        | Осередок 1 | Осередок 2 |<br />
        | Осередок 3 | Осередок 4 |<br />
      </div>
    </div>
    <div
      class="relative group rounded-md text-xs bg-teal-500 text-white p-1 m-1"
    >
      Горизонтальна лінія
      <div
        class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ---
      </div>
    </div>
  </div>
  <div class="flex items-center mt-2">
    <button on:click={addHeading}>Add Heading</button>
    <button on:click={addBold}>Add Bold</button>
    <button on:click={setCursorPosition}>Add cursor</button>
  </div>

  <textarea
    class="border my-4 px-4 p-3 rounded-md border-secondary-200 w-full"
    id="contentInput"
    bind:value={newPageContent}
    on:keyup={debounceChange}
    bind:this={textAreaRef}
    placeholder="Контент, ви можете використовувати markdown"
    rows="20"
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
