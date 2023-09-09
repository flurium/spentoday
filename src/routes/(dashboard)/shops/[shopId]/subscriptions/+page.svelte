<script lang="ts">
  import { querySubscriptions, toSubscription } from "$features/subscriptions"
  import { toast } from "$features/toast"
  import { call, callJson } from "$lib/fetch"
  import { ukrDateString, type ApiSubscription } from "$features/subscriptions"
  import type { PageData } from "./$types"
  import autoAnimate from "@formkit/auto-animate"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"

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

  let searchInput = ""
  let timer = 0
  function debounceSearch() {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      const res = await querySubscriptions(
        fetch,
        "client",
        data.shopId,
        searchInput
      )
      if (res == null) return
      subscriptions = res.map(toSubscription)
    }, 300)
  }
</script>

<h1 class="font-bold text-3xl text-secondary-700 mb-8">Ваші підписники</h1>

<form on:submit|preventDefault={addSubscriber} class="flex gap-4">
  <input
    bind:value={emailInput}
    type="email"
    required
    placeholder="E-mail нового підписника"
    class="rounded-md px-5 py-3 border border-secondary-200 w-full flex-1"
  />
  <button class="px-8 py-3 rounded-md bg-brand-green" type="submit"
    >Додати</button
  >
</form>

<DashboardSection class="mt-8" animate={false}>
  <input
    bind:value={searchInput}
    on:input={debounceSearch}
    placeholder="Шукати підписника..."
    class="rounded-md px-5 py-3 border border-secondary-100 w-full"
  />

  <div class="grid grid-cols-2 gap-x-8 px-5 py-3 text-secondary-400 mt-4">
    <span>Пошта</span>
    <span>Коли підписалися</span>
  </div>

  {#if subscriptions.length == 0}
    <p class="p-5 border-t border-secondary-100">Немає підписок</p>
  {:else}
    {#each subscriptions as subscription, i (subscription.id)}
      <div class="grid grid-cols-2 gap-x-8 px-5 border-t border-secondary-100">
        <!-- <div
          class="flex justify-between items-center py-3
          {i != subscriptions.length - 1 ? 'border-b border-b-secondary-100' : ''}"
        > -->
        <span class="py-5">{subscription.email}</span>
        <span class="py-5">{ukrDateString(subscription.date)}</span>
        <!-- <button
            class=" px-3 py-1 rounded-full bg-red-200"
            on:click={() => unsubscribe(subscription.id)}
          >
            Відписати
          </button> -->
        <!-- </div> -->
      </div>
    {/each}
  {/if}
</DashboardSection>
