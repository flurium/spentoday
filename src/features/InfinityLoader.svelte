<script lang="ts">
  import type { OnScrollResult } from "./OnScroll.svelte"
  import OnScroll from "./OnScroll.svelte"

  export let load: () => Promise<"stop" | "continue">

  let isLoading = false

  async function loader(): Promise<OnScrollResult> {
    if (isLoading) return "skip"
    isLoading = true

    const status = await load()
    if (status == "continue") isLoading = false

    return status
  }
</script>

<OnScroll action={loader} />
