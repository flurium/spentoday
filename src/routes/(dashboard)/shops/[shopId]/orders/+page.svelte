<script lang="ts">
  import type { PageData } from "./$types"
  import { api } from "$lib"

  export let data: PageData

  let customerEmail: string = ""
  let productName: string = ""
  let timer: number

  $: orders = data.orders ?? []

  function debounceSearch() {
    clearTimeout(timer)
    timer = setTimeout(search, 500)
  }

  async function search() {
    const response = await api.shopOrders(fetch, "client", {
      shop: data.shopId,
      customerEmail: customerEmail,
      productName: productName
    })
    if (response == null) return
    orders = response
  }
</script>

<main>
  <form>
    <input
      class="flex-1 bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
      type="email"
      placeholder="Customer email"
      bind:value={customerEmail}
      on:keyup={debounceSearch}
    />
    <input
      class="flex-1 bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
      placeholder="Product name/slug"
      bind:value={productName}
      on:keyup={debounceSearch}
    />
  </form>

  <div class="flex flex-col gap-4">
    {#each orders as order}
      <div>
        <h3>{order.id}</h3>
      </div>
    {/each}
  </div>
</main>
