<script lang="ts">
  import { toast } from "$features/toast"
  import { call, callJson } from "$lib/fetch"
  import autoAnimate from "@formkit/auto-animate"
  import DashboardSection from "../DashboardSection.svelte"

  import PropertyEdit from "./PropertyEdit.svelte"
  import type { Property } from "./types"

  let className: string
  export { className as class }

  export let properties: Property[]
  export let productId: string

  let name = ""
  let value = ""

  async function addProperty() {
    name = name.trim()
    value = value.trim()
    if (name === "" || value === "") return

    const res = await call(fetch, "client", {
      route: "/v1/site/properties",
      method: "POST",
      body: {
        productId: productId,
        key: name,
        value: value
      }
    })
    if (res == null || !res.ok) {
      toast.serverError()
      return
    }

    const data = await callJson<Property>(res)
    if (data == null) {
      toast.jsonError()
      return
    }

    properties = [...properties, data]
    name = ""
    value = ""
  }

  function onDelete(id: string) {
    properties = properties.filter((x) => x.id != id)
  }
</script>

<DashboardSection class={className}>
  <h3 class="text-text-header text-xl font-bold">Характеристики</h3>
  <p class="text-text-input mt-2 mb-8">
    Характеристики - це основні властивості та особливості вашого продукту або
    послуги, які надають користувачам уявлення про його якість та переваги
  </p>

  <form
    on:submit|preventDefault={addProperty}
    class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5"
  >
    <input
      class="border border-secondary-200 rounded-lg px-5 py-3"
      bind:value={name}
      placeholder="Назва"
    />
    <input
      class="border border-secondary-200 rounded-lg px-5 py-3"
      bind:value
      placeholder="Значення"
    />

    <button
      class="bg-brand-violet font-semibold px-8 py-3 text-white rounded-lg"
    >
      Додати
    </button>
  </form>

  {#if properties.length > 0}
    <div
      class="grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-4 mt-8 items-center"
      use:autoAnimate
    >
      <p class="text-text-input">Назва</p>
      <p class="text-text-input">Значення</p>
      <p />

      {#each properties as property}
        <div class="col-span-3 border-t border-secondary-100" />
        <PropertyEdit {property} {onDelete} />
      {/each}
    </div>
  {/if}
</DashboardSection>
