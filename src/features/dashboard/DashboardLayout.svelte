<script lang="ts">
  import Logo from "$lib/assets/Logo.svelte"
  import Star from "$lib/assets/Star.svelte"

  export let accountImage: string | null
  export let bar: { name: string; link: string }[]

  let isMenuOpen = false
</script>

<div class="flex flex-col min-h-screen text-text-main">
  <header
    class="bg-secondary-50 flex justify-between gap-2 items-center py-4 px-6"
  >
    <a href="/shops"> <Logo class="h-8 w-8" color="#8576E1" /></a>

    {#if bar.length > 0}
      <button
        class="ml-4 mr-auto text-3xl cursor-pointer md:hidden"
        aria-label="Меню"
        on:click={() => (isMenuOpen = !isMenuOpen)}
      >
        {#if isMenuOpen == true}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        {/if}
      </button>
    {/if}

    <a href="/account" class="h-10 w-10 rounded-full overflow-hidden">
      {#if accountImage}
        <img width="40" height="40" src={accountImage} alt="Account" />
      {:else}
        <Star class="h-10 w-10" />
      {/if}
    </a>
  </header>

  {#if bar.length > 0}
    <nav
      class="flex flex-col gap-2 p-8 z-[1] bg-secondary-50 md:static md:hidden w-full
      {isMenuOpen ? '' : 'hidden'}"
    >
      {#each bar as section}
        <a
          href={section.link}
          on:click={() => (isMenuOpen = !isMenuOpen)}
          class="font-medium py-2 px-4 hover:bg-white rounded-lg"
        >
          {section.name}
        </a>
      {/each}
    </nav>
  {/if}

  <slot />
</div>
