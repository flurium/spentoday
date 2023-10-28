<script lang="ts">
  import Logo from "$lib/assets/Logo.svelte"
  import Star from "$lib/assets/Star.svelte"

  export let accountImage: string | null
  export let bar: { name: string; link: string }[]

  let isMenuOpen = false
</script>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<div class="flex flex-col min-h-screen text-text-main">
  <header class="bg-secondary-50 flex justify-between items-center py-4 px-6">
    <a href="/shops"> <Logo class="h-8 w-8" /></a>
    <span class="mr-auto text-3xl cursor-pointer mx-4 z-[20] md:hidden">
      <button
        id="menuBtn"
        class="fa {isMenuOpen ? 'fa-close' : 'fa-bars'}"
        on:click={() => (isMenuOpen = !isMenuOpen)}
      />
    </span>

    <a href="/account" class="h-10 w-10 rounded-full overflow-hidden">
      {#if accountImage}
        <img width="40" height="40" src={accountImage} alt="Account" />
      {:else}
        <Star class="h-10 w-10" />
      {/if}
    </a>
  </header>

  {#if bar}
    <nav
      class="flex flex-col gap-2 p-8 z-[1] bg-secondary-50 md:static md:hidden w-full
    {isMenuOpen ? '' : 'hidden'}"
    >
      {#each bar as section}
        <a
          href={section.link}
          class="font-medium py-2 px-4 hover:bg-white rounded-lg"
        >
          {section.name}
        </a>
      {/each}
    </nav>
  {/if}

  <slot />
</div>
