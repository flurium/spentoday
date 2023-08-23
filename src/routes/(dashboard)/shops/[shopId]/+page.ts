import type { PageLoad } from "./$types"
import { shopProducts } from "$lib/api"
import { serverError } from "$lib/errors"

/*

Need:
- shop info
- products

*/

export const load = (async ({ fetch, params }) => {
  const products = await shopProducts(fetch, "load", {
    shopId: params.shopId,
    start: 0,
    count: 10
  })
  if (!products) throw serverError()

  return {
    products: products
  }
}) satisfies PageLoad
