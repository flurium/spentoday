<script lang="ts">
  let className = ""
  export { className as class }
</script>

<section class="p-4 md:p-8 rounded-lg border border-secondary-100 {className}">
  <slot />
</section>
