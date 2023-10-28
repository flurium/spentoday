<script lang="ts">
  import { querySubscriptions, toSubscription } from "$features/subscriptions"
  import { toast } from "$features/toast"
  import { call, callJson } from "$lib/fetch"
  import { ukrDateString, type ApiSubscription } from "$features/subscriptions"
  import type { PageData } from "./$types"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import { createScrollLoader, scrollLoader } from "$features/loader"
  import autoAnimate from "@formkit/auto-animate"

  export let data: PageData
  let subscriptions = data.subscriptions.map(toSubscription)
  let start = data.subscriptions.length

  let emailInput = ""
  let searchInput = ""
  let timer = 0

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

  const loader = createScrollLoader(loadMore)

  async function loadMore(version: number) {
    let items = await querySubscriptions(fetch, "client", {
      shopId: data.shopId,
      search: searchInput,
      start: start
    })
    if (items == null || loader.versionChanged(version)) return true

    items = items.filter((x) => !subscriptions.some((y) => y.id == x.id))
    if (items.length == 0) return false

    start += items.length
    subscriptions = [...subscriptions, ...items.map(toSubscription)]
    return true
  }

  async function resetFilter() {
    const res = await querySubscriptions(fetch, "client", {
      shopId: data.shopId,
      search: searchInput,
      start: 0
    })
    if (res == null) {
      subscriptions = []
      return
    }

    start = res.length
    subscriptions = res.map(toSubscription)

    console.log("reset end", start, subscriptions)
  }

  function debounceSearch() {
    clearTimeout(timer)
    timer = setTimeout(async () => await loader.reset(resetFilter), 300)
  }

  // async function load(): Promise<"stop" | "continue"> {
  //   if (true) return "stop"
  //   // if (loadReset) return "continue"

  //   // const items = await querySubscriptions(fetch, "client", {
  //   //   shopId: data.shopId,
  //   //   search: searchInput,
  //   //   start: start
  //   // })
  //   // console.log(items)
  //   // if (items == null) return "continue"
  //   // if (items.length == 0) {
  //   //   loadReset = true
  //   //   return "continue"
  //   // }
  //   // // console.log(items)
  //   // start += items.length
  //   // subscriptions = [...subscriptions, ...items.map(toSubscription)]
  //   // loadReset = false
  //   // return "continue"
  // }
</script>

<svelte:head>
  <title>Підписники на магазин | Spentoday</title>
</svelte:head>

<h1 class="font-bold text-3xl text-text-header mb-8">Ваші підписники</h1>

<form on:submit|preventDefault={addSubscriber} class="flex gap-4">
  <input
    bind:value={emailInput}
    type="email"
    required
    placeholder="E-mail нового підписника"
    class="rounded-md px-5 py-3 border border-secondary-200 w-full flex-1"
  />
  <button class="px-8 py-3 rounded-md bg-brand-green" type="submit">
    Додати
  </button>
</form>

<DashboardSection class="mt-8">
  <input
    bind:value={searchInput}
    on:input={debounceSearch}
    placeholder="Шукати підписника..."
    class="rounded-md px-5 py-3 border border-secondary-100 w-full"
  />

  <div class="grid grid-cols-2 gap-x-8 px-5 py-3 text-text-input mt-4">
    <span>Пошта</span>
    <span>Коли підписалися</span>
  </div>

  <div use:autoAnimate>
    {#if subscriptions.length == 0}
      <p class="p-5 border-t border-secondary-100">Немає підписок</p>
    {:else}
      {#each subscriptions as subscription}
        <div
          class="grid grid-cols-2 gap-x-8 px-5 border-t border-secondary-100"
        >
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
  </div>
  <!-- <OnScroll action={load} /> -->

  <div use:scrollLoader={loader} />
</DashboardSection>
