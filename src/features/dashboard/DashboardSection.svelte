<script lang="ts">
  let className = ""
  export { className as class }
</script>

<section class="p-8 rounded-lg border border-secondary-100 {className}">
  <slot />
</section>
