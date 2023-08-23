<script lang="ts" context="module">
  import { writable } from "svelte/store"

  export type Toast = {
    title: string
    description?: string
  }
  type IdToast = { id: string } & Toast

  const toasts = writable<IdToast[]>([])

  function removeToast(id: string) {
    toasts.update((x) => x.filter((t) => t.id != id))
  }

  export function push(data: Toast): void {
    const id = crypto.randomUUID()
    toasts.update((x) => [...x, { id, ...data }])
    setTimeout(() => removeToast(id), 5000)
  }

  export function serverError() {
    push({ title: "На жаль, ми не можемо встановити з'єднання з сервером." })
  }
  export function jsonError() {
    push({ title: "Наразі ми не можемо обробити дані." })
  }
</script>

<script lang="ts">
</script>

<div class="fixed bottom-0 right-0 z-50 m-6 flex flex-col gap-4 max-w-md w-full">
  {#each $toasts as toast (toast.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="toast rounded-2xl bg-secondary-800 p-6 block text-white w-full"
      on:click={() => removeToast(toast.id)}
      role="button"
      tabindex={0}
    >
      <h6 class="text-xl">{toast.title}</h6>
      {#if toast.description}
        <p class="break-words mt-2">{toast.description}</p>
      {/if}
    </div>
  {/each}
</div>

<style>
  .toast {
    animation: fadeOut 250ms ease-in-out 4750ms forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
