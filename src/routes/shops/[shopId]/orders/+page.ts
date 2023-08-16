import type { Order } from "$lib/api"
import type { PageLoad } from "./$types"

/*

- get orders of shop (user should own shop)
- search orders of shop

*/
export const load = (async ({ fetch, params }) => {
  const orders: Order[] = []

  return {
    shopId: params.shopId,
    orders: orders
  }
}) satisfies PageLoad
