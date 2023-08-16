<script lang="ts">
  import { onMount } from "svelte"

  /**
   * Function called while element is visible.
   * Return "skip" if you want just ignore current event.
   * Return "stop" to stop tracking scroll.
   * Return "continue" to continue tracking.
   */
  export let load: () => Promise<"skip" | "stop" | "continue">

  let div: HTMLDivElement

  async function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i]

      if (!entry.isIntersecting) return

      const status = await load()
      if (status == "skip") return

      observer.unobserve(div)
      if (status == "continue") observer.observe(div)
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(callback)
    observer.observe(div)
  })
</script>

<div bind:this={div} />
