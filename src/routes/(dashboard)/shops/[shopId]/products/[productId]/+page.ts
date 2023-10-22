import type { PageLoad } from "./$types"
import { errors } from "$lib"
import { oneProduct } from "$features/dashboard/products/api"

export const load = (async ({ fetch, params }) => {
  const output = await oneProduct(fetch, "load", params.productId)
  if (!output) throw errors.serverError()

  const category = output.categories.filter((x) => x.id == output.categoryId)[0]

  return {
    shopId: params.shopId,
    product: output.product,
    categories: output.categories,
    category: category,
    maxLevel: output.maxLevel,
    productId: params.productId,
    properties: output.properties
  }
}) satisfies PageLoad
