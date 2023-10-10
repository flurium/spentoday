<script lang="ts">
  import type { ShopDomain } from "$lib/api"
  import CheckIcon from "./CheckIcon.svelte"
  import DnsTable from "./DnsTable.svelte"

  export let domain: ShopDomain
  export let verify: (domain: string) => void
  export let remove: (domain: string) => void

  export let isLast: boolean
</script>

<div class="pb-7 {!isLast ? 'border-b border-b-secondary-200' : ''}">
  <div class="flex justify-between gap-5">
    <div class="flex-1">
      <a
        rel="noreferrer"
        target="_blank"
        class="font-semibold underline decoration-2 text-secondary-700 text-2xl"
        href="https://{domain.domain}"
      >
        {domain.domain}
      </a>

      <p class="mt-2 text-secondary-600">
        {#if domain.status == "not-verified"}
          Вам потрібно додати один із записів DNS для вашого домену:
        {:else if domain.status == "verified"}
          Домен підтверджено <CheckIcon class="inline ml-1" />
        {:else if domain.status == "taken"}
          Домен належить іншому магазину
        {/if}
      </p>
    </div>

    {#if domain.status == "not-verified" || domain.status == "no-status"}
      <button
        class="bg-brand-violet text-white rounded-md py-2 px-6 self-start
        text-sm font-bold mt-2"
        on:click={() => verify(domain.domain)}
      >
        Підтвердити
      </button>
    {/if}

    <button
      class="text-brand-violet border border-brand-violet
      rounded-md py-2 px-6 font-bold self-start text-sm mt-2"
      on:click={() => remove(domain.domain)}
    >
      Видалити
    </button>
  </div>

  {#if domain.status == "not-verified"}
    <DnsTable verification={domain.verification} />
  {/if}
</div>
