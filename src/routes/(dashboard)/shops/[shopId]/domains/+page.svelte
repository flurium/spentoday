<script lang="ts">
  import type { PageData } from "./$types"
  import { goto } from "$app/navigation"
  import { api, routes } from "$lib"
  import { toast } from "$features/toast"
  import DnsTable from "$features/domains/DnsTable.svelte"
  import DomainInfo from "$features/domains/DomainInfo.svelte"
  import CrossIcon from "$features/domains/CrossIcon.svelte"
  import autoAnimate from "@formkit/auto-animate"
  import DashboardSection from "$features/dashboard/DashboardSection.svelte"

  export let data: PageData
  let domains = data.domains

  $: {
    console.log(domains)
  }

  $: hasFreeDomain =
    domains.findIndex((x) => x.domain.endsWith("spentoday.com")) != -1
  let closeFreeDomainNotification: boolean = false

  let domainInput: string = ""

  async function addDomain() {
    if (hasFreeDomain && domainInput.endsWith(".spentoday.com")) {
      return toast.push({
        title: "Безкоштовний домен вже використано",
        description:
          "Доступно лише одержання одного безкоштовного домену .spentoday.com."
      })
    }
    const res = await api.addDomain(fetch, "client", {
      shopId: data.shopId,
      domain: domainInput
    })
    if (res.status == "ok") {
      domains = [...domains, res.data]
      return
    }
    if (res.status == "has-free-domain") {
      return toast.push({
        title: "Безкоштовний домен вже використано",
        description:
          "Доступно лише одержання одного безкоштовного домену .spentoday.com."
      })
    }
    if (res.status == "domain-taken")
      return toast.push({ title: "Цей домен вже зайнятий" })
    if (res.status == "bad-domain")
      return toast.push({ title: "Домен не є коректним" })
    if (res.status == "no-permission") {
      goto(routes.shop(data.shopId))
      return
    }
    toast.push({ title: "Не можемо додати домен" })
  }

  async function removeDomain(domain: string) {
    const res = await api.removeDomain(fetch, "client", data.shopId, domain)
    if (res == "ok") {
      domains = domains.filter((x) => x.domain != domain)
      return
    }
    if (res == "not-found")
      return toast.push({ title: "Ми не можемо знайти цей домен" })
    if (res == "bad-domain")
      return toast.push({ title: "Вказаний домен є некоректним" })
    return toast.serverError()
  }

  async function verifyDomain(domain: string) {
    const res = await api.verifyDomain(fetch, "client", {
      domain,
      shopId: data.shopId
    })

    if (res.status == "ok") {
      if (res.data.status != "verified") {
        toast.push({ title: "Домен не підтверджено" })
      }

      const domainElement = domains.find((x) => x.domain == domain)
      if (!domainElement) return

      domainElement.status = res.data.status
      domainElement.verification = res.data.verification
      domains = domains
      return
    }

    if (res.status == "domain-taken") {
      return toast.push({ title: "Цей домен вже зайнятий іншим магазином" })
    }

    toast.push({ title: "Домен не підтверджено" })
  }
</script>

<h1 class="font-bold text-3xl text-secondary-700 mb-8">Домени</h1>

{#if hasFreeDomain == false && closeFreeDomainNotification == false}
  <button
    class="py-5 px-6 mb-8 text-sm flex justify-between items-center gap-3
    text-secondary-700 bg-brand-green bg-opacity-50 rounded-xl w-full"
    on:click={() => {
      closeFreeDomainNotification = true
    }}
  >
    <p>
      Безкоштовно отримайте 1 домен від нашого сервісу! Наприклад:
      my-shop.spentoday.com. Для цього введіть у поле назву домену з закінченням
      <b>.spentoday.com</b>.
    </p>
    <CrossIcon />
  </button>
{/if}

<DashboardSection animate={true}>
  <form on:submit|preventDefault={addDomain} class="flex gap-5 mb-10">
    <input
      class="flex-1 border border-secondary-200 px-5 py-2 rounded-md"
      bind:value={domainInput}
      placeholder={hasFreeDomain
        ? "Кастомний домен: example.com"
        : "Кастомний або бескоштовний .spentoday.com домен"}
    />
    <button
      class="px-[1.85rem] py-2 font-semibold bg-brand-violet text-white rounded-md"
      type="submit"
    >
      Додати
    </button>
  </form>

  <div class="flex flex-col gap-7" use:autoAnimate>
    {#each domains as domain, i (domain.domain)}
      <DomainInfo
        {domain}
        isLast={i == domains.length - 1}
        verify={verifyDomain}
        remove={removeDomain}
      />
    {/each}
  </div>
</DashboardSection>
