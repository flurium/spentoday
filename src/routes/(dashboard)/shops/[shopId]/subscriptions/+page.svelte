<script lang="ts">
  import { toSubscription } from "$features/subscriptions"
  import { toast } from "$features/toast"
  import { call, callJson } from "$lib/fetch"
  import type { ApiSubscription } from "$features/subscriptions"
  import type { PageData } from "./$types"

  export let data: PageData
  let subscriptions = data.subscriptions.map(toSubscription)

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

  let emailInput = ""
  async function addSubscriber() {
    const response = await call(fetch, "client", {
      route: "/v1/site/subscriptions",
      method: "POST",
      body: {
        email: emailInput,
        shopId: data.shopId
      }
    })
    if (response == null || !response.ok) return toast.serverError()

    const json = await callJson<ApiSubscription>(response)
    if (json == null) return toast.jsonError()

    subscriptions = [...subscriptions, toSubscription(json)]
    emailInput = ""
  }
</script>

<h1 class="font-bold text-3xl text-secondary-700 mb-8">Ваші підписники</h1>

<section class="bg-white p-8 rounded-xl">
  <form on:submit|preventDefault={addSubscriber} class="flex gap-4">
    <input
      bind:value={emailInput}
      type="email"
      required
      placeholder="E-mail нового підписника"
      class="rounded-md px-5 py-3 border border-secondary-200 w-full flex-1"
    />
    <button class="px-8 py-3 rounded-md bg-brand-green" type="submit">Додати</button>
  </form>

  {#if subscriptions.length == 0}
    <span>Немає підписок</span>
  {:else}
    <div
      class="grid grid-cols-2 px-5 py-3 text-secondary-400
      border border-secondary-100 rounded-md mt-4"
    >
      <span>Пошта</span>
      <span>Коли підписалися</span>
    </div>

    <div class="grid grid-cols-2">
      {#each subscriptions as subscription, i (subscription.id)}
        <!-- <div
          class="flex justify-between items-center py-3
          {i != subscriptions.length - 1 ? 'border-b border-b-secondary-100' : ''}"
        > -->
        <span
          class="py-5 pl-5 {i != subscriptions.length - 1
            ? 'border-b border-b-secondary-100'
            : ''}">{subscription.email}</span
        >
        <span
          class="py-5 pr-5 {i != subscriptions.length - 1
            ? 'border-b border-b-secondary-100'
            : ''}">{subscription.date.toLocaleDateString()}</span
        >
        <!-- <button
            class=" px-3 py-1 rounded-full bg-red-200"
            on:click={() => unsubscribe(subscription.id)}
          >
            Відписати
          </button> -->
        <!-- </div> -->
      {/each}
    </div>
  {/if}
</section>
