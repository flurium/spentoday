<script lang="ts">
  import Star from "$lib/assets/Star.svelte"

  export let accountImage: string | null
</script>

<div class="flex flex-col min-h-screen text-text-main">
  <header class="bg-secondary-50 flex justify-between items-center py-4 px-6">
    <a href="/shops">Spentoday</a>

    <a href="/account" class="h-10 w-10 rounded-full overflow-hidden">
      {#if accountImage}
        <img width="40" height="40" src={accountImage} alt="Account" />
      {:else}
        <Star class="h-10 w-10" />
      {/if}
    </a>
  </header>

  <slot />
</div>
