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

  function addHeading() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${newPageContent.slice(0, start)}${
      textAreaRef.selectionStart != textAreaRef.selectionEnd ? "# " : "#"
    }${newPageContent.slice(start)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 1, start + 1)

    debounceChange()
  }

  function addItalic() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}*${newPageContent.slice(start, end)}*${newPageContent.slice(end)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 1, end + 1)

    debounceChange()
  }

  function addBold() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}**${newPageContent.slice(start, end)}**${newPageContent.slice(end)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 2, end + 2)

    debounceChange()
  }

  // function addBoldItalic() {
  //   let start = textAreaRef.selectionStart
  //   let end = textAreaRef.selectionEnd

  //   textAreaRef.value = `${newPageContent.slice(
  //     0,
  //     start
  //   )}***${newPageContent.slice(start, end)}***${newPageContent.slice(end)}`

  //   newPageContent = textAreaRef.value

  //   textAreaRef.focus()
  //   textAreaRef.setSelectionRange(start + 3, end + 3)

  //   debounceChange()
  // }

  function addStrikethrough() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}~~${newPageContent.slice(start, end)}~~${newPageContent.slice(end)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 2, end + 2)

    debounceChange()
  }

  function addCode() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd
    const selectedText = textAreaRef.value.substring(start, end)
    let count

    if (selectedText.includes("\n")) {
      textAreaRef.value = `${newPageContent.slice(
        0,
        start
      )}\`\`\`\n${newPageContent.slice(
        start,
        end
      )}\n\`\`\`${newPageContent.slice(end)}`
      count = 4
    } else {
      textAreaRef.value = `${newPageContent.slice(
        0,
        start
      )}\`${newPageContent.slice(start, end)}\`${newPageContent.slice(end)}`
      count = 1
    }

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + count, end + count)

    debounceChange()
  }

  function addQuote() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${newPageContent.slice(0, start)}${
      textAreaRef.selectionStart != textAreaRef.selectionEnd ? "> " : ">"
    }${newPageContent.slice(start)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 1, start + 1)

    debounceChange()
  }

  function addLine() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}---\n${newPageContent.slice(start)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 4, start + 4)

    debounceChange()
  }

  function addTable() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}\n| Заголовок 1 | Заголовок 2 |
| ----------- | ----------- |
| Осередок 1 | Осередок 2 |
| Осередок 3 | Осередок 4 |\n${newPageContent.slice(start)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start, start)

    debounceChange()
  }

  function addNumbericList() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}\n1. Пункт перший\n2. Пункт другий\n${newPageContent.slice(start)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start, start)

    debounceChange()
  }

  function addGenericList() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}\n- Пункт перший\n- Пункт другий\n${newPageContent.slice(start)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start, start)

    debounceChange()
  }

  function addLink() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}[Текст посилання](${newPageContent.slice(
      start,
      end
    )})${newPageContent.slice(end)}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 18, end + 18)

    debounceChange()
  }

  function addImage() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${newPageContent.slice(
      0,
      start
    )}![Текст опису](${newPageContent.slice(start, end)})${newPageContent.slice(
      end
    )}`

    newPageContent = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 15, end + 15)

    debounceChange()
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

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

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
    <button
      class="fa fa-header border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addHeading}
    />
    <button
      class="fa fa-italic border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addItalic}
    />
    <button
      class="fa fa-bold border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addBold}
    />
    <button
      class="fa fa-strikethrough border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addStrikethrough}
    />
    <i class="mx-2">|</i>
    <button
      class="fa fa-code border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addCode}
    />
    <button
      class="fa fa-quote-left border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addQuote}
    />
    <i class="mx-2">|</i>
    <button
      class="fa fa-list-ul border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addGenericList}
    />
    <button
      class="fa fa-list-ol border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addNumbericList}
    />
    <button
      class="fa fa-table border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addTable}
    />
    <i class="mx-2">|</i>
    <button
      class="fa fa-link border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addLink}
    />
    <button
      class="fa fa-picture-o border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addImage}
    />
    <i class="mx-2">|</i>
    <button
      class="fa fa-minus border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
      on:click={addLine}
    />
  </div>

  <textarea
    class="border my-4 px-4 p-3 rounded-md border-secondary-200 w-full"
    id="contentInput"
    bind:value={newPageContent}
    on:keyup={debounceChange}
    on:input={debounceChange}
    bind:this={textAreaRef}
    placeholder="Контент, Ви можете використовувати markdown"
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
