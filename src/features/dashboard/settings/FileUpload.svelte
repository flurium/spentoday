<script lang="ts">
  import ImgIcon from "./icons/ImgIcon.svelte"
  import PlusIcon from "./icons/PlusIcon.svelte"
  import { convertToWebP } from "./webp"

  export let onUpload: (file: File) => Promise<void>
  export let title: string
  export let description: string
  export let id: string

  async function upload(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const file = event.currentTarget.files?.item(0)
    if (!file) return

    try {
      const webp = await convertToWebP(file)
      await onUpload(webp)
    } catch {
      await onUpload(file)
    }
  }
</script>

<!-- Important to have label at top to make whole think clickable -->
<label for={id} class="cursor-pointer grid grid-cols-[auto_1fr_auto] gap-5">
  <div
    class="grid place-content-center border-2 border-secondary-200
    rounded h-20 w-20 border-dashed"
  >
    <ImgIcon class="w-5 h-5 text-text-main" />
  </div>

  <div class="flex flex-col justify-around py-3">
    <p class="text-text-main text-lg">{title}</p>
    <p class="text-text-input">{description}</p>
  </div>
  <div class="grid place-content-center">
    <PlusIcon class="w-5 h-6" />
  </div>
  <input on:change={upload} {id} accept="image/*" type="file" class="hidden" />
</label>
