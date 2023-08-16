import type { PageLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { api } from "$lib"

export const load = (async ({ fetch, params }) => {
  const output = await api.oneProduct(fetch, "load", params.productId)
  if (!output) {
    throw error(500, "Не можемо опрацювати данні з серверу. Зараз чортові програмісти полагодять.")
  }

  return {
    product: output.product,
    categories: output.categories,
    categoryId: output.categoryId,
    productId: params.productId
  }
}) satisfies PageLoad
