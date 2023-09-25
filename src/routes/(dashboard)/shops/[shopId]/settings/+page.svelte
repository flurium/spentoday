<script lang="ts">
  import type { PageData } from "./$types"
  import type { Link } from "$features/dashboard/settings/types"
  import { call, callJson } from "$lib/fetch"
  import { toast } from "$features/toast"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"
  import Media from "$features/dashboard/settings/Media.svelte"

  export let data: PageData

  $: links = data.links ?? []
  let name = ""
  let link = ""
  let shopNameInput = data.name

  $: isInvalidLink = name.trim() == "" || link.trim() == ""

  async function addLink() {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${data.shopId}/link`,
      method: "POST",
      body: { name, link }
    })
    if (!response || !response.ok) return toast.serverError()

    const json = await callJson<Link>(response)
    if (!json) return toast.jsonError()

    links = [...links, json]
  }

  async function deleteLink(linkId: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/link/${linkId}`,
      method: "DELETE"
    })
    if (!response || !response.ok) return toast.serverError()

    links = links.filter((x) => x.id != linkId)
    return
  }

  async function newName() {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${data.shopId}/name`,
      method: "POST",
      body: { name: shopNameInput }
    })

    if (!response || !response.ok) return toast.serverError()
    data.name = shopNameInput
  }
</script>

<h1 class="font-bold text-3xl text-text-header mb-8">Наповнення магазинy</h1>

<div class="grid md:grid-cols-[3fr_1fr] gap-8">
  <div>
    <DashboardSection>
      <h3 class="text-text-header text-xl font-bold mb-6">Профіль</h3>

      <label class="text-text-input mb-2 block" for="name">
        Назва магазину
      </label>
      <input
        class="block w-full border border-secondary-200 rounded-lg px-5 py-3"
        type="text"
        id="name"
        bind:value={shopNameInput}
      />

      <button
        on:click={newName}
        class="bg-brand-violet font-semibold px-6 py-3 text-white rounded-lg mt-6"
        type="submit"
      >
        Зберігти
      </button>
    </DashboardSection>

    <DashboardSection class="mt-8">
      <h3 class="text-text-header text-xl font-bold">Соціальні мережі</h3>
      <p class="text-text-input mt-2 mb-8">
        Соціальні посилання для вашого бізнесу, які часто використовуються в
        нижньому колонтитулі теми
      </p>

      <form
        on:submit|preventDefault={addLink}
        class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-5"
      >
        <input
          class="border border-secondary-200 rounded-lg px-5 py-3"
          bind:value={name}
          placeholder="Назва"
        />
        <input
          class="border border-secondary-200 rounded-lg px-5 py-3"
          bind:value={link}
          placeholder="Посилання"
        />

        <button
          class="bg-brand-violet font-semibold px-8 py-3 text-white rounded-lg"
          disabled={isInvalidLink}
        >
          Додати
        </button>
      </form>

      <div
        class="grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-4 mt-8 items-center"
      >
        <p class="text-text-input">Назва</p>
        <p class="text-text-input">Посилання</p>
        <p />

        {#each links as link}
          <div class="col-span-3 border-t border-secondary-100" />
          <span>{link.name}</span>
          <a href={link.link}>{link.link}</a>
          <button
            class="border border-brand-violet font-semibold px-6 py-2
            rounded-lg text-brand-violet"
            on:click={() => deleteLink(link.id)}
          >
            Видалити
          </button>
        {/each}
      </div>
    </DashboardSection>

    <DashboardSection class="mt-8">
      <Media
        shopId={data.shopId}
        banners={data.banners}
        topBanner={data.top}
        logo={data.logo}
      />
    </DashboardSection>
  </div>
  <div>
    <DashboardSection>
      <h3 class="text-text-header text-xl font-bold">Наповнення сайту</h3>

      <ul class="text-text-main list-inside list-disc flex flex-col gap-3 mt-4">
        <li>Назва магазину</li>
        <li>Обложка сайту</li>
        <li>Логотип</li>
        <li>Банери</li>
        <li>Соціальні мережі</li>
      </ul>
    </DashboardSection>
  </div>
</div>
