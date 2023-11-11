<script lang="ts">
  import BoldBtn from "./icons/BoldBtn.svelte"
  import HeaderBtn from "./icons/HeaderBtn.svelte"
  import HorizontalBtn from "./icons/HorizontalBtn.svelte"
  import ImageBtn from "./icons/ImageBtn.svelte"
  import ItalicBtn from "./icons/ItalicBtn.svelte"
  import LinkBtn from "./icons/LinkBtn.svelte"
  import ListOBtn from "./icons/ListOBtn.svelte"
  import ListUBtn from "./icons/ListUBtn.svelte"
  import QuoteBtn from "./icons/QuoteBtn.svelte"
  import StrikethroughBtn from "./icons/StrikethroughBtn.svelte"
  import TableBtn from "./icons/TableBtn.svelte"

  export let content: string

  export let externalCallback: () => void

  let textAreaRef: HTMLTextAreaElement

  function addHeading() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${content.slice(0, start)}${
      textAreaRef.selectionStart != textAreaRef.selectionEnd ? "# " : "#"
    }${content.slice(start)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 1, start + 1)

    externalCallback()
  }

  function addItalic() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${content.slice(0, start)}*${content.slice(
      start,
      end
    )}*${content.slice(end)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 1, end + 1)

    externalCallback()
  }

  function addBold() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${content.slice(0, start)}**${content.slice(
      start,
      end
    )}**${content.slice(end)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 2, end + 2)

    externalCallback()
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

    textAreaRef.value = `${content.slice(0, start)}~~${content.slice(
      start,
      end
    )}~~${content.slice(end)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 2, end + 2)

    externalCallback()
  }

  // function addCode() {
  //   let start = textAreaRef.selectionStart
  //   let end = textAreaRef.selectionEnd
  //   const selectedText = textAreaRef.value.substring(start, end)
  //   let count

  //   if (selectedText.includes("\n")) {
  //     textAreaRef.value = `${content.slice(0, start)}\`\`\`\n${content.slice(
  //       start,
  //       end
  //     )}\n\`\`\`${content.slice(end)}`
  //     count = 4
  //   } else {
  //     textAreaRef.value = `${content.slice(0, start)}\`${content.slice(
  //       start,
  //       end
  //     )}\`${content.slice(end)}`
  //     count = 1
  //   }

  //   content = textAreaRef.value

  //   textAreaRef.focus()
  //   textAreaRef.setSelectionRange(start + count, end + count)

  //   externalCallback()
  // }

  function addQuote() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${content.slice(0, start)}${
      textAreaRef.selectionStart != textAreaRef.selectionEnd ? "> " : ">"
    }${content.slice(start)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 1, start + 1)

    externalCallback()
  }

  function addLine() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${content.slice(0, start)}---\n${content.slice(start)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 4, start + 4)

    externalCallback()
  }

  function addTable() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${content.slice(
      0,
      start
    )}\n| Заголовок 1 | Заголовок 2 |
| ----------- | ----------- |
| Осередок 1 | Осередок 2 |
| Осередок 3 | Осередок 4 |\n${content.slice(start)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start, start)

    externalCallback()
  }

  function addNumbericList() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${content.slice(
      0,
      start
    )}\n1. Пункт перший\n2. Пункт другий\n${content.slice(start)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start, start)

    externalCallback()
  }

  function addGenericList() {
    let start = textAreaRef.selectionStart

    textAreaRef.value = `${content.slice(
      0,
      start
    )}\n- Пункт перший\n- Пункт другий\n${content.slice(start)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start, start)

    externalCallback()
  }

  function addLink() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${content.slice(
      0,
      start
    )}[Текст посилання](${content.slice(start, end)})${content.slice(end)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 18, end + 18)

    externalCallback()
  }

  function addImage() {
    let start = textAreaRef.selectionStart
    let end = textAreaRef.selectionEnd

    textAreaRef.value = `${content.slice(
      0,
      start
    )}![Текст опису](${content.slice(start, end)})${content.slice(end)}`

    content = textAreaRef.value

    textAreaRef.focus()
    textAreaRef.setSelectionRange(start + 15, end + 15)

    externalCallback()
  }

  // const actions = [
  //   { icon: "fa-header", click: addHeading },
  //   { icon: "fa-italic", click: addItalic },
  //   { icon: "fa-bold", click: addBold },
  //   { icon: "fa-strikethrough", click: addStrikethrough },
  //   { icon: "fa-quote-left", click: addQuote },
  //   { icon: "fa-list-ul ", click: addGenericList },
  //   { icon: "fa-list-ol", click: addNumbericList },
  //   { icon: "fa-table", click: addTable },
  //   { icon: "fa-link", click: addLink },
  //   { icon: "fa-picture-o", click: addImage },
  //   { icon: "fa-minus", click: addLine }
  // ]

  const actions = [
    { icon: HeaderBtn, click: addHeading },
    { icon: ItalicBtn, click: addItalic },
    { icon: BoldBtn, click: addBold },
    { icon: StrikethroughBtn, click: addStrikethrough },
    { icon: QuoteBtn, click: addQuote },
    { icon: ListUBtn, click: addGenericList },
    { icon: ListOBtn, click: addNumbericList },
    { icon: TableBtn, click: addTable },
    { icon: LinkBtn, click: addLink },
    { icon: ImageBtn, click: addImage },
    { icon: HorizontalBtn, click: addLine }
  ]
</script>

<div class="hidden md:flex items-center mt-2">
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
      1. Пункт перший &nbsp &nbsp &nbsp &nbsp - Пункт перший <br />
      2. Пункт другий &nbsp &nbsp &nbsp &nbsp &nbsp - Пункт другий" <br />
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
  <div class="relative group rounded-md text-xs bg-rose-500 text-white p-1 m-1">
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
      | ------------- | ------------ |<br />
      | Осередок 1 | Осередок 2 |<br />
      | Осередок 3 | Осередок 4 |<br />
    </div>
  </div>
  <div class="relative group rounded-md text-xs bg-teal-500 text-white p-1 m-1">
    Горизонтальна лінія
    <div
      class="bg-brand-dark text-white p-3 w-max rounded-md absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      ---
    </div>
  </div>
</div>

<div class="flex gap-2 flex-wrap items-center mt-2">
  {#each actions as action}
    <button
      class="h-11 w-11 border p-3 hover:bg-secondary-100
      font-semibold rounded-md border-secondary-200 relative"
      on:click={action.click}
    >
      <span
        class="absolute inset-0 flex items-center justify-center w-full h-full"
        ><svelte:component this={action.icon} /></span
      >
    </button>
  {/each}

  <!-- {#each actions as action}
    <button
      class="fa {action.icon} border p-3 hover:bg-secondary-100
      font-semibold rounded-md border-secondary-200"
      on:click={action.click}
    />
  {/each} -->
  <!-- 
  <button
    class="fa fa-code border border-transparent py-2 px-2 hover:bg-secondary-200 font-semibold hover:border-secondary-400 rounded-md"
    on:click={addCode}
  /> -->
</div>

<textarea
  class="border my-4 px-4 p-3 rounded-md border-secondary-200 w-full"
  id="contentInput"
  bind:value={content}
  on:keyup={externalCallback}
  on:input={externalCallback}
  bind:this={textAreaRef}
  placeholder="Контент, Ви можете використовувати markdown"
  rows="12"
/>
