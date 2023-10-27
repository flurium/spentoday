<script lang="ts">
  export let accountImage: string
</script>

<div class="flex flex-col min-h-screen text-text-main">
  <header class="bg-secondary-50 flex justify-between items-center py-4 px-6">
    <a href="/shops">Spentoday</a>

    <a href="/account" class="h-10 w-10 rounded-full bg-yellow-600">
      <img width="40" height="40" src={accountImage} alt="Account" />
    </a>
  </header>

  <slot />
</div>
