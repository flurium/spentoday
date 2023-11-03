<script lang="ts">
  let first = true
  let second = false
  let third = false
</script>

<section class="px-6 max-w-screen-xl m-auto py-24 mb-24" id="workProcess">
  <div class="md:justify-between mb-8 md:mb-16 grid grid-cols-4 md:grid-cols-3">
    <div
      class="col-start-1 col-span-2 md:col-start-1 md:col-span-1 text-brand-green text-lg md:text-xl md:mb-4"
    >
      ПРОЦЕС РОБОТИ
    </div>

    <h2
      class="col-start-1 col-span-4 md:col-start-2 md:col-span-2 text-4xl md:text-6xl font-bold md:px-2 py-1 text-secondary-700 rounded-md"
      style="line-height: 1.3;"
    >
      ЛИШЕ ДЕКІЛЬКА КРОКІВ ВАШОГО
      <span class="bg-brand-green text-white rounded-md px-2"
        >СТАРТУ РОБОТИ</span
      >
    </h2>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="md:col-start-1 md:col-span-1 cursor-pointer bg-brand-green h-10 md:h-16 rounded-t-lg text-white flex md:mr-2 mt-20 items-center
       justify-center border-b-2 border-dashed border-secondary-100 text-center text-xs md:text-xl
       {first
        ? 'bg-brand-green col-start-1 col-span-2'
        : 'bg-green-200 col-span-1'}"
      on:click={() => {
        first = true
        second = false
        third = false
      }}
    >
      <span class="hidden md:block">01 Реєстрація</span>
      <span class="md:hidden">{first ? "01 Реєстрація" : "01"}</span>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="md:col-start-2 md:col-span-1 cursor-pointer h-10 md:h-16 rounded-t-lg text-white mt-20 flex items-center justify-center
       border-b-2 border-dashed border-secondary-100 text-center text-xs md:text-xl {second
        ? 'bg-brand-violet col-start-2 col-span-2'
        : 'bg-indigo-200'}"
      on:click={() => {
        first = false
        second = true
        third = false
      }}
    >
      <span class="hidden md:block">02 Налаштування магазину</span>
      <span class="md:hidden">{second ? "02 Налаштування магазину" : "02"}</span
      >
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="md:col-start-3 md:col-span-1 cursor-pointer bg-brand-pink h-10 md:h-16 rounded-t-lg text-white flex md:ml-2 mt-20
       items-center justify-center border-b-2 border-dashed border-secondary-100 text-center text-xs md:text-xl {third
        ? 'bg-brand-pink col-start-3 col-span-2'
        : 'bg-purple-200'}"
      on:click={() => {
        first = false
        second = false
        third = true
      }}
    >
      <span class="hidden md:block">03 Додавання товарів</span>
      <span class="md:hidden">{third ? "03 Додавання товарів" : "03"}</span>
    </div>

    <div
      class="col-span-4 md:grid md:grid-cols-8 text-white rounded-b-lg p-3 md:p-7 {first
        ? 'bg-brand-green rounded-tr-lg'
        : second
        ? 'bg-brand-violet rounded-t-lg'
        : 'bg-brand-pink rounded-tl-lg'}"
    >
      <div class="md:ml-16 md:mt-16 col-span-3 md:col-start-1 md:col-span-3">
        <h3 class="text-xl md:text-2xl mb-4 font-bold">
          {#if first}
            МИТТЄВА РЕЄСТРАЦІЯ -<br />ЛИШЕ КРОК ДО УСПІХУ
          {:else if second}
            ЛЕГКІСТЬ НАЛАШТУВАННЯ ВАШОГО ОНЛАЙН-МАГАЗИНУ
          {:else}
            ДОДАВАННЯ ТОВАРІВ – ФІНАЛЬНИЙ КРОК ДО ОНЛАЙН-ПРОДАЖІВ
          {/if}
        </h3>
        <p class="text-basic md:pr-12">
          {#if first}
            Реєстрація у Spentoday - це швидкий та простий процес, який
            відкриває двері у світ електронної торгівлі. Ми цінуємо ваш час,
            тому за кілька хвилин отримаєте доступ до нашої платформи.
          {:else if second}
            Ми пропонуємо інтуїтивний інтерфейс для легкого керування магазином,
            додатки для розширення функціоналу, управління продуктами, надійний
            хостинг та безпеку
          {:else}
            Ви зможете швидко та легко заповнити інформацію про товар, включаючи
            назву, опис, фотографії та ціну, вибрати категорію товару
          {/if}
        </p>
        <div
          class="h-[200px] w-full mt-5 bg-gray-300 rounded-[2rem] md:hidden"
        />
        <div class="flex flex-col items-center md:items-start my-5 md:mt-12">
          <a
            href="/shops"
            class="bg-white w-[120px] h-[120px] rounded-full
          flex items-center justify-center font-semibold
          {first
              ? 'text-brand-green'
              : second
              ? 'text-brand-violet'
              : 'text-brand-pink'}"
          >
            ПОЧАТИ
          </a>
        </div>
      </div>
      <div
        class="col-start-5 col-span-3 my-20 mr-20 lg:h-[340px] lg:w-[520px] md:h-[283px] md:w-[434px] md:mt-16
         bg-gray-300 rounded-[2rem] hidden md:block"
      />
    </div>
  </div>
</section>
