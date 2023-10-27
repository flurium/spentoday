<script lang="ts">
  import type { CategoryOutput } from "."

  export let isTree: boolean
  export let onClick: (category: CategoryOutput) => void
  export let categories: CategoryOutput[]
</script>

{#if isTree}
  {#each categories as category}
    <button
      style="margin-left: {category.level - 1}rem"
      class="p-3 border-b border-secondary-100
      text-left hover:bg-secondary-100"
      on:click={() => onClick(category)}
    >
      {category.name}
    </button>
  {/each}
{:else}
  {#each categories as category}
    <button
      class="p-3 border-b border-secondary-100
      text-left hover:bg-secondary-100"
      on:click={() => onClick(category)}
    >
      {category.name}
    </button>
  {/each}
{/if}
