<script lang="ts">
  import type { PageData } from "./$types"
  import { goto } from "$app/navigation"
  import type { Link, Banner } from "./+page"
  import { call, callJson } from "$lib/fetch"

  export let data: PageData

  $: links = data.links ?? []
  $: banners = data.banners ?? []
  $: shopName = data.name
  let logo = data.logo

  let name: string = ""
  let link: string = ""
  let bannerFiles: FileList
  let logoFiles: FileList
  let shopNameInput: string = ""

  $: isInvalidLink = name.trim() == "" || link.trim() == ""
  $: isInvalidName = shopNameInput.trim() == ""

  async function addLink() {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${data.shopId}/addlink`,
      method: "POST",
      body: {
        name: name,
        link: link
      }
    })

    if (!response) return alert("we can`t add it now, try later")

    if (response.status == 403 || response.status == 401) goto("/login")

    if (!response.ok) goto("/")

    if (response.ok) {
      const link = await callJson<Link>(response)

      if (!link) return alert("error of adding")

      links.push(link)
      links = links
      return
    }
  }

  async function deleteLink(linkId: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${linkId}/deletelink`,
      method: "DELETE"
    })

    if (!response) return alert("we can`t delete it now, try later")

    if (response.ok) {
      links = links.filter((x) => x.id != linkId)
      return
    }

    if (response.status == 403 || response.status == 401) goto("/login")

    goto("/")
  }

  async function addBanner() {
    const formdata = new FormData()
    formdata.append("file", bannerFiles[0])
    console.log(bannerFiles[0])
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${data.shopId}/addbanner`,
      method: "POST",
      body: formdata
    })

    if (!response) return alert("we can`t add it now, try later")

    if (response.status == 403 || response.status == 401) goto("/login")

    if (!response.ok) goto("/")

    if (response.ok) {
      const banner = await callJson<Banner>(response)

      if (!banner) return alert("error of adding")

      banners.push(banner)
      banners = banners
      return
    }
  }

  async function deleteBanner(bannerId: string) {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${bannerId}/deletebanner`,
      method: "DELETE"
    })

    if (!response) return alert("we can`t delete it now, try later")

    if (response.status == 403 || response.status == 401) goto("/login")

    if (!response.ok) goto("/")

    if (response.ok) {
      banners = banners.filter((x) => x.id != bannerId)
      return
    }
  }

  async function newName() {
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${data.shopId}/name`,
      method: "POST",
      body: { name: shopNameInput }
    })

    if (!response) return alert("we can`t add it now, try later")

    if (response.status == 403 || response.status == 401) goto("/login")

    if (!response.ok) goto("/")

    if (response.ok) {
      shopName = shopNameInput
      return
    }
  }

  async function setLogo() {
    const formdata = new FormData()
    formdata.append("file", logoFiles[0])
    console.log(logoFiles[0])
    const response = await call(fetch, "client", {
      route: `/v1/site/shopsettings/${data.shopId}/logo`,
      method: "POST",
      body: formdata
    })
    console.log(response)
    if (!response) return alert("we can`t add it now, try later")

    if (response.ok) {
      const json = await callJson<string>(response)
      if (!json) return alert("aaa")
      logo = json
      return
    }

    if (response.status == 403 || response.status == 401) goto("/login")

    goto("/")
  }
</script>

<div>
  <h5>
    {shopName}
  </h5>
</div>

<form on:submit|preventDefault={newName} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
  <input
    class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
    bind:value={shopNameInput}
    placeholder="shopName"
  />
  <button
    class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
    type="submit"
    disabled={isInvalidName}
  >
    Reset
  </button>
</form>

<form on:submit|preventDefault={addLink} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
  <input
    class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
    bind:value={link}
    placeholder="link"
  />
  <input
    class="bg-gray-100 focus:bg-gray-50 px-6 py-4 rounded-md border border-gray-200"
    bind:value={name}
    placeholder="name"
  />
  <button
    class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
    type="submit"
    disabled={isInvalidLink}
  >
    Add Social Link
  </button>
</form>

<div id="list">
  <div class="flex flex-wrap justify-center mt-10">
    {#each links as link}
      <div
        class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
          <a data-sveltekit-reload href={link.link}>{link.name}</a>
        </h5>
        <button
          class="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          on:click={() => deleteLink(link.id)}
          type="submit"
        >
          Delete
        </button>
      </div>
    {/each}
  </div>
</div>

<form on:submit|preventDefault={addBanner} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
  <input bind:files={bannerFiles} id="avatar" name="avatar" type="file" />
  <button
    class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
    type="submit"
  >
    Add
  </button>
</form>

<div>
  <div class="flex flex-wrap justify-center mt-10">
    {#each banners as banner}
      <div
        class="max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <img class="rounded-lg w-full" src={banner.url} alt="{banner.url} image" />
        <button
          class="inline-block rounded bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-danger-600 focus:bg-danger-600 focus:outline-none focus:ring-0 active:bg-danger-700"
          on:click={() => deleteBanner(banner.id)}
          type="submit"
        >
          Delete
        </button>
      </div>
    {/each}
  </div>
</div>

<img class="max-w-sm rounded-lg w-full" src={logo} alt="{logo} image" />
<form on:submit|preventDefault={setLogo} class="max-w-lg m-auto flex flex-col gap-4 mt-2">
  <input bind:files={logoFiles} id="logo" name="logo" type="file" />

  <button
    class="bg-primary-500 disabled:bg-gray-100 font-semibold px-6 py-3 text-white
       hover:bg-primary-400 disabled:text-gray-400 rounded-md"
    type="submit"
  >
    set logo
  </button>
</form>
