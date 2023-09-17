import { api, errors } from "$lib"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
  const orders = await api.queryOrders(fetch, "load", {
    shopId: params.shopId,
    start: 0
  })
  if (orders == null) throw errors.serverError()

  return {
    orders: orders
  }
}
