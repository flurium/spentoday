<script lang="ts">
  import { unified } from "unified"
  import remarkParse from "remark-parse"
  import remarkGfm from "remark-gfm"
  import remarkHtml from "remark-html"

  export let content: string

  $: md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content)
    .then((x) => x.toString())
</script>

<div class="content">
  {#await md then html}
    {@html html}
  {/await}
</div>

<style lang="postcss">
  .content :global(h1) {
    @apply mb-12 text-4xl font-bold;
  }
  .content :global(h2) {
    @apply mt-8 mb-4 text-2xl font-semibold;
  }
  .content :global(h3) {
    @apply mt-6 mb-4 text-xl font-semibold;
  }
  .content :global(p),
  .content :global(ul),
  .content :global(ol) {
    @apply mb-4;
  }
  .content :global(ul) {
    @apply list-disc list-inside;
  }
  .content :global(ol) {
    @apply list-decimal list-inside;
  }
  .content :global(a) {
    @apply underline decoration-primary-400;
  }
  .content :global(a:hover) {
    @apply decoration-primary-500;
  }
  .content :global(pre) {
    @apply rounded-md p-4;
  }
  .content :global(blockquote) {
    @apply p-4 my-4 border-l-4 border-gray-300 bg-gray-50;
  }
</style>
