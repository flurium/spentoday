<script lang="ts">
  import autoAnimate from "@formkit/auto-animate"

  export let animate: boolean

  let className: string = ""
  export { className as class }
</script>

{#if animate}
  <section
    class="p-8 rounded-lg border border-secondary-100 {className}"
    use:autoAnimate
  >
    <slot />
  </section>
{:else}
  <section class="p-8 rounded-lg border border-secondary-100 {className}">
    <slot />
  </section>
{/if}
