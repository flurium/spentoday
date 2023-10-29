<script lang="ts">
  import type { Category } from "."

  export let edit: (category: Category) => Promise<void>
  export let remove: (id: string) => Promise<void>
  export let categories: Category[]
</script>

<ul class="mt-10">
  {#each categories as category}
    <li
      style="margin-left: {category.level - 1}rem"
      class="px-2 py-3 items-center flex justify-between
        border-b border-secondary-200"
    >
      <p>{category.name}</p>

      <div>
        <button
          id="dropdownButton{category.id}"
          on:click={() => {
            let drop = document.getElementById(`dropdown${category.id}`)
            if (drop == null) return
            if (drop.style.display == "none") drop.style.display = "block"
            else drop.style.display = "none"
          }}
          class="inline-block text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-2"
          type="button"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path
              d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            />
          </svg>
        </button>

        <div
          id="dropdown{category.id}"
          style="display:none;"
          class="z-50 absolute -ms-20 text-base list-none bg-white divide-gray-100 rounded-lg shadow"
        >
          <div class="p-4">
            <button
              class="hover:text-secondary-500"
              on:click={async () => await edit(category)}
            >
              Редагувати
            </button>
            <button
              class="text-red-500 hover:text-red-300"
              on:click={async () => await remove(category.id)}
            >
              Видалити
            </button>
          </div>
        </div>
      </div>
    </li>
  {/each}
</ul>
