<script>
  import Logo from "$lib/assets/Logo.svelte"

  let isMenuOpen = false

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }
</script>

<header class="px-5 py-8 text-white">
  <div class="flex justify-between items-center max-w-screen-xl m-auto">
    <nav class="basis-1/4">
      <a class="flex gap-4 items-center" href="/">
        <Logo class="h-8 w-8" />
        <span class="font-medium text-2xl hidden md:inline"> Spentoday </span>
      </a>
    </nav>

    <nav class="hidden md:flex flex-1 justify-center gap-5">
      <a class="text-xs md:text-base" href="/#aboutUs">Про нас</a>
      <a class="text-xs md:text-base" href="/#workProcess">Процес роботи</a>
      <a class="text-xs md:text-base" href="/#benefits">Переваги</a>
      <a class="text-xs md:text-base" href="/#price">Ціна</a>
      <a class="text-xs md:text-base" href="/#faq">FAQ</a>
    </nav>

    <nav class="basis-1/2 md:basis-1/4 text-right">
      <a
        class="px-6 py-2 md:px-8 md:py-3 rounded-full bg-brand-pink text-white text-xs md:text-base hover:bg-[#E48FFF]"
        href="/shops"
      >
        Почати
      </a>
    </nav>

    <button
      on:click={toggleMenu}
      class="md:hidden inline-flex items-center justify-center p-2
      w-10 h-10 text-white rounded-lg"
      aria-expanded={isMenuOpen}
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>

    {#if isMenuOpen}
      <div class="fixed top-0 left-0 w-full h-full bg-brand-violet z-50">
        <div class="my-8 mx-5 text-white">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-3xl bold pb-3">SPENTODAY</h2>
              <a href="mailto:support@spentoday.com" class="hover:underline">
                support@spentoday.com
              </a>
            </div>
            <button
              on:click={toggleMenu}
              class="text-5xl text-white p-2 h-10 w-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M1 1L15 15" stroke="white" />
                <path d="M15 1L1 15" stroke="white" />
              </svg>
            </button>
          </div>
          <div class="text-5xl bold absolute bottom-8">
            <a class="block pb-6" on:click={toggleMenu} href="/#workProcess">
              Про нас
            </a>
            <a class="block pb-6" on:click={toggleMenu} href="/#aboutUs">
              Процес роботи
            </a>
            <a class="block pb-6" on:click={toggleMenu} href="/#benefits">
              Переваги
            </a>
            <a class="block pb-6" on:click={toggleMenu} href="/#price">Ціна</a>
            <a class="block pb-6" on:click={toggleMenu} href="/#faq">FAQ</a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</header>
