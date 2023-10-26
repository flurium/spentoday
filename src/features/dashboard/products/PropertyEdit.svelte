<script lang="ts">
  import { call } from "$lib/fetch"
  import MenuIcon from "./MenuIcon.svelte"
  import type { Property } from "./types"

  export let property: Property
  export let onDelete: (id: string) => void

  let isEdit = false
  let key = property.key
  let value = property.value

  async function changeProperty() {
    const res = await call(fetch, "client", {
      route: "/v1/site/properties",
      method: "PUT",
      body: {
        id: property.id,
        key: key,
        value: value
      }
    })
    if (res == null || !res.ok) return

    property.key = key
    property.value = value
    isEdit = false
  }

  async function deleteProperty() {
    const res = await call(fetch, "client", {
      route: `/v1/site/properties/${property.id}`,
      method: "DELETE"
    })
    if (res == null || !res.ok) return

    onDelete(property.id)
  }
</script>

{#if isEdit}
  <div class="col-span-3 flex flex-col gap-4">
    <input
      class="border border-secondary-200 rounded-lg px-5 py-3 block w-full"
      placeholder="Назва"
      bind:value={key}
    />
    <input
      class="border border-secondary-200 rounded-lg px-5 py-3 block w-full"
      placeholder="Значення"
      bind:value
    />

    <div class="flex gap-4">
      <button
        class="font-semibold px-8 py-3 border border-brand-pink
        rounded-lg text-brand-pink w-full"
        on:click={deleteProperty}
      >
        Видалити
      </button>
      <button
        class="bg-brand-violet font-semibold px-8 py-3 text-white
        rounded-lg w-full"
        on:click={changeProperty}
      >
        Змінити
      </button>
    </div>
  </div>
{:else}
  <span>{property.key}</span>
  <span>{property.value}</span>
  <button
    class="h-10 w-10 rounded-lg hover:bg-secondary-100
    grid place-content-center"
    on:click={() => (isEdit = !isEdit)}
  >
    <MenuIcon />
  </button>
{/if}
