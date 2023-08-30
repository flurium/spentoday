import type { PageLoad } from "./$types"
import { api, errors } from "$lib"

export const load = (async ({ fetch, params }) => {
  const output = await api.oneProduct(fetch, "load", params.productId)
  if (!output) throw errors.serverError()

  return {
    product: output.product,
    categories: output.categories,
    categoryId: output.categoryId,
    productId: params.productId
  }
}) satisfies PageLoad
