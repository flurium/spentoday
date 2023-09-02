<script lang="ts">
  import { toast } from "$features/toast"
  import { call } from "$lib/fetch"
  import type { PageData } from "./$types"

  export let data: PageData
  let subscriptions = data.subscriptions

  async function unsubscribe(id: string) {
    const res = await call(fetch, "client", {
      route: `/v1/site/subscriptions/${id}`,
      method: "DELETE"
    })
    if (res == null) return toast.serverError()

    if (res.ok) {
      subscriptions = subscriptions.filter((x) => x.id != id)
      return
    }

    toast.serverError()
  }
</script>

<h1 class="font-bold text-3xl text-secondary-700 mb-8">Підписки</h1>

<div class="flex flex-col gap-3 mt-8 rounded-xl bg-white p-8">
  {#if subscriptions.length == 0}
    <span>Немає підписок</span>
  {:else}
    {#each subscriptions as subscription}
      <div class="flex justify-between items-center rounded-lg py-3 px-5 bg-secondary-50">
        <span>{subscription.email}</span>
        <button
          class=" px-3 py-1 rounded-full bg-red-200"
          on:click={() => unsubscribe(subscription.id)}
        >
          Відписати
        </button>
      </div>
    {/each}
  {/if}
</div>
