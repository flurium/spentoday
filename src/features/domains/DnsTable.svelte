<script lang="ts">
  import type { DomainVerification } from "$lib/api"

  export let verifications: DomainVerification[]
</script>

<div class="grid grid-cols-[auto_auto_auto] gap-x-12 gap-y-1 mt-7 w-fit">
  <span class="font-bold text-secondary-700">Назва</span>
  <span class="font-bold text-secondary-700">Тип</span>
  <span class="font-bold text-secondary-700">Значення</span>
  {#each verifications as verification}
    <span class="text-secondary-600">{verification.domain}</span>
    <span class="text-secondary-600">{verification.type}</span>
    <span class="break-words text-secondary-600">{verification.value}</span>
  {/each}
</div>
<!-- 
<table class="w-full text-left mt-7">
  <tr>
    <th>Назва</th>
    <th>Тип</th>
    <th>Значення</th>
  </tr>
  {#each verifications as verification}
    <tr>
      <td>{verification.domain}</td>
      <td>{verification.type}</td>
      <td class="break-words">{verification.value}</td>
    </tr>
  {/each}
</table> -->
