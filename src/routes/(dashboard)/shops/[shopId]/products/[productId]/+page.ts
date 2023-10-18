import type { PageLoad } from "./$types"
import { api, errors } from "$lib"

export const load = (async ({ fetch, params }) => {
  const output = await api.oneProduct(fetch, "load", params.productId)

  if (!output) throw errors.serverError()

  const category = output.categories.filter((x) => x.id == output.categoryId)[0]

  return {
    shopId: params.shopId,
    product: output.product,
    categories: output.categories,
    category: category,
    maxLevel: output.maxLevel,
    productId: params.productId
  }
}) satisfies PageLoad
