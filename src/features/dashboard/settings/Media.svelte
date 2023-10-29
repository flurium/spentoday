<script lang="ts">
  import { toast } from "$features/toast"
  import { imageSize } from "$lib"
  import { call, callJson } from "$lib/fetch"
  import FileUpload from "./FileUpload.svelte"
  import type { Banner } from "./types"

  export let shopId: string
  export let banners: Banner[]
  export let topBanner: string
  export let logo: string

  async function uploadBanner(file: File) {
    const { width, height } = await imageSize(file)
    if (width != 600 || height != 250) {
      return toast.push({
        title: "Не корректний розмір",
        description: "Баннер повинен мати розмір 600 на 250 пікселів"
      })
    }

    const formdata = new FormData()
    formdata.append("file", file)

    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${shopId}/banner`,
      method: "POST",
      body: formdata
    })
    if (!response || !response.ok) return toast.serverError()
    const banner = await callJson<Banner>(response)
    if (!banner) return toast.jsonError()

    banners = [...banners, banner]
  }

  async function deleteBanner(bannerId: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/banner/${bannerId}`,
      method: "DELETE"
    })
    if (!response || !response.ok) return toast.serverError()
    banners = banners.filter((x) => x.id != bannerId)
  }

  async function uploadTopBanner(file: File) {
    const form = new FormData()
    form.append("file", file)

    const { width, height } = await imageSize(file)
    if (width != 1200 || height != 600) {
      toast.push({
        title: "Не корректний розмір",
        description: "Обложка має бути 1200 на 600 пікселів"
      })
      return
    }

    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${shopId}/top`,
      method: "POST",
      body: form
    })
    if (!response || !response.ok) return toast.serverError()

    const json = await callJson<string>(response)
    if (!json) return toast.jsonError()

    topBanner = json
  }

  async function uploadLogo(file: File) {
    const form = new FormData()
    form.append("file", file)

    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${shopId}/logo`,
      method: "POST",
      body: form
    })
    if (!response || !response.ok) return toast.serverError()

    const json = await callJson<string>(response)
    if (!json) return toast.jsonError()

    logo = json
  }
</script>

<h3 class="text-text-header text-xl font-bold mb-6">Медіа</h3>

<h4 class="text-text-header text-lg">Обложка сайту</h4>
<p class="text-text-input mb-5">
  Банер, який буде з’являтися зверху головної сторінки
</p>

{#if topBanner == ""}
  <FileUpload
    title="Додайте обложку сайту"
    description="Зображення має бути 1200 на 600 пікселів"
    id="top-banner-file-upload"
    onUpload={uploadTopBanner}
  />
{:else}
  <FileUpload
    title="Змінити обложку сайту"
    description="Зображення має бути 1200 на 600 пікселів"
    id="top-banner-file-upload"
    onUpload={uploadTopBanner}
  />
  <img class="rounded-lg mt-8" src={topBanner} alt="Обложка сторінки" />
{/if}

<h4 class="text-text-header text-lg mt-8">Банери</h4>
<p class="text-text-input mb-5">
  Список банерів, що будуть з'являтися в каруселі на головній сторінці
</p>

<FileUpload
  title="Додати банер"
  description="Зображення має бути 600 на 250 пікселів"
  id="banner-file-upload"
  onUpload={uploadBanner}
/>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
  {#each banners as banner}
    <div>
      <img class="rounded-lg" src={banner.url} alt="{banner.url} image" />
      <button
        class="w-full py-2 rounded-lg mt-2 hover:text-white
        border border-brand-violet text-brand-violet hover:bg-brand-violet"
        on:click={() => deleteBanner(banner.id)}
      >
        Видалити
      </button>
    </div>
  {/each}
</div>

<h4 class="text-text-header text-lg mt-8 mb-5">Логотип</h4>
{#if logo == ""}
  <FileUpload
    title="Додати логотип"
    description="Рекомендовано: висота 256 пікселів"
    id="logo-file-upload"
    onUpload={uploadLogo}
  />
{:else}
  <FileUpload
    title="Змінити логотип"
    description="Рекомендовано: висота 256 пікселів"
    id="logo-file-upload"
    onUpload={uploadLogo}
  />
  <img class="rounded-lg mt-8" src={logo} alt="Логотип" />
{/if}
