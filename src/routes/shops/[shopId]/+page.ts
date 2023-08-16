import type { PageLoad } from "./$types"
import { PUBLIC_API_URL } from "$env/static/public"
import { error } from "@sveltejs/kit"
import { shopProducts } from "$lib/api"

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
  if (!products) throw error(500, { message: "AAAA" })

  return {
    products: products
  }
}) satisfies PageLoad
