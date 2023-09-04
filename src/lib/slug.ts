import slugify from "@sindresorhus/slugify"

export function slugInput(value: string) {
  return () => {
    value = slugify(value.replace(" ", "-"), {
      preserveTrailingDash: true
    })
  }
}

/*
  <input
    class=" bg-gray-100 focus:bg-gray-50 px-6 py-3 rounded-md border border-gray-200"
    bind:value={seoSlug}
    on:keyup={debounceChange}
    on:input={() => {
      seoSlug = slugify(seoSlug.replace(" ", "-"), {
        preserveTrailingDash: true
      })
    }}
    on:change={() => {
      seoSlug = slugify(seoSlug)
    }}
    placeholder="Slug, приклад: product-name"
  /> 
*/

/**
 * Should not be used alogside with bind.
 */
export function slug(node: HTMLInputElement, value: string) {
  const input = () => {
    const cursor = node.selectionStart

    const newValue = slugify(node.value.replace(" ", "-"), {
      preserveTrailingDash: true
    })
    value = newValue

    node.value = newValue
    node.setSelectionRange(cursor, cursor)
  }

  const change = () => {
    const newValue = slugify(node.value)
    node.value = newValue
    value = newValue
  }

  node.addEventListener("input", input)
  node.addEventListener("change", change)

  return {
    destroy() {
      node.removeEventListener("input", input)
      node.removeEventListener("change", change)
    }
  }
}

export function slugUpdate(node: HTMLInputElement, update: (value: string) => void) {
  const input = () => {
    const cursor = node.selectionStart

    const newValue = slugify(node.value.replace(" ", "-"), {
      preserveTrailingDash: true
    })
    update(newValue)

    node.value = newValue
    node.setSelectionRange(cursor, cursor)
  }

  const change = () => {
    const newValue = slugify(node.value)
    node.value = newValue
    update(newValue)
  }

  node.addEventListener("input", input)
  node.addEventListener("change", change)

  return {
    destroy() {
      node.removeEventListener("input", input)
      node.removeEventListener("change", change)
    }
  }
}
