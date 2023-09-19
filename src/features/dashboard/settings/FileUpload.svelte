<script lang="ts">
  export let onUpload: (file: File) => Promise<void>
  export let title: string
  export let id: string

  async function upload(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const file = event.currentTarget.files?.item(0)
    if (!file) return

    await onUpload(file)
  }
</script>

<!-- Important to have label at top to make whole think clickable -->
<label
  for={id}
  class="flex items-center justify-center bg-gray-100 hover:bg-gray-50
  border border-gray-300 border-dashed rounded cursor-pointer"
>
  <div class="flex flex-col items-center justify-center pt-5 pb-6">
    <svg
      class="w-8 h-8 mb-4 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
    <p class="mb-2 text-sm text-gray-500 font-semibold">{title}</p>
  </div>
  <input on:change={upload} {id} accept="image/*" type="file" class="hidden" />
</label>
