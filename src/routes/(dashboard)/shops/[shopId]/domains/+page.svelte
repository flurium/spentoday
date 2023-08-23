<script lang="ts">
  import type { PageData } from "./$types"
  import { goto } from "$app/navigation"
  import { api, routes } from "$lib"

  export let data: PageData
  let domains = data.domains
  $: hasFreeDomain = domains.findIndex((x) => x.domain.endsWith("spentoday.com")) != -1

  let domainInput: string = ""

  async function addDomain() {
    if (hasFreeDomain && domainInput.endsWith(".spentoday.com")) {
      return alert("You can only have 1 free .spentoday.com domain")
    }

    const res = await api.addDomain(fetch, "client", {
      shopId: data.shopId,
      domain: domainInput
    })
    if (res.status == "ok") {
      domains.push(res.data)
      domains = domains
      return
    }
    if (res.status == "has-free-domain") {
      return alert("Тільки 1 бескоштовний .spentoday.com домен можливо додати.")
    }
    if (res.status == "domain-taken") return alert("Домен вже занят.")

    if (res.status == "bad-domain") return alert("Домен не є коректним.")
    if (res.status == "no-permission") {
      goto(routes.shop(data.shopId))
      return
    }
    alert("Can't add the domain at the current moment.")
  }

  async function removeDomain(domain: string) {
    const res = await api.removeDomain(fetch, "client", data.shopId, domain)
    if (res == "ok") {
      domains = domains.filter((x) => x.domain != domain)
      return
    }
    if (res == "not-found") return alert("Не можемо знайти домен")
    if (res == "bad-domain") return alert("Домен не є корректним")
    return alert("щось пішло не так")
  }

  async function verifyDomain(domain: string) {
    const res = await api.verifyDomain(fetch, "client", {
      domain: domain,
      shopId: data.shopId
    })

    if (res.status == "ok") {
      const domainElement = domains.find((x) => x.domain == domain)
      if (domainElement) {
        domainElement.status = "verified"
        domainElement.verifications = undefined
        domains = domains
      }
      return
    }

    if (res.status == "not-verified") {
      alert("Домен не підтверджено.")

      const domainElement = domains.find((x) => x.domain == domain)
      if (!domainElement) return

      domainElement.status = res.data.status
      domainElement.verifications = res.data.verifications
      domains = domains
      return
    }

    if (res.status == "bad-domain") return alert("Домен не мажо буди порожнім.")
    if (res.status == "domain-taken") return alert("Домен вже занято іншим магазином.")
    alert("Щось пішло не так. Зараз полагодимо.")
  }
</script>

{#if !hasFreeDomain}
  <div class="p-4 mb-4 text-green-900 bg-green-50 border border-green-200">
    Ви можете безкоштовно отримати 1 домен від нашого сервісу! Наприклад: my-shop.spentoday.com. Для
    цього введіть у поле назву вашого домену з закінченням
    <b>.spentoday.com</b>.
  </div>
{/if}

<form on:submit|preventDefault={addDomain} class="flex gap-4 mb-10">
  <input
    class="flex-1 bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={domainInput}
    placeholder={hasFreeDomain
      ? "Кастомний домен: example.com"
      : "Кастомний або бескоштовний .spentoday.com домен"}
  />
  <button
    class="px-6 py-3 font-semibold hover:bg-gray-900 bg-gray-800 text-white rounded-md"
    type="submit"
  >
    Add
  </button>
</form>

<div class="flex flex-col gap-8">
  {#each domains as domain (domain.domain)}
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between gap-4">
        <a
          rel="noreferrer"
          target="_blank"
          class="flex-1 font-semibold underline decoration-2 decoration-gray-300
           hover:decoration-primary-300 text-2xl"
          href="https://{domain.domain}">{domain.domain}</a
        >
        {#if domain.status == "not-verified" || domain.status == "no-status"}
          <button class="bg-gray-100 py-2 px-4" on:click={() => verifyDomain(domain.domain)}
            >Verify</button
          >
        {:else if domain.status == "taken"}
          <span class="bg-gray-100 py-2 px-4">Domain is taken by another shop</span>
        {:else}
          <span class="bg-gray-100 py-2 px-4">Domain is verified</span>
        {/if}
        <button class="bg-red-100 py-2 px-4" on:click={() => removeDomain(domain.domain)}>
          Remove
        </button>
      </div>
      {#if domain.status == "not-verified"}
        <p class="mt-6 mb-4">You need to add such one of DNS records for your domain:</p>

        <table class="w-full text-left">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
          {#each domain.verifications as verification}
            <tr>
              <td>{verification.domain}</td>
              <td>{verification.type}</td>
              <td class="break-words">{verification.value}</td>
            </tr>
          {/each}
        </table>
      {/if}
    </div>
  {/each}
</div>
